using Microsoft.EntityFrameworkCore;
using permissionAPI.src.Entities;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI;
//using permissionAPI.DTOs;

namespace permissionAPI.src.Infrastructure.Repositories
{
    public class number1Repository : Inumber1Repository
    {
        private readonly DataContext _dbContext;

        public number1Repository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<number1Dbo>> GetAllnumber1Async()
        {

            try
            {
                return await _dbContext.cim.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<number1Dbo> Addnumber1Async(number1Dbo cim )
        {
           try{
            _dbContext.cim.Add(cim);
            await _dbContext.SaveChangesAsync();
            return cim;
           }
           catch(Exception ex){
            throw ex;
           }
        }  

    }
}
