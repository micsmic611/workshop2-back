using workshop2.DTOs;
using permissionAPI.src.Entities;
using permissionAPI.DTOs;

namespace workshop2.src.Infrastructure.Interface
{
    public interface IRentalRepository
    {
        
        Task AddRentalAsync(RentalDTO rental);
        Task<RentalDbo> UpdateRentalAsync(RentalDbo Rental);
    }
}
