using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
//using permissionAPI.DTOs;

namespace permissionAPI.src.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dbContext;

        public UserRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UserDbo>> GetAllUserAsync()
        {
            try
            {
                return await _dbContext.User.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<UserDbo>> GetUserByIDAsync(String Username ,String Password)
        {
            var userData = new List<UserDbo>();
            try
            {
                userData = await _dbContext.User.Where(x => x.Username == Username&&x.Password == Password).AsNoTracking().ToListAsync();
                return userData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserDbo> AddUserAsync(UserDbo User )
        {
           try{
            _dbContext.User.Add(User);
            await _dbContext.SaveChangesAsync();
            return User;
           }
           catch(Exception ex){
            throw ex;
           }
        }  
    }
}
