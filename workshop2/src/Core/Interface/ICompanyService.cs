using permissionAPI.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface ICompanyService
    {
        Task<List<CompanyDto>> GetAllCompanyAsync();

        Task<List<CompanyDto>> GetCompanyByNameAsync(String Companyname);

        Task<List<CompanyDto>> GetCompanyDetailByIDAsync(int Companyid);

        Task<DTOs.CompanyDto> AddCompanyAsync(InputCompanyDto InputCompanyDbo);

        Task<Companyforupdate> UpdateCompanyAsync(Companyforupdate Companyforupdate);
    }
}
