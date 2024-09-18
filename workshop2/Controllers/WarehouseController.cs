using Microsoft.AspNetCore.Mvc;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;

namespace permissionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarehouseController : Controller
    {
        private readonly IWarehouseService _WarehouseService;
        private readonly ILogger<WarehouseController> _logger;

        public WarehouseController(IWarehouseService WarehouseService, ILogger<WarehouseController> logger)
        {
            _WarehouseService = WarehouseService;
            _logger = logger;
        }

        [HttpGet("GetAllWarehouse")]
        public async Task<IActionResult> GetAllWarehouseAsync()
        {
            var response = new BaseHttpResponse<List<WarehouseDbo>>();

            try
            {
                var data = await _WarehouseService.GetAllWarehouseAsync();
                response.SetSuccess(data, "Success", "200");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error getting all warehouses");
                return BadRequest(err);
            }
        }
    }
}
