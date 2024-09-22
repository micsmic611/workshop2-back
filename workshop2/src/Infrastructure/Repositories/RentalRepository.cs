using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
using workshop2.DTOs;
using permissionAPI.DTOs;


namespace workshop2.src.Infrastructure.Repositories
{
    public class RentalRepository
    {
        private readonly DataContext _dbContext;
        public RentalRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        //public async Task<RentalDbo> AddRentalAsync(RentalCreateDTO rentalDto)
        //{
        //    var company = await _dbContext.Companies.FindAsync(rentalDto.CompanyId);
        //    if (company == null)
        //    {
        //        throw new KeyNotFoundException("Company not found.");
        //    }

        //    var rental = new RentalDbo
        //    {
        //        WarehouseId = rentalDto.WarehouseId,
        //        CompanyId = rentalDto.CompanyId,
        //        RentalStart = rentalDto.RentalStart,
        //        RentalFinish = rentalDto.RentalFinish,
        //        Description = rentalDto.Description,
        //        RentalStatus = 1 // หรือค่าเริ่มต้นที่คุณต้องการ
        //    };

        //    _dbContext.Rentals.Add(rental);
        //    await _dbContext.SaveChangesAsync();

        //    return rental;
        //}

    }
}
