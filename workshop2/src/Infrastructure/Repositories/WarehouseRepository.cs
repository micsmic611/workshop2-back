using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
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
        public async Task<WarehouseDbo> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string rentalStatus)
        {
            try
            {
                var warehouse = await (from w in _dbContext.warehouse
                                       join r in _dbContext.Rental
                                       on w.warehouseid equals r.warehouseid
                                       where w.warehousename == warehouseName
                                             && r.date_rental_start == rentalDateStart
                                             && r.rentalstatus == rentalStatus
                                       select new WarehouseDbo
                                       {
                                           warehouseid = w.warehouseid,
                                           warehouseaddress = w.warehouseaddress,
                                           warehousename = w.warehousename,
                                           warehousesize = w.warehousesize,
                                           warehousstatus = w.warehousstatus
                                       }).FirstOrDefaultAsync();

                if (warehouse == null)
                {
                    throw new KeyNotFoundException("Warehouse not found with the provided criteria.");
                }

                return warehouse;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while retrieving the warehouse data.", ex);
            }
        }




    }
}
