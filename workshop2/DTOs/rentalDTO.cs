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

        // หากต้องการเชื่อมโยงกับ WarehouseDbo (Optional)
        public WarehouseDbo? warehouse { get; set; }
    }
}
