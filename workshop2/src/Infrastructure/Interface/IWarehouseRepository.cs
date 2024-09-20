using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface IWarehouseRepository
    {
        Task<List<WarehouseDbo>> GetAllWarehouseAsync();
        Task<WarehouseDbo> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string rentalStatus);
    }
}