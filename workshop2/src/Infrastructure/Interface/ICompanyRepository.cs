using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface ICompanyRepository
    {
        Task<List<CompanyDbo>> GetAllCompanyAsync();

        Task<List<CompanyDbo>> GetCompanyByNameAsync(String Companyname);

        Task<List<CompanyDbo>> GetCompanyDetailByIDAsync(int Companyid);

        Task<CompanyDbo> AddCompanyAsync(CompanyDbo Company);

        Task<CompanyDbo> UpdateCompanyAsync(CompanyDbo Company);
    }
}
