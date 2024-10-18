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
        [HttpGet("getbyid warehouse")]
        public async Task<IActionResult> GetWarehouseById(string warehouseName, DateTime rentalDateStart, string warehousestatus)
        {
            try
            {
                // เรียกใช้ฟังก์ชันจาก WarehouseService
                var warehouseDto = await _WarehouseService.GetWarehouseByIdAsync(warehouseName, rentalDateStart, warehousestatus);
                return Ok(warehouseDto); // ส่งผลลัพธ์กลับในรูปแบบ JSON
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // ส่ง HTTP 404 ถ้าไม่พบข้อมูล
            }
            catch (ApplicationException ex)
            {
                return StatusCode(500, new { message = ex.Message }); // ส่ง HTTP 500 เมื่อเกิดข้อผิดพลาดภายใน
            }
        }
        [HttpGet("warehousedetail")]
        public async Task<IActionResult> GetWarehouseDetail(string warehousename, string rentalstatus)
        {
            try
            {
                // เรียกใช้ฟังก์ชันจาก WarehouseService
                var warehouseDto = await _WarehouseService.getwarehosedetail(warehousename, rentalstatus);
                return Ok(warehouseDto); // ส่งผลลัพธ์กลับในรูปแบบ JSON
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // ส่ง HTTP 404 ถ้าไม่พบข้อมูล
            }
            catch (ApplicationException ex)
            {
                return StatusCode(500, new { message = ex.Message }); // ส่ง HTTP 500 เมื่อเกิดข้อผิดพลาดภายใน
            }
        }

        [HttpGet("GetWarehouseDetailsearch")]
        public async Task<IActionResult> GetWarehouseDetailsearch(string warehousename, string rentalstatus, DateTime date_rental_start)
        {
            try
            {
                // เรียกใช้ฟังก์ชันจาก WarehouseService
                var warehouseDto = await _WarehouseService.getwarehosedetailsearch(warehousename, rentalstatus, date_rental_start);
                return Ok(warehouseDto); // ส่งผลลัพธ์กลับในรูปแบบ JSON
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // ส่ง HTTP 404 ถ้าไม่พบข้อมูล
            }
            catch (ApplicationException ex)
            {
                return StatusCode(500, new { message = ex.Message }); // ส่ง HTTP 500 เมื่อเกิดข้อผิดพลาดภายใน
            }
        }
        [HttpGet("warehouserental")]
        public async Task<IActionResult> GetAllWarehousesWithRental()
        {
            try
            {
                var warehouseRentals = await _WarehouseService.GetAllWarehousesWithRentalAsync();
                return Ok(warehouseRentals); // ส่งผลลัพธ์ในรูปแบบ JSON
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // ส่ง HTTP 404 ถ้าไม่พบข้อมูล
            }
            catch (ApplicationException ex)
            {
                return StatusCode(500, new { message = ex.Message }); // ส่ง HTTP 500 เมื่อเกิดข้อผิดพลาดภายใน
            }
        }


        [HttpPost("AddWarehouse")]
        public async Task<IActionResult> AddWarehouseAsync([FromBody] InputWarehosueDbo InputWarehosueDbo)
        {
            var response = new BaseHttpResponse<DTOs.WarehouseDbo>();

            try
            {
                var data = await _WarehouseService.AddWarehouseAsync(InputWarehosueDbo);
                response.SetSuccess(data, "warehouse added successfully", "201");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var err = new ErrorData
                {
                    Code = "-2",
                    Message = ex.Message
                };
                _logger.LogError(ex, "Error adding warehouse");
                response.SetError(err, ex.Message, "500");
                return BadRequest(response);
            }

        }
    }
}
