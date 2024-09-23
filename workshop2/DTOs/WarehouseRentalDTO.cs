namespace workshop2.DTOs
{
    public class WarehouseRentalDTO
    {
        public int warehouseid { get; set; }
        public string? warehouseaddress { get; set; }
        public string? warehousename { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousestatus { get; set; }
        public DateTime date_rental_start { get; set; }
    }
    public class WarehouseRentalDetailDTO
    {
        public int warehouseid { get; set; }
        public string? warehousename { get; set; }
        public string? warehouseaddress { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousestatus { get; set; }
        public string rentalstatus { get; set; }
        public DateTime date_rental_start { get; set; }
        public DateTime? date_rental_end { get; set; }
        public string? Description { get; set; }
        public string? Username { get; set; }
    }
}
