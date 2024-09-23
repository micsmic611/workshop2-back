using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
//using permissionAPI.DTOs;

namespace permissionAPI.src.Infrastructure.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _dbContext;

        public CompanyRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CompanyDbo>> GetAllCompanyAsync()
        {

            try
            {
                return await _dbContext.Company.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}