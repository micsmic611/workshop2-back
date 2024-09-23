namespace permissionAPI.DTOs
{
    public class RentalDbo
    {
        public int rentalid { get; set; }
        public int companyid { get; set; }
        public int userid { get; set; }
        public DateTime date_rental_start { get; set; }
        public DateTime? date_rental_end { get; set; }
        public int warehouseid { get; set; }
        public string rentalstatus { get; set; }

 
    }
    public class RentalCreateDTO
    {
        public int WarehouseId { get; set; }
        public string CompanyName { get; set; } // เปลี่ยนจาก CompanyId เป็น CompanyName
        public DateTime RentalStart { get; set; }
        public DateTime RentalFinish { get; set; }
        public string Description { get; set; }
    }
}
