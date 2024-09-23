using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;

namespace permissionAPI.src.Core.Service
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _CompanyRepository;

        public CompanyService(ICompanyRepository CompanyRepository)
        {
            _CompanyRepository = CompanyRepository;
        }

        public async Task<List<DTOs.CompanyDbo>> GetAllCompanyAsync()
        {
            try
            {
                var CompanyData = await _CompanyRepository.GetAllCompanyAsync();
                var CompanyReturn = CompanyData.Select(s => new DTOs.CompanyDbo
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
    }
}
