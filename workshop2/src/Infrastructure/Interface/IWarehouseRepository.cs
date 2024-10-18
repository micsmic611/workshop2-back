using permissionAPI.src.Entities;
using workshop2.DTOs;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface IWarehouseRepository
    {
        Task<List<WarehouseDbo>> GetAllWarehouseAsync();

        Task<WarehouseRentalDTO> GetWarehouseByIdAsync(string warehouseName, DateTime rentalDateStart, string warehousestatus);

        Task<WarehouseRentalDetailDTO> getwarehosedetail(string warehousename, string rentalstatus);
        Task<WarehouseRentalDetailDTO> getwarehosedetailsearch(string warehousename, string rentalstatus, DateTime date_rental_start);

        Task<WarehouseDbo> AddWarehouseAsync(WarehouseDbo Warehosue);

        Task<List<WarehouseRentalDTOs>> GetAllWarehousesWithRentalAsync();
    }
}