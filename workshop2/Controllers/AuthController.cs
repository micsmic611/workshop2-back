using System;
using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI.src.Entities;
using BCrypt.Net;
using auth.Helpers;
using System.Net;

namespace auth.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new permissionAPI.src.Entities.UserDbo
            {
                Username = dto.Username,
                email = dto.email,
                Firstname =dto.Firstname,
                Lastname =dto.Lastname,
                phone=dto.phone,
                address =dto.address,
                RoleId= dto.RoleId = 1,
                status = dto.status,

                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _repository.AddUserAsync(user);
            return Created("success", user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _repository.GetByusername(dto.Username);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate JWT
            var token = _jwtService.Generate(user.UserID, user.RoleId ?? 0); // ส่ง userID และ roleID
            return Ok(new { Token = token });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string username, string newPassword)
        {
            var user = await _repository.GetByusername(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _repository.Update(user); // สมมุติว่ามีเมธอดสำหรับอัปเดตผู้ใช้

            return Ok("Password reset successfully.");
        }
    }
}
