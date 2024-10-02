using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using workshop2.DTOs;
using permissionAPI;
using permissionAPI.DTOs;
using workshop2.src.Infrastructure.Interface;
using workshop2.Controllers;

namespace workshop2.src.Infrastructure.Repositories
{
    public class RentalRepository : IRentalRepository
    {
        private readonly DataContext _dbContext;
        private readonly ILogger<RentalController> _logger;

        public RentalRepository(DataContext dbContext, ILogger<RentalController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<List<CompanyforidDTO>> GetCompanyByIDAsync(string companyname)
        {
            try
            {
                var companyData = await _dbContext.Company
                    .Where(x => x.CompanyName == companyname)
                    .AsNoTracking()
                    .Select(x => new CompanyforidDTO
                    {
                        companyid = x.CompanyID,
                    })
                    .ToListAsync();

                return companyData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddRentalAsync(RentalDTO rental)
        {
            try
            {
                var newRental = new RentalDbo
                {
                    warehouseid = rental.WarehouseId,
                    companyid = rental.CompanyId,
                    date_rental_start = rental.RentalStart,
                    date_rental_end = rental.RentalFinish,
                    Description = rental.Description,
                    userid = rental.UserId,
                    rentalstatus = rental.rentalstatus
                };

                await _dbContext.Rental.AddAsync(newRental);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<RentalDbo> UpdateRentalAsync(RentalDbo Rental)
        {
            try
            {
                // บันทึกข้อมูลก่อนการค้นหา
                _logger.LogInformation("Attempting to update Rental with ID: {RentalId}", Rental.rentalid);

                var existingRental = await _dbContext.Rental.FindAsync(Rental.rentalid);
                if (existingRental == null)
                {
                    _logger.LogError("Rental with ID {RentalId} not found", Rental.rentalid);
                    throw new Exception($"Rental with ID {Rental.rentalid} not found");
                }

                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Found Rental with ID: {RentalId}. Updating status to: {RentalStatus}", Rental.rentalid, Rental.rentalstatus);

                existingRental.rentalstatus = Rental.rentalstatus;
                _dbContext.Rental.Update(existingRental);

                // บันทึกข้อมูลก่อนการบันทึก
                await _dbContext.SaveChangesAsync();
                _logger.LogInformation("Successfully updated Rental with ID: {RentalId}", Rental.rentalid);

                return existingRental;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating Rental with ID: {RentalId}. Inner exception: {InnerException}", Rental.rentalid, ex.InnerException?.Message);
                throw new Exception($"Error occurred while updating Rental with ID {Rental.rentalid}", ex);
            }
        }


    }
}
