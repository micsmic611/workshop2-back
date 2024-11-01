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

        // ข้อมูลจาก Rental
        public int? companyid { get; set; }
        public int? userid { get; set; }
        public DateTime? date_rental_start { get; set; }
        public DateTime? date_rental_end { get; set; }
        public string? rentalstatus { get; set; }
        public string? Description { get; set; }

        // ข้อมูลจาก Company
        public string? companyName { get; set; }
        public string? companyFirstname { get; set; }
        public string? companyLastname { get; set; }
        public string? companyEmail { get; set; }
        public string? companyPhone { get; set; }
        public string? companyAddress { get; set; }

        public string? Username { get; set; }
    }

    public class WarehouseRentalDTOs
    {
        public int warehouseid { get; set; }
        public string? warehousename { get; set; }
        public string? warehouseaddress { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousestatus { get; set; }

        // ข้อมูลจาก Rental
        public int? companyid { get; set; }
        public int? userid { get; set; }
        public DateTime? date_rental_start { get; set; }
        public DateTime? date_rental_end { get; set; }
        public string? rentalstatus { get; set; }
        public string? Description { get; set; }

        // ข้อมูลจาก Company
        public string? companyName { get; set; }
        public string? companyFirstname { get; set; }
        public string? companyLastname { get; set; }
        public string? companyEmail { get; set; }
        public string? companyPhone { get; set; }
        public string? companyAddress { get; set; }
    }
}
