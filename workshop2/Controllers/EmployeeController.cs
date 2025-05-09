﻿using Microsoft.AspNetCore.Http;
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
        [HttpGet("GetAllUser1")]
        public async Task<IActionResult> GetAllUser1()
        {
            var response = new BaseHttpResponse<List<EmployeeDTO>>();

            try
            {
                var data = await _UserService.GetAlluser1Async();
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

        [HttpGet("GetEmpByName")]
        public async Task<IActionResult> GetEmpByNameAsync(String Username)
        {
            var response = new BaseHttpResponse<List<EmployeeDTO>>();

            try
            {
                var data = await _UserService.GetEmpByNameAsync(Username);
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

        [HttpPost("AddEmp")]
        public async Task<IActionResult> AddEmpAsync([FromBody] InputEmployeeDTO inputEmployeeDTO)
        {
            var response = new BaseHttpResponse<DTOs.EmployeeDTO>();

            try
            {
                var data = await _UserService.AddEmpAsync(inputEmployeeDTO);
                response.SetSuccess(data, "emp added successfully", "201");

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

        [HttpPut("UpdateEmp")]
        public async Task<IActionResult> UpdateEmpAsync(int Userid, [FromBody] UpdateEmpDTO UpdateEmpDTO)
        {
            var response = new BaseHttpResponse<UpdateEmpDTO>();

            try
            {
                UpdateEmpDTO.UserID = Userid;

                _logger.LogInformation("Updating user with ID: {Userid}", Userid);

                var data = await _UserService.UpdateEmpAsync(UpdateEmpDTO);
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
