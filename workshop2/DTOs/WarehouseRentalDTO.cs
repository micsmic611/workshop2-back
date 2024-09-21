namespace workshop2.DTOs
{
    public class WarehouseRentalDTO
    {
        public int warehouseid { get; set; }
        public string? warehouseaddress { get; set; }
        public string? warehousename { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousstatus { get; set; }
        public DateTime date_rental_start { get; set; }
    }
}
