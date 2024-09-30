using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
//using permissionAPI.DTOs;
//repo = select add delete update && same name function Interface repo next step goto service for business layer 
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
        //ex function(requirement ,Username password)
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

        public async Task<List<UserDbo>> GetAllEmpAsync()
        {
            var userData = new List<UserDbo>();
            try
            {
                userData = await _dbContext.User.Where(x => x.RoleId == 2 ).AsNoTracking().ToListAsync();
                return userData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<UserDbo>> GetEmpByNameAsync(String Username)
        {
            var userData = new List<UserDbo>();
            try
            {
                userData = await _dbContext.User.Where(x => x.RoleId == 2 && x.Username == Username).AsNoTracking().ToListAsync();
                return userData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UserDbo> AddEmpAsync(UserDbo User)
        {
            try
            {
                _dbContext.User.Add(User);
                await _dbContext.SaveChangesAsync();
                return User;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserDbo> AddUserAsync(string Username, string hashedPassword)
        {
            try
            {
                UserDbo user = new UserDbo
                {
                    Username = Username,
                    Password = hashedPassword
                };

                _dbContext.User.Add(user);
                await _dbContext.SaveChangesAsync();

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the user.", ex);
            }
        }
        //new
        public async Task<UserDbo> Create(UserDbo user)
        {
            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<UserDbo> Update(UserDbo user)
        {
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == user.UserID);
            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            existingUser.Username = user.Username;
            existingUser.email = user.email;
            existingUser.Password = user.Password; // ????????????????????????????

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }
        public async Task<UserDbo> GetByEmail(string email)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.email == email);
        }

        public async Task<UserDbo> GetById(int UserID)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == UserID);
        }

        public async Task<UserDbo> UpdateEmp(UserDbo user)
        {
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == user.UserID);
            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            existingUser.Username = user.Username;
            existingUser.email = user.email;
            existingUser.Password = user.Password; // ????????????????????????????

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }
    }
}
