using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;

namespace permissionAPI.src.Core.Service
{
    //business logic layer select response
    public class UserService : IUserService
    {
        private readonly IUserRepository _UserRepository;

        public UserService(IUserRepository UserRepository)
        {
            _UserRepository = UserRepository;
        }

        public async Task<List<DTOs.UserDbo>> GetAllUserAsync()
        {
            try
            {
                var UserData = await _UserRepository.GetAllUserAsync();
                var UserReturn = UserData.Select(s => new DTOs.UserDbo
                {
                    //choose feild for response
                    UserID = s.UserID,
                    Username  = s.Username,
                    Password = s.Password,
                    Lastname = s.Lastname,
                    email = s.email,
                    phone =s.phone,
                    address =s.address,
                    RoleId =s.RoleId
                }).ToList();

                return UserReturn;
            }
            catch (Exception ex)
            {
                
                throw new ApplicationException("An error occurred while getting the User data.", ex);
            }
        }

        public async Task<List<DTOs.UserDbo>> GetUserByIDAsync(String Username ,String Password)
                {
                    try
                    {
                        var userData = await _UserRepository.GetUserByIDAsync(Username,Password);
                        var userReturn = userData.Select(s => new DTOs.UserDbo
                        {
                            UserID = s.UserID,
                            Username  = s.Username,
                            Password = s.Password,
                            Lastname = s.Lastname,
                            email = s.email,
                            phone =s.phone,
                            address =s.address,
                            RoleId =s.RoleId,
                            status =s.status
                        }).ToList();

                        return userReturn;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
        public async Task<DTOs.UserDbo> AddUserAsync(InputUSerDbo inputUSerDbo)
        {
            try
            {
                var User = new Entities.UserDbo
               {
                Username =  inputUSerDbo.Username,
                Password = inputUSerDbo.Password,
                Lastname = inputUSerDbo.Lastname,
                email = inputUSerDbo.email,
                phone =inputUSerDbo.phone,
                address =inputUSerDbo.address,
                RoleId =inputUSerDbo.RoleId
               };
               var addUser = await _UserRepository.AddUserAsync(User);
               return new DTOs.UserDbo{
                UserID = addUser.UserID,
                Username =  addUser.Username,
                Password = addUser.Password,
                Lastname = addUser.Lastname,
                email = addUser.email,
                phone =addUser.phone,
                address =addUser.address,
                RoleId =addUser.RoleId
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while adding data.", ex);
            }
        }


    }
}
