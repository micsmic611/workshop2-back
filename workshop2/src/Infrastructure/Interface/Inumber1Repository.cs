using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface Inumber1Repository
    {
        Task<List<number1Dbo>> GetAllnumber1Async();
        Task<number1Dbo> Addnumber1Async( number1Dbo cim);
        
    }
}
