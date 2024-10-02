using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;


namespace permissionAPI.Contollers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        
        private readonly IUserService _UserService;
        private readonly ILogger<UserDbo> _logger;

        public UserController(IUserService UserService, ILogger<UserDbo> logger)
        {
            _UserService = UserService;
            _logger = logger;

        }

        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUserAsync()
        {
            var response = new BaseHttpResponse<List<UserDbo>>();

            try
            { 
                var data = await _UserService.GetAllUserAsync();
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

        [HttpGet("GetUserbyId")]
        public async Task<IActionResult> GetUserByIDAsync(String Username ,String Password)
        {
            var response = new BaseHttpResponse<List<UserDbo>>();
            try
            {
                var data = await _UserService.GetUserByIDAsync(Username,Password);

                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                ErrorData err = new ErrorData();
                err.Code = "1-GetUser";
                err.Message = ex.Message;
                _logger.LogError(ex, "Error getting all carrier");
                response.SetError(err, ex.Message, "500");

                return BadRequest(response);
            }
        }
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUserAsync([FromBody] InputUSerDbo inputUSerDbo)
        {
            var response = new BaseHttpResponse<DTOs.UserDbo>();

            try
            {
                var data = await _UserService.AddUserAsync(inputUSerDbo);
                response.SetSuccess(data, "user added successfully", "201");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error adding User");
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }
    }
}




