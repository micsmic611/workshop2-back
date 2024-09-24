using permissionAPI.DTOs;
using permissionAPI.src.Entities;
using workshop2.DTOs;

namespace workshop2.src.Core.Interface
{
    public interface IRentalService
    {
        Task<List<CompanyforidDTO>> GetUserByIDAsync(string companyname);
        Task AddRentalAsync(RentalDTO rental);

    }
}
