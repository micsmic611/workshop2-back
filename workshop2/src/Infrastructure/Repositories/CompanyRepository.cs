using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
using System.Linq;
using System.ComponentModel.Design;
using Microsoft.Extensions.Logging;
using workshop2.Controllers;
using permissionAPI.Controllers;
using permissionAPI.DTOs;
//using permissionAPI.DTOs;

namespace permissionAPI.src.Infrastructure.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _dbContext;
        private readonly ILogger<CompanyController> _logger;

        public CompanyRepository(DataContext dbContext, ILogger<CompanyController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
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

        public async Task<List<CompanyDbo>> GetCompanyByNameAsync(String Companyname)
        {
            var CompanyData = new List<CompanyDbo>();
            try
            {
                CompanyData = await _dbContext.Company
                    .Where(x => x.CompanyName.Contains(Companyname))
                    .AsNoTracking()
                    .ToListAsync();
                return CompanyData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CompanyDbo>> GetCompanyDetailByIDAsync(int Companyid)
        {
            var CompanyData = new List<CompanyDbo>();
            try
            {
                CompanyData = await _dbContext.Company
                                      .Where(x => x.CompanyID == Companyid)
                                      .AsNoTracking()
                                      .ToListAsync();
                return CompanyData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CompanyDbo> AddCompanyAsync(CompanyDbo Company)
        {
            try
            {
                _dbContext.Company.Add(Company);
                await _dbContext.SaveChangesAsync();
                return Company;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CompanyDbo> UpdateCompanyAsync(CompanyDbo Company)
        {
            try
            {
                // บันทึกข้อมูลก่อนการค้นหา
                _logger.LogInformation("Attempting to update Company with ID: {CompanyId}", Company.CompanyID);

                var existingCompany = await _dbContext.Company.FindAsync(Company.CompanyID);
                if (existingCompany == null)
                {
                    _logger.LogError("Company with ID {CompanyId} not found", Company.CompanyID);
                    throw new Exception($"Company with ID {Company.CompanyID} not found");
                }

                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Found Company with ID: {CompanyId}. Updating to: {CompanyId}", Company.CompanyID, Company.CompanyName);

                existingCompany.CompanyName = Company.CompanyName;
                existingCompany.CompanyAddress = Company.CompanyAddress;
                existingCompany.CompanyEmail = Company.CompanyEmail;
                existingCompany.CompanyPhone = Company.CompanyPhone;
                existingCompany.CompanyFirstname = Company.CompanyFirstname;
                existingCompany.CompanyLastname = Company.CompanyLastname;

                _dbContext.Company.Update(existingCompany);

                // บันทึกข้อมูลก่อนการบันทึก
                await _dbContext.SaveChangesAsync();
                _logger.LogInformation("Successfully updated Company with ID: {CompanyId}", Company.CompanyID);

                return existingCompany;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating Company with ID: {CompanyId}. Inner exception: {InnerException}", Company.CompanyID, ex.InnerException?.Message);
                throw new Exception($"Error occurred while updating Rental with ID {Company.CompanyID}", ex);
            }
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
    }
}