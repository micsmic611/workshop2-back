namespace permissionAPI.DTOs
{
    
    public class RentalDTO
    {
        public int WarehouseId { get; set; }
        public int CompanyId { get; set; }
        public DateTime RentalStart { get; set; }
        public DateTime RentalFinish { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string rentalstatus { get; set; }

    }
    public class Rentalforupdate 
    { 
        public int rentalid { get; set; }
        public string? rentalstatus { get; set; }
    }

    

    public class RentalCreateDTO
    {
        public int WarehouseId { get; set; }
        public string? CompanyId { get; set; } // เปลี่ยนจาก CompanyId เป็น CompanyName
        public DateTime RentalStart { get; set; }
        public DateTime RentalFinish { get; set; }
        public string? Description { get; set; }
    }
}
