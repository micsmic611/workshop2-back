using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Core.Service;
using workshop2.DTOs;

namespace permissionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _CompanyService;
        private readonly ILogger<CompanyDto> _logger;
        public CompanyController(ICompanyService CompanyService, ILogger<CompanyDto> logger)
        {
            _CompanyService = CompanyService;
            _logger = logger;

        }


        [HttpGet("GetAllCompany")]
        public async Task<IActionResult> GetAllCompanyAsync()
        {
            var response = new BaseHttpResponse<List<CompanyDto>>();

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

        [HttpGet("GetCompanyByName")]
        public async Task<IActionResult> GetCompanyByNameAsync(String Companyname)
        {
            var response = new BaseHttpResponse<List<CompanyDto>>();

            try
            {
                var data = await _CompanyService.GetCompanyByNameAsync(Companyname);
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

        [HttpGet("GetCompanyDetailByID")]
        public async Task<IActionResult> GetCompanyDetailByIDAsync(int Companyid)
        {
            var response = new BaseHttpResponse<List<CompanyDto>>();

            try
            {
                var data = await _CompanyService.GetCompanyDetailByIDAsync(Companyid);
                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                ErrorData err = new ErrorData();
                err.Code = "-2";
                err.Message = ex.Message;
                _logger.LogError(ex, "Error getting  Company");
                return BadRequest(err);
            }
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompanyAsync([FromBody] InputCompanyDto InputCompanyDbo)
        {
            var response = new BaseHttpResponse<DTOs.CompanyDto>();

            try
            {
                var data = await _CompanyService.AddCompanyAsync(InputCompanyDbo);
                response.SetSuccess(data, "company added successfully", "201");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error adding Company");
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }

        [HttpPut("UpdateCompany")]
        public async Task<IActionResult> UpdateCompanyAsync(int companyid, [FromBody] Companyforupdate Companyforupdate)
        {
            var response = new BaseHttpResponse<Companyforupdate>();

            try
            {
                Companyforupdate.company_id = companyid;

                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Updating Company with ID: {Companyid}", companyid);

                var data = await _CompanyService.UpdateCompanyAsync(Companyforupdate);
                response.SetSuccess(data, "Company updated successfully", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error updating Company with ID: {CompanyId}. Inner exception: {InnerException}", companyid, ex.InnerException?.Message);
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }


    }
}
