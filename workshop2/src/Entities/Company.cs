using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("company")]
    public class CompanyDbo
    {
        [Key]
        [Required]
        [Column("company_id", TypeName = "int")]
        public int CompanyID { get; set; }

        [Column("company_name", TypeName = "varchar(100)")]
        public string? CompanyName { get; set; }

        [Column("company_firstname", TypeName = "varchar(100)")]
        public string? CompanyFirstname { get; set; }

        [Column("company_lastname", TypeName = "varchar(100)")]
        public string? CompanyLastname { get; set; }

        [Column("company_email", TypeName = "varchar(100)")]
        public string? CompanyEmail { get; set; }

        [Column("company_phone", TypeName = "varchar(20)")]
        public string? CompanyPhone { get; set; }

        [Column("company_address", TypeName = "varchar(255)")]
        public string? CompanyAddress { get; set; }

    }
}
