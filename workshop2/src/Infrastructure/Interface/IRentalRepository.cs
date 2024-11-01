using workshop2.DTOs;
using permissionAPI.src.Entities;
using permissionAPI.DTOs;

namespace workshop2.src.Infrastructure.Interface
{
    public interface IRentalRepository
    {
        
        Task AddRentalAsync(RentalDTO rental);
        Task<RentalDbo> UpdateRentalAsync(RentalDbo Rental);
        Task<RentalDbo> GetRentalByIdAsync(int rentalId);
        Task UpdateRentalStatusAsync(int rentalId, string status);
        Task AddCancelRentalAsync(cancelrentalDbo cancelRental);
    }
}
