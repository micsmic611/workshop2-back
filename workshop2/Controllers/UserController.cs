using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Core.Service;


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
        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
        {
            var result = await _UserService.UpdateStatusToZero(dto.UserID);
            if (!result)
                return NotFound("User not found");

            return Ok("User status updated to 0 successfully");
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
        [HttpGet("GetUserbyUserId")]
        public async Task<IActionResult> GetUserByIDAsync(int userid)
        {
            var response = new BaseHttpResponse<List<Userdto>>();
            try
            {
                var data = await _UserService.GetUserByIDAsync(userid);

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
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateRentalAsync(int Userid, [FromBody] Userforupdate Userforupdate)
        {
            var response = new BaseHttpResponse<Userforupdate>();

            try
            {
                Userforupdate.UserID = Userid;

                // ?????????????????????????
                _logger.LogInformation("Updating user with ID: {Userid}", Userid);

                var data = await _UserService.UpdateUserAsync(Userforupdate);
                response.SetSuccess(data, "User updated successfully", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error updating User with ID: {Userid}. Inner exception: {InnerException}", Userid, ex.InnerException?.Message);
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }
    }
}




