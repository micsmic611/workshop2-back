using permissionAPI.DTOs;
using workshop2.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface IWarehouseService
    {
        Task<List<DTOs.WarehouseDbo>> GetAllWarehouseAsync();
        Task<WarehouseRentalDTO> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string warehousestatus);
        Task<WarehouseRentalDetailDTO> getwarehosedetail(int warehouseid, DateTime rentalDateStart, string warehousestatus);
        Task<DTOs.WarehouseDbo> AddWarehouseAsync(InputWarehosueDbo InputWarehosueDbo);
        Task<List<WarehouseRentalDTOs>> getwarehoserental();
    }
}
