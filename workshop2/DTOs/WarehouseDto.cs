namespace permissionAPI.DTOs
{
    public class WarehouseDbo
    {
        public int warehouseid { get; set; }
        public string? warehouseaddress { get; set; }
        public string? warehousename { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousestatus { get; set; }
    }

    public class InputWarehosueDbo
    {
        public string? warehousename { get; set; }
        public string? warehouseaddress { get; set; }
        public decimal? warehousesize { get; set; }
        public string? warehousestatus { get; set; }

    }
    public class UpdateWarehouseDto
    {
        public string? warehousename { get; set; }
    }
}
