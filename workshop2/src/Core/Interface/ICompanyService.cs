using permissionAPI.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface ICompanyService
    {
        Task<List<CompanyDbo>> GetAllCompanyAsync();
    }
}
