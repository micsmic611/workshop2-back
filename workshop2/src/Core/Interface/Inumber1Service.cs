using permissionAPI.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface Inumber1Service
    {
        Task<List<number1Dbo>> GetAllnumber1Async();
        Task<DTOs.number1Dbo> Addnumber1Async(Inputnumber1Dbo inputnumber1Dbo);
        
    }
}
