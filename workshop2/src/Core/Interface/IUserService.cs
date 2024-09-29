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
        Task<List<EmployeeDTO>> GetEmpByNameAsync(String Username);
        Task<EmployeeDTO> AddEmpAsync(InputEmployeeDTO inputEmployeeDTO);
       // Task<string> GetUserIdByUsernameAsync(string username);
    }
}
//Task<List<DTOs.UserDbo>> GetAllUserAsync()
//Task<List<DTOs.UserDbo>> GetUserByIDAsync(String Username ,String Password)
//Task<DTOs.UserDbo> AddUserAsync(InputUSerDbo inputUSerDbo)
// Task<List<EmployeeDTO>> GetAllEmpAsync()
//Task<List<EmployeeDTO>> GetEmpByNameAsync(String Username)
//Task<EmployeeDTO> AddEmpAsync(InputEmployeeDTO inputEmployeeDTO)