using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface IUserRepository
    {
        Task<List<UserDbo>> GetAllUserAsync();
        Task<UserDbo> AddUserAsync( UserDbo User);
        Task<List<UserDbo>> GetUserByuserIDAsync(int userid);
        Task<List<UserDbo>> GetUserByIDAsync(String Username ,String Password);
        Task<List<UserDbo>> GetAllEmpAsync();
        Task<List<UserDbo>> GetEmpByNameAsync(String Username);
        Task<UserDbo> AddEmpAsync(UserDbo User);
        //new
        Task<UserDbo> Create(UserDbo user);
        Task<UserDbo> Update(UserDbo user);

        Task<UserDbo> GetByusername(string username);
        Task<UserDbo> GetById(int UserID);
        Task<UserDbo> UpdateUserAsync(UserDbo user);
        Task<UserDbo> UpdateEmpAsync(UserDbo user);

        Task<List<UserDbo>> GetAllUser1Async();
        Task<bool> UpdateUserStatus(int userId);
    }
}