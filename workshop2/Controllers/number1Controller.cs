using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;


namespace permissionAPI.Contollers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CimController : Controller
    {
        
        private readonly Inumber1Service _number1Service;
        private readonly ILogger<number1Dbo> _logger;

        public CimController(Inumber1Service number1Service, ILogger<number1Dbo> logger)
        {
            _number1Service = number1Service;
            _logger = logger;

        }

        [HttpGet("GetAllCim")]
        public async Task<IActionResult> GetAllnumber1Async()
        {
            var response = new BaseHttpResponse<List<number1Dbo>>();

            try
            { 
                var data = await _number1Service.GetAllnumber1Async();
                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                ErrorData err = new ErrorData();
                err.Code = "-2";
                err.Message = ex.Message;
                _logger.LogError(ex, "Error getting All Role");
                return BadRequest(err);
            }
        }
         [HttpPost("AddRole")]
        public async Task<IActionResult> Addnumber1Async([FromBody] Inputnumber1Dbo inputnumber1Dbo)
        {
            var response = new BaseHttpResponse<DTOs.number1Dbo>();

            try
            {
                var data = await _number1Service.Addnumber1Async(inputnumber1Dbo);
                response.SetSuccess(data, "cim added successfully", "201");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error adding role");
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }
        }
    }
}




