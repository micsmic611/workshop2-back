using permissionAPI.DTOs;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;

namespace permissionAPI.src.Core.Service
{
    public class number1Service : Inumber1Service
    {
        private readonly Inumber1Repository _number1Repository;

        public number1Service(Inumber1Repository number1Repository)
        {
            _number1Repository = number1Repository;
        }

        public async Task<List<DTOs.number1Dbo>> GetAllnumber1Async()
        {
            try
            {
                var number1Data = await _number1Repository.GetAllnumber1Async();
                var number1Return = number1Data.Select(s => new DTOs.number1Dbo
                {
                    CimID = s.CimID,
                    cim  = s.cim
                }).ToList();

                return number1Return;
            }
            catch (Exception ex)
            {
                // Consider logging the exception or handling it in a more user-friendly manner
                throw new ApplicationException("An error occurred while getting the number1 data.", ex);
            }
        }

        public async Task<DTOs.number1Dbo> Addnumber1Async(Inputnumber1Dbo inputnumber1Dbo)
        {
            try
            {
                var role = new Entities.number1Dbo
               {
                cim =  inputnumber1Dbo.cim
               };
               var addRole = await _number1Repository.Addnumber1Async(role);
               return new DTOs.number1Dbo{
                CimID = addRole.CimID,
                cim = addRole.cim
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while adding data.", ex);
            }
        }


    }
}
