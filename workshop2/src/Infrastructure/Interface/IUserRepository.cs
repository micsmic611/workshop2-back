using permissionAPI.src.Entities;

namespace permissionAPI.src.Infrastructure.Interface
{
    public interface IUserRepository
    {
        Task<List<UserDbo>> GetAllUserAsync();
        Task<UserDbo> AddUserAsync( UserDbo User);
        Task<List<UserDbo>> GetUserByIDAsync(String Username ,String Password);
        Task<List<UserDbo>> GetAllEmpAsync();
        Task<List<UserDbo>> GetEmpByNameAsync(String Username);
        Task<UserDbo> AddEmpAsync(UserDbo User);
        //new
        Task<UserDbo> Create(UserDbo user);
        Task<UserDbo> Update(UserDbo user);

        Task<UserDbo> GetByEmail(string email);
        Task<UserDbo> GetById(int UserID);
        Task<UserDbo> UpdateUserAsync(UserDbo user);


    }
}