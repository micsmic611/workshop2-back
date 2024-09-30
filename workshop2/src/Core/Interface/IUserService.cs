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
<<<<<<< HEAD
    
=======
        Task<Userforupdate> UpdateUserAsync(Userforupdate Userforupdate);
>>>>>>> c8880e1a90d922b21cec404d22c712416c5d9034
    }
}
