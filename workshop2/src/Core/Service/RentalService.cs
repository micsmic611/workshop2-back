using workshop2.DTOs;
using workshop2.src.Infrastructure.Interface;
using workshop2.src.Core.Interface;
using permissionAPI.DTOs;
using permissionAPI.src.Entities;

namespace workshop2.src.Services
{
    public class RentalService : IRentalService
    {
        private readonly IRentalRepository _rentalRepository;

        public RentalService(IRentalRepository rentalRepository)
        {
            _rentalRepository = rentalRepository;
        }

        public async Task<List<CompanyforidDTO>> GetUserByIDAsync(string companyname)
        {
            if (string.IsNullOrWhiteSpace(companyname))
            {
                throw new ArgumentNullException(nameof(companyname), "ชื่อบริษัทต้องไม่ว่างเปล่า");
            }

            return await _rentalRepository.GetUserByIDAsync(companyname);
        }
        public async Task AddRentalAsync(RentalDTO rental)
        {
            // คุณอาจจะเพิ่มการตรวจสอบข้อมูลก่อนที่จะเพิ่ม rental
            if (rental == null)
            {
                throw new ArgumentNullException(nameof(rental));
            }

            await _rentalRepository.AddRentalAsync(rental);
        }

    }
}
