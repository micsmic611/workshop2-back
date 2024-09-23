using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("warehouse")]
    public class WarehouseDbo
    {
        [Key]
        [Required]
        [Column("warehouse_id", TypeName = "int")]
        public int warehouseid { get; set; }

        [Column("warehouse_address", TypeName = "varchar(255)")]
        public string? warehouseaddress { get; set; }

        [Column("warehouse_name", TypeName = "varchar(100)")]
        public string? warehousename { get; set; }

        [Column("warehouse_size", TypeName = "DECIMAL(10,2)")]
        public decimal? warehousesize { get; set; }

        [Column("warehouse_status", TypeName = "varchar(100)")]
        public string? warehousstatus { get; set; }

    }
}
