using Microsoft.Extensions.Logging;
using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI.src.Infrastructure.Repositories;
using System.ComponentModel.Design;
using workshop2.DTOs;
using workshop2.src.Services;

namespace permissionAPI.src.Core.Service
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _CompanyRepository;
        private readonly ILogger<RentalService> _logger;

        public CompanyService(ICompanyRepository CompanyRepository, ILogger<RentalService> logger)
        {
            _CompanyRepository = CompanyRepository;
            _logger = logger;
        }

        public async Task<List<DTOs.CompanyDto>> GetAllCompanyAsync()
        {
            try
            {
                var CompanyData = await _CompanyRepository.GetAllCompanyAsync();
                var CompanyReturn = CompanyData.Select(s => new DTOs.CompanyDto
                {
                    company_id = s.CompanyID,
                    company_name = s.CompanyName,
                    company_address = s.CompanyAddress,
                    company_phone = s.CompanyPhone,
                    company_email = s.CompanyEmail,
                    company_firstname = s.CompanyFirstname,
                    company_lastname = s.CompanyLastname,

                }).ToList();
                return CompanyReturn;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while getting the Company data.", ex);
            }
        }

        public async Task<List<DTOs.CompanyDto>> GetCompanyByNameAsync(String Companyname)
        {
            try
            {
                var userData = await _CompanyRepository.GetCompanyByNameAsync(Companyname);
                var userReturn = userData.Select(s => new DTOs.CompanyDto
                {
                    company_id = s.CompanyID,
                    company_name = s.CompanyName,
                    company_phone = s.CompanyPhone,
                    company_email = s.CompanyEmail,
                    company_firstname = s.CompanyFirstname,
                    company_lastname= s.CompanyLastname,
                }).ToList();
                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DTOs.CompanyDto>> GetCompanyDetailByIDAsync(int Companyid)
        {
            try
            {
                var userData = await _CompanyRepository.GetCompanyDetailByIDAsync(Companyid);
                var userReturn = userData.Select(s => new DTOs.CompanyDto
                {
                    company_id = s.CompanyID,
                    company_name = s.CompanyName,
                    company_phone = s.CompanyPhone,
                    company_email = s.CompanyEmail,
                    company_address = s.CompanyAddress,
                    company_firstname = s.CompanyFirstname,
                    company_lastname = s.CompanyLastname,
                }).ToList();
                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DTOs.CompanyDto> AddCompanyAsync(InputCompanyDto InputCompanyDbo)
        {
            try
            {
                var Company = new Entities.CompanyDbo
                {
                    CompanyName = InputCompanyDbo.company_name,
                    CompanyPhone = InputCompanyDbo.company_phone,
                    CompanyEmail = InputCompanyDbo.company_email,
                    CompanyAddress = InputCompanyDbo.company_address,
                    CompanyFirstname = InputCompanyDbo.company_firstname,
                    CompanyLastname = InputCompanyDbo.company_lastname,


                };
                var addCompany = await _CompanyRepository.AddCompanyAsync(Company);
                return new DTOs.CompanyDto
                {
                    company_id = addCompany.CompanyID,
                    company_name = addCompany.CompanyName,
                    company_phone = addCompany.CompanyPhone,
                    company_email = addCompany.CompanyEmail,
                    company_address = addCompany.CompanyAddress,
                    company_firstname = addCompany.CompanyFirstname,
                    company_lastname = addCompany.CompanyLastname,

                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while adding data.", ex);
            }
        }

        public async Task<Companyforupdate> UpdateCompanyAsync(Companyforupdate Companyforupdate)
        {
            try
            {
                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Received request to update Company with ID: {CompanyId} ", Companyforupdate.company_id, Companyforupdate.company_name);

                var companyupdate = new CompanyDbo

                {

                    CompanyID = Companyforupdate.company_id,
                    CompanyName = Companyforupdate.company_name,
                    CompanyAddress = Companyforupdate.company_address,
                    CompanyEmail = Companyforupdate.company_email,
                    CompanyFirstname = Companyforupdate.company_firstname,
                    CompanyLastname = Companyforupdate.company_lastname,
                    CompanyPhone = Companyforupdate.company_phone,
               

                };

                var updatedCompany = await _CompanyRepository.UpdateCompanyAsync(companyupdate);

                // บันทึกข้อมูลหลังการอัปเดตสำเร็จ
                _logger.LogInformation("Successfully updated Company with ID: {CompanyId}", updatedCompany.CompanyID);

                return new Companyforupdate
                {
                    company_id = Companyforupdate.company_id,
                    company_name = Companyforupdate.company_name,
                    company_address = Companyforupdate.company_address,
                    company_email   = Companyforupdate.company_email,
                    company_firstname = Companyforupdate.company_firstname,
                    company_lastname =  Companyforupdate.company_lastname,
                    company_phone = Companyforupdate.company_phone,
                    
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating Company with ID: {CompanyId}. Inner exception: {InnerException}", Companyforupdate.company_id, ex.InnerException?.Message);
                throw new Exception("Error occurred while updating Rental", ex);
            }
        }

    }
}

