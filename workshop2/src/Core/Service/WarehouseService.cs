using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using workshop2.DTOs;

namespace permissionAPI.src.Core.Service
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IWarehouseRepository _WarehouseRepository;

        public WarehouseService(IWarehouseRepository WarehouseRepository)
        {
            _WarehouseRepository = WarehouseRepository;
        }

        public async Task<List<DTOs.WarehouseDbo>> GetAllWarehouseAsync()
        {
            try
            {
                var WarehouseData = await _WarehouseRepository.GetAllWarehouseAsync();
                var WarehouseReturn = WarehouseData.Select(s => new DTOs.WarehouseDbo
                {
                    warehouseid = s.warehouseid,
                    warehousename = s.warehousename,
                    warehousesize = s.warehousesize,
                    warehouseaddress = s.warehouseaddress,
                    warehousestatus = s.warehousstatus,
                    
                }).ToList();

                return WarehouseReturn;
            }
            catch (Exception ex)
            {

                throw new ApplicationException("An error occurred while getting the Warehouse data.", ex);
            }
        }
        public async Task<WarehouseRentalDTO> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string warehousestatus)
        {
            try
            {
                var warehouseDto = await _WarehouseRepository.GetWarehouseByIdAsync(warehouseName, rentalDateStart, warehousestatus);

                if (warehouseDto == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouseDto;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }
        public async Task<WarehouseRentalDetailDTO> getwarehosedetail(int warehouseid, DateTime rentalDateStart, string warehousestatus)
        {
            try
            {
                var warehouseDto = await _WarehouseRepository.getwarehosedetail(warehouseid, rentalDateStart, warehousestatus);

                if (warehouseDto == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouseDto;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }
        public async Task<List<WarehouseRentalDTOs>> getwarehoserental()
        {
            try
            {
                var warehouserentalDto = await _WarehouseRepository.getwarehoserentalal();

                if (warehouserentalDto == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouserentalDto;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }




    }
}
