using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Core.Service;

namespace permissionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _CompanyService;
        private readonly ILogger<CompanyDbo> _logger;
        public CompanyController(ICompanyService CompanyService, ILogger<CompanyDbo> logger)
        {
            _CompanyService = CompanyService;
            _logger = logger;

        }


        [HttpGet("GetAllCompany")]
        public async Task<IActionResult> GetAllCompanyAsync()
        {
            var response = new BaseHttpResponse<List<CompanyDbo>>();

            try
            {
                var data = await _CompanyService.GetAllCompanyAsync();
                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                ErrorData err = new ErrorData();
                err.Code = "-2";
                err.Message = ex.Message;
                _logger.LogError(ex, "Error getting All Company");
                return BadRequest(err);
            }
        }
    }
}
