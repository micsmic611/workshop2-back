using permissionAPI.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface IWarehouseService
    {
        Task<List<DTOs.WarehouseDbo>> GetAllWarehouseAsync();
    }
}
