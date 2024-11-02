using Microsoft.EntityFrameworkCore;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI.src.Infrastructure.Repositories;
using System;
using workshop2.DTOs;

namespace permissionAPI.src.Core.Service
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IWarehouseRepository _WarehouseRepository;
        private readonly DataContext _dbContext;

        public WarehouseService(IWarehouseRepository WarehouseRepository, DataContext dbContext)
        {
            _WarehouseRepository = WarehouseRepository;
            _dbContext = dbContext;
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
        public async Task<WarehouseRentalDetailDTO> getwarehosedetail(string warehousename, string rentalstatus)
        {
            try
            {
                var warehouseDto = await _WarehouseRepository.getwarehosedetail(warehousename, rentalstatus);

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
        public async Task<WarehouseRentalDetailDTO> getwarehosedetailsearch(string warehousename, string rentalstatus, DateTime date_rental_start)
        {
            try
            {
                var warehouseDto = await _WarehouseRepository.getwarehosedetailsearch(warehousename, rentalstatus, date_rental_start);

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
        public async Task<DTOs.WarehouseDbo> AddWarehouseAsync(InputWarehosueDbo InputWarehosueDbo)
        {
            try
            {
                var Warehouse = new Entities.WarehouseDbo
                {
                    warehousename = InputWarehosueDbo.warehousename,
                    warehousesize = InputWarehosueDbo.warehousesize,
                    warehouseaddress = InputWarehosueDbo.warehouseaddress,
                    warehousstatus = "Active"

                };
                var addWarehouse = await _WarehouseRepository.AddWarehouseAsync(Warehouse);
                return new DTOs.WarehouseDbo
                {
                    warehouseid = addWarehouse.warehouseid,
                    warehousename = addWarehouse.warehousename,
                    warehousesize = addWarehouse.warehousesize,
                    warehouseaddress = addWarehouse.warehouseaddress,
                    warehousestatus = "Active"
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while adding data.", ex);
            }
        }
        public async Task<List<WarehouseRentalDTOs>> GetAllWarehousesWithRentalAsync()
        {
            try
            {
                var warehouseRentals = await _WarehouseRepository.GetAllWarehousesWithRentalAsync();

                if (warehouseRentals == null || !warehouseRentals.Any())
                {
                    throw new KeyNotFoundException("No warehouses found.");
                }

                return warehouseRentals;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving the warehouse rentals: {ex.Message}", ex);
            }
        }
        public async Task<bool> UpdateWarehouseNameAsync(int warehouseId, UpdateWarehouseDto updateDto)
        {
            var warehouse = await _dbContext.warehouse.FirstOrDefaultAsync(w => w.warehouseid == warehouseId);
            if (warehouse == null)
                return false;

            warehouse.warehousename = updateDto.warehousename;
            await _dbContext.SaveChangesAsync();
            return true;
        }




    }
}
