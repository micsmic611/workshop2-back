using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface ICompanyRepository
    {
        Task<List<CompanyDbo>> GetAllCompanyAsync();
    }
}
