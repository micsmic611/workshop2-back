using permissionAPI.DTOs;
using workshop2.DTOs;
namespace permissionAPI.src.Core.Interface
{
    public interface IUserService
    {
        Task<List<UserDbo>> GetAllUserAsync();
        Task<DTOs.UserDbo> AddUserAsync(InputUSerDbo inputUSerDbo);
        Task<List<UserDbo>> GetUserByIDAsync(String Username ,String Password);
        Task<List<EmployeeDTO>> GetAllEmpAsync();
    }
}
