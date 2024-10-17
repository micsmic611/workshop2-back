using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
using workshop2.DTOs;
//using permissionAPI.DTOs;

namespace permissionAPI.src.Infrastructure.Repositories
{
    public class WarehouseRepository : IWarehouseRepository
    {
        private readonly DataContext _dbContext;

        public WarehouseRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<WarehouseDbo>> GetAllWarehouseAsync()
        {

            try
            {
                return await _dbContext.warehouse.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<WarehouseRentalDTO> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string warehousestatus)
        {
            try
            {
                var warehouse = await (from w in _dbContext.warehouse
                                       join r in _dbContext.Rental
                                       on w.warehouseid equals r.warehouseid
                                       where w.warehousename == warehouseName
                                             && r.date_rental_start == rentalDateStart
                                             && w.warehousstatus == warehousestatus
                                       select new WarehouseRentalDTO
                                       {
                                           warehouseid = w.warehouseid,
                                           warehouseaddress = w.warehouseaddress,
                                           warehousename = w.warehousename,
                                           warehousesize = w.warehousesize,
                                           warehousestatus = w.warehousstatus,
                                           date_rental_start = r.date_rental_start
                                           

                                        }).FirstOrDefaultAsync();

                if (warehouse == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouse;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }
        public async Task<WarehouseRentalDetailDTO> getwarehosedetail(int warehouseid, DateTime rentalDateStart, string rentalstatus)
        {
            try
            {
                var warehouse = await (from w in _dbContext.warehouse
                                       join r in _dbContext.Rental
                                       on w.warehouseid equals r.warehouseid
                                       join u in _dbContext.User
                                       on r.userid equals u.UserID
                                       where w.warehouseid == warehouseid
                                             && r.date_rental_start == rentalDateStart
                                             && r.rentalstatus == rentalstatus
                                       select new WarehouseRentalDetailDTO
                                       {
                                           warehouseid = w.warehouseid,
                                           warehouseaddress = w.warehouseaddress,
                                           warehousename = w.warehousename,
                                           warehousesize = w.warehousesize,
                                           warehousestatus = w.warehousstatus,
                                           rentalstatus = r.rentalstatus,
                                           date_rental_start = r.date_rental_start,
                                           date_rental_end = r.date_rental_end,
                                           Description = r.Description,
                                           Username = u.Username
                                       }).FirstOrDefaultAsync();

                if (warehouse == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouse;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }

        public async Task<WarehouseDbo> AddWarehouseAsync(WarehouseDbo Warehosue)
        {
            try
            {
                _dbContext.warehouse.Add(Warehosue);
                await _dbContext.SaveChangesAsync();
                return Warehosue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<WarehouseRentalDTOs>> getwarehoserentalal()
        {
            try
            {
                var warehouse = await (from r in _dbContext.Rental
                                       join w in _dbContext.warehouse
                                       on r.warehouseid equals w.warehouseid
                                       select new WarehouseRentalDTOs
                                       {
                                           warehouseid = w.warehouseid,
                                           warehouseaddress = w.warehouseaddress,
                                           warehousename = w.warehousename,
                                           warehousesize = w.warehousesize,
                                           warehousestatus = w.warehousstatus,
                                           rentalid = r.rentalid,
                                           rentalstatus = r.rentalstatus,
                                           date_rental_start = r.date_rental_start,
                                           date_rental_end = r.date_rental_end,
                                           Description = r.Description,
                                       }).ToListAsync();

                if (warehouse == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouse;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }

    }
}
