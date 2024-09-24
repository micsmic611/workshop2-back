using Microsoft.AspNetCore.Mvc;
using workshop2.DTOs;
using workshop2.src.Core.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;
using permissionAPI.DTOs;

namespace workshop2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService _rentalService;
        private readonly ILogger<RentalController> _logger;

        public RentalController(IRentalService rentalService, ILogger<RentalController> logger)
        {
            _rentalService = rentalService;
            _logger = logger;
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(string companyname)
        {
            try
            {
                var result = await _rentalService.GetUserByIDAsync(companyname);
                if (result == null || !result.Any())
                {
                    return NotFound(new { Message = "ไม่พบข้อมูลบริษัทตามชื่อที่ระบุ" });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by company name");
                return BadRequest(new { Message = ex.Message });
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create(RentalDTO rentalDto)
        {
            if (ModelState.IsValid)
            {
                await _rentalService.AddRentalAsync(rentalDto);
                return CreatedAtAction(nameof(GetUserById), new { companyname = rentalDto.CompanyId }, rentalDto); // ส่งกลับ HTTP 201 Created
            }
            return BadRequest(ModelState); // ส่งกลับ HTTP 400 Bad Request ถ้ามีข้อผิดพลาด
        }


    }
}
