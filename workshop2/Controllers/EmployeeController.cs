using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using workshop2.DTOs;

namespace workshop2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IUserService _UserService;
        private readonly ILogger<UserDbo> _logger;

        public EmployeeController (IUserService UserService, ILogger<UserDbo> logger)
        {
            _UserService = UserService;
            _logger = logger;

        }

        [HttpGet("GetAllEmp")]
        public async Task<IActionResult> GetAllEmpAsync()
        {
            var response = new BaseHttpResponse<List<EmployeeDTO>>();

            try
            {
                var data = await _UserService.GetAllEmpAsync();
                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                ErrorData err = new ErrorData();
                err.Code = "-2";
                err.Message = ex.Message;
                _logger.LogError(ex, "Error getting All User");
                return BadRequest(err);
            }
        }
    }
}
