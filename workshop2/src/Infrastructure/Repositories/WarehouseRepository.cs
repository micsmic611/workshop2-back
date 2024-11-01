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
        public async Task<WarehouseRentalDetailDTO> getwarehosedetail(string warehousename, string rentalstatus)
        {
            try
            {
                // เริ่มต้น query
                var warehouse = await (from w in _dbContext.warehouse
                            join r in _dbContext.Rental on w.warehouseid equals r.warehouseid
                            join u in _dbContext.User on r.userid equals u.UserID
                            join c in _dbContext.Company on r.companyid equals c.CompanyID
                            where w.warehousename == warehousename && r.rentalstatus == rentalstatus
                            select new WarehouseRentalDetailDTO
                             {
                                warehouseid = w.warehouseid,
                                warehouseaddress = w.warehouseaddress,
                                warehousename = w.warehousename,
                                warehousesize = w.warehousesize,
                                warehousestatus = w.warehousstatus, // แก้ไขตรงนี้จาก r เป็น w
                                rentalstatus = r.rentalstatus,
                                date_rental_start = r.date_rental_start,
                                date_rental_end = r.date_rental_end,
                                Description = r.Description,
                                userid=u.UserID,
                                Username = u.Username,
                                companyid = c.CompanyID,
                                companyName = c.CompanyName,
                                companyFirstname = c.CompanyFirstname,
                                companyLastname = c.CompanyLastname,
                                companyEmail = c.CompanyEmail,
                                companyPhone = c.CompanyPhone,
                                companyAddress = c.CompanyAddress
                            }).FirstOrDefaultAsync();

                // เช็คว่า warehouse ที่ได้เป็น null หรือไม่
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
        public async Task<WarehouseRentalDetailDTO> getwarehosedetailsearch(string warehousename, string rentalstatus,DateTime date_rental_start)
        {
            try
            {
                // เริ่มต้น query
                var warehouse = await (from w in _dbContext.warehouse
                                       join r in _dbContext.Rental on w.warehouseid equals r.warehouseid
                                       join u in _dbContext.User on r.userid equals u.UserID
                                       join c in _dbContext.Company on r.companyid equals c.CompanyID
                                       where w.warehousename == warehousename && r.rentalstatus == rentalstatus && r.date_rental_start==date_rental_start
                                       select new WarehouseRentalDetailDTO
                                       {
                                           warehouseid = w.warehouseid,
                                           warehouseaddress = w.warehouseaddress,
                                           warehousename = w.warehousename,
                                           warehousesize = w.warehousesize,
                                           warehousestatus = w.warehousstatus, // แก้ไขตรงนี้จาก r เป็น w
                                           rentalstatus = r.rentalstatus,
                                           date_rental_start = r.date_rental_start,
                                           date_rental_end = r.date_rental_end,
                                           Description = r.Description,
                                           userid = u.UserID,
                                           Username = u.Username,
                                           companyid = c.CompanyID,
                                           companyName = c.CompanyName,
                                           companyFirstname = c.CompanyFirstname,
                                           companyLastname = c.CompanyLastname,
                                           companyEmail = c.CompanyEmail,
                                           companyPhone = c.CompanyPhone,
                                           companyAddress = c.CompanyAddress
                                       }).FirstOrDefaultAsync();

                // เช็คว่า warehouse ที่ได้เป็น null หรือไม่
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
        public async Task<List<WarehouseRentalDTOs>> GetAllWarehousesWithRentalAsync()
        {
            try
            {
                var currentDate = DateTime.Now; // กำหนดวันที่ปัจจุบัน

                var warehouses = await (from w in _dbContext.warehouse
                                        join r in _dbContext.Rental on w.warehouseid equals r.warehouseid into rentalGroup
                                        from r in rentalGroup.DefaultIfEmpty() // ใช้ Left Join
                                        join c in _dbContext.Company on r.companyid equals c.CompanyID into companyGroup
                                        from c in companyGroup.DefaultIfEmpty() // ใช้ Left Join สำหรับ company
                                        where r == null || (r.rentalstatus == null || (r.rentalstatus != "cancel" && r.date_rental_end >= currentDate)) // ปรับเงื่อนไขการกรอง
                                        select new WarehouseRentalDTOs
                                        {
                                            warehouseid = w.warehouseid,
                                            warehousename = w.warehousename,
                                            warehouseaddress = w.warehouseaddress,
                                            warehousesize = w.warehousesize,
                                            warehousestatus = w.warehousstatus,
                                            // ข้อมูลจาก Rental
                                            rentalid = r != null ? r.rentalid : (int?)null,
                                            companyid = r != null ? r.companyid : (int?)null,
                                            userid = r != null ? r.userid : (int?)null,
                                            date_rental_start = r != null ? r.date_rental_start : (DateTime?)null,
                                            date_rental_end = r != null ? r.date_rental_end : (DateTime?)null,
                                            rentalstatus = r != null ? r.rentalstatus : null,
                                            Description = r != null ? r.Description : null,
                                            // ข้อมูลจาก Company
                                            companyName = c != null ? c.CompanyName : null,
                                            companyFirstname = c != null ? c.CompanyFirstname : null,
                                            companyLastname = c != null ? c.CompanyLastname : null,
                                            companyEmail = c != null ? c.CompanyEmail : null,
                                            companyPhone = c != null ? c.CompanyPhone : null,
                                            companyAddress = c != null ? c.CompanyAddress : null,
                                        }).ToListAsync();

                return warehouses;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving the warehouse data: {ex.Message}", ex);
            }
        }

    }
}
