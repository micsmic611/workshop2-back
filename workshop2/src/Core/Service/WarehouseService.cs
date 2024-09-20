using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;

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
                    warehousstatus = s.warehousstatus,
                    
                }).ToList();

                return WarehouseReturn;
            }
            catch (Exception ex)
            {

                throw new ApplicationException("An error occurred while getting the Warehouse data.", ex);
            }
        }
        public async Task<DTOs.WarehouseDbo> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string rentalStatus)
        {
            try
            {
                // เรียกใช้ฟังก์ชันจาก Repository
                var warehouseEntity = await _WarehouseRepository.GetWarehouseByIdAsync(warehouseName, rentalDateStart, rentalStatus);

                if (warehouseEntity == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                // แปลงจาก Entity เป็น DTO
                var warehouseDto = new DTOs.WarehouseDbo
                {
                    warehouseid = warehouseEntity.warehouseid,
                    warehouseaddress = warehouseEntity.warehouseaddress,
                    warehousename = warehouseEntity.warehousename,
                    warehousesize = warehouseEntity.warehousesize,
                    warehousstatus = warehouseEntity.warehousstatus
                };

                return warehouseDto;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while retrieving the warehouse data.", ex);
            }
        }



    }
}
