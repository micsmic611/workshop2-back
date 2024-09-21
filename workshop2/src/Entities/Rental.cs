using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("rental")]
    public class RentalDbo
    {
        [Key]
        [Required]
        [Column("rental_id", TypeName = "int")]
        public int rentalid { get; set; }

        [Required]
        [Column("company_id", TypeName = "int")]
        public int companyid { get; set; }

        [Required]
        [Column("user_id", TypeName = "int")]
        public int userid { get; set; }

        [Required]
        [Column("date_rental_start", TypeName = "datetime")]
        public DateTime date_rental_start { get; set; }

        [Column("date_rental_end", TypeName = "datetime")]
        public DateTime? date_rental_end { get; set; }

        [Required]
        [ForeignKey("warehouse")]
        [Column("warehouse_id", TypeName = "int")]
        public int warehouseid { get; set; }

        [Required]
        [Column("rental_status", TypeName = "varchar(100)")]
        public string rentalstatus { get; set; }


    }
}
