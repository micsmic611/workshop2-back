using Microsoft.AspNetCore.Mvc;
using workshop2.DTOs;
using workshop2.src.Core.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;
using permissionAPI.DTOs;
using permissionAPI.src.Entities;

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

        [HttpGet("GetCompanyById")]
        public async Task<IActionResult> GetCompanyByID(string companyname)
        {
            try
            {
                var result = await _rentalService.GetCompanyByIDAsync(companyname);
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

        [HttpPost("RentalWarehouse")]
        public async Task<IActionResult> Create(RentalDTO rentalDto)

        {
            if (ModelState.IsValid)
            {
                await _rentalService.AddRentalAsync(rentalDto);
                return CreatedAtAction(nameof(GetCompanyByID), new { companyname = rentalDto.CompanyId }, rentalDto); // ส่งกลับ HTTP 201 Created
            }
            return BadRequest(ModelState); // ส่งกลับ HTTP 400 Bad Request ถ้ามีข้อผิดพลาด
        }

        [HttpPut("UpdateRental")]
        public async Task<IActionResult> UpdateRentalAsync(int rentalid, [FromBody] Rentalforupdate Rentalforupdate)
        {
            var response = new BaseHttpResponse<Rentalforupdate>();

            try
            {
                Rentalforupdate.rentalid = rentalid;

                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Updating Rental with ID: {RentalId}", rentalid);

                var data = await _rentalService.UpdateRentalAsync(Rentalforupdate);
                response.SetSuccess(data, "Rental updated successfully", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error updating Rental with ID: {RentalId}. Inner exception: {InnerException}", rentalid, ex.InnerException?.Message);
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateRentalStatus([FromBody] UpdateRentalStatusDto dto)
        {
            await _rentalService.UpdateRentalStatusAndCancelAsync(dto);
            return Ok("Rental status updated and cancel rental added.");
        }

    }
}
