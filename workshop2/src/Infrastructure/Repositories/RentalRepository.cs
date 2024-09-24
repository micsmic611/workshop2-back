using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using workshop2.DTOs;
using permissionAPI;
using permissionAPI.DTOs;
using workshop2.src.Infrastructure.Interface;

namespace workshop2.src.Infrastructure.Repositories
{
    public class RentalRepository : IRentalRepository
    {
        private readonly DataContext _dbContext;

        public RentalRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CompanyforidDTO>> GetUserByIDAsync(string companyname)
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
    }
}
