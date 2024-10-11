using workshop2.DTOs;
using workshop2.src.Infrastructure.Interface;
using workshop2.src.Core.Interface;
using permissionAPI.DTOs;
using permissionAPI.src.Entities;
using Microsoft.Extensions.Logging;
using permissionAPI.src.Infrastructure.Interface;

namespace workshop2.src.Services
{
    public class RentalService : IRentalService
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly ILogger<RentalService> _logger;
        private readonly ICompanyRepository _companyRepository;

        public RentalService(IRentalRepository rentalRepository, ILogger<RentalService> logger,ICompanyRepository companyRepository)
        {
            _rentalRepository = rentalRepository;
            _companyRepository = companyRepository;
            _logger = logger; // Injecting the logger
            _companyRepository = companyRepository;
        }

        public async Task<List<CompanyforidDTO>> GetCompanyByIDAsync(string companyname)
        {
            if (string.IsNullOrWhiteSpace(companyname))
            {
                throw new ArgumentNullException(nameof(companyname), "ชื่อบริษัทต้องไม่ว่างเปล่า");
            }
            return await _companyRepository.GetCompanyByIDAsync(companyname);
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
        public async Task<Rentalforupdate> UpdateRentalAsync(Rentalforupdate Rentalforupdate)
        {
            try
            {
                // บันทึกข้อมูลก่อนการอัปเดต
                _logger.LogInformation("Received request to update Rental with ID: {RentalId} and Status: {RentalStatus}", Rentalforupdate.rentalid, Rentalforupdate.rentalstatus);

                var rental = new RentalDbo
                {
                    rentalid = Rentalforupdate.rentalid,
                    rentalstatus = Rentalforupdate.rentalstatus
                };

                var updatedRental = await _rentalRepository.UpdateRentalAsync(rental);

                // บันทึกข้อมูลหลังการอัปเดตสำเร็จ
                _logger.LogInformation("Successfully updated Rental with ID: {RentalId}", updatedRental.rentalid);

                return new Rentalforupdate
                {
                    rentalid = updatedRental.rentalid,
                    rentalstatus = updatedRental.rentalstatus
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating Rental with ID: {RentalId}. Inner exception: {InnerException}", Rentalforupdate.rentalid, ex.InnerException?.Message);
                throw new Exception("Error occurred while updating Rental", ex);
            }
        }

    }
}
