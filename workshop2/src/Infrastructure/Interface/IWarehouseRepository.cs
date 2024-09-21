using permissionAPI.src.Entities;
using workshop2.DTOs;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface IWarehouseRepository
    {
        Task<List<WarehouseDbo>> GetAllWarehouseAsync();
        Task<WarehouseRentalDTO> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string warehousestatus);
    }
}