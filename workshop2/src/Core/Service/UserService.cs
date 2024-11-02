using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI.src.Infrastructure.Repositories;
using System.ComponentModel.DataAnnotations;
using workshop2.DTOs;
using workshop2.src.Services; 

namespace permissionAPI.src.Core.Service
{
    //business logic layer select response
    public class UserService : IUserService
    {
        private readonly IUserRepository _UserRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository UserRepository, ILogger<UserService> logger)
        {
            _UserRepository = UserRepository;
            _logger = logger;
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
        public async Task<List<Userdto>> GetUserByIDAsync(int userid)
        {
            try
            {
                var userData = await _UserRepository.GetUserByuserIDAsync(userid);
                var userReturn = userData.Select(s => new DTOs.Userdto
                {
                    UserID = s.UserID,
                    Username = s.Username,
                    Firstname =s.Firstname,
                    Lastname = s.Lastname,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    RoleId = s.RoleId,
                    status = s.status
                }).ToList();

                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
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

        public async Task<List<EmployeeDTO>> GetAllEmpAsync()
        {
            try
            {
                var userData = await _UserRepository.GetAllEmpAsync();
                var userReturn = userData.Select(s => new EmployeeDTO
                {
                    UserID = s.UserID,
                    //Username = s.Username,
                    //Password = s.Password,
                    Firstname = s.Firstname,
                    Lastname = s.Lastname,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    RoleId = s.RoleId,
                    status = s.status
                }).ToList();

                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<EmployeeDTO>> GetAlluser1Async()
        {
            try
            {
                var userData = await _UserRepository.GetAllUser1Async();
                var userReturn = userData.Select(s => new EmployeeDTO
                {
                    UserID = s.UserID,
                    Username = s.Username,
                    //Password = s.Password,
                    Firstname = s.Firstname,
                    Lastname = s.Lastname,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    RoleId = s.RoleId,
                    status = s.status
                }).ToList();

                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> UpdateStatusToZero(int userId)
        {
            return await _UserRepository.UpdateUserStatus(userId);
        }
        public async Task<List<EmployeeDTO>> GetEmpByNameAsync(String Username)
        {
            try
            {
                var userData = await _UserRepository.GetEmpByNameAsync(Username);
                var userReturn = userData.Select(s => new EmployeeDTO
                {
                    UserID = s.UserID,
                    Username = s.Username,
                    //Password = s.Password,
                    Firstname = s.Firstname,
                    Lastname = s.Lastname,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    RoleId = s.RoleId,
                    status = s.status
                }).ToList();

                return userReturn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<EmployeeDTO> AddEmpAsync(InputEmployeeDTO inputEmployeeDTO)
        {
            try
            {
                var employee = new Entities.UserDbo
                {
                    Username = inputEmployeeDTO.Firstname,
                    Password = BCrypt.Net.BCrypt.HashPassword(inputEmployeeDTO.Firstname), // เข้ารหัสรหัสผ่าน
                    Firstname = inputEmployeeDTO.Firstname,
                    Lastname = inputEmployeeDTO.Lastname,
                    email = inputEmployeeDTO.email,
                    phone = inputEmployeeDTO.phone,
                    address = inputEmployeeDTO.address,
                    RoleId = 1, // ตั้งค่า RoleId เป็น 1
                    status = 1.ToString()
                };

                var addUser = await _UserRepository.AddEmpAsync(employee);

                // แมปค่าเป็น EmployeeDTO
                return new EmployeeDTO
                {
                    UserID = addUser.UserID,
                    Username = addUser.Username,
                    Password = addUser.Password,
                    Firstname = addUser.Firstname,
                    Lastname = addUser.Lastname,
                    email = addUser.email,
                    phone = addUser.phone,
                    address = addUser.address,
                    RoleId = addUser.RoleId,
                    status = addUser.status
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while adding data.", ex);
            }
        }

        public async Task<Userforupdate> UpdateUserAsync(Userforupdate Userforupdate)
        {
            try
            {
                // ?????????????????????????
                _logger.LogInformation("Received request to update User with ID: {UserID} ", Userforupdate.UserID);

                var User = new Entities.UserDbo
                {
                    UserID = Userforupdate.UserID,
                    Firstname = Userforupdate.Firstname,
                    Lastname = Userforupdate.Lastname,
                    email = Userforupdate.email,
                    Username = Userforupdate.Username,
                    address = Userforupdate.address,
                    phone = Userforupdate.phone,
                };


                var updatedRental = await _UserRepository.UpdateUserAsync(User);

                // ???????????????????????????????
                _logger.LogInformation("Successfully updated User with ID: {UserID}", Userforupdate.UserID);

                return new Userforupdate
                {
                    UserID = Userforupdate.UserID,
                    Firstname = Userforupdate.Firstname,
                    Lastname = Userforupdate.Lastname,
                    Username = Userforupdate.Username,
                    email = Userforupdate.email,
                    address = Userforupdate.address,
                    phone = Userforupdate.phone,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating User with ID: {UserID}. Inner exception: {InnerException}", Userforupdate.UserID, ex.InnerException?.Message);
                throw new Exception("Error occurred while updating Rental", ex);
            }
        }

        public async Task<UpdateEmpDTO> UpdateEmpAsync(UpdateEmpDTO UpdateEmpDTO)
        {
            try
            {
                // ?????????????????????????
                _logger.LogInformation("Received request to update User with ID: {UserID} ", UpdateEmpDTO.UserID);

                var User = new Entities.UserDbo
                {
                    UserID = UpdateEmpDTO.UserID,
                    Firstname = UpdateEmpDTO.Firstname,
                    Lastname = UpdateEmpDTO.Lastname,
                    email = UpdateEmpDTO.email,
                    address = UpdateEmpDTO.address,
                    phone = UpdateEmpDTO.phone,
                };


                var updatedRental = await _UserRepository.UpdateEmpAsync(User);

                _logger.LogInformation("Successfully updated User with ID: {UserID}", UpdateEmpDTO.UserID);

                return new UpdateEmpDTO
                {
                    UserID = UpdateEmpDTO.UserID,
                    Firstname = UpdateEmpDTO.Firstname,
                    Lastname = UpdateEmpDTO.Lastname,
                    email = UpdateEmpDTO.email,
                    address = UpdateEmpDTO.address,
                    phone = UpdateEmpDTO.phone,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating User with ID: {UserID}. Inner exception: {InnerException}", UpdateEmpDTO.UserID, ex.InnerException?.Message);
                throw new Exception("Error occurred while updating Employee", ex);
            }
        }
    }
}
