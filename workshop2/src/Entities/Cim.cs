using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("number1")]
    public class number1Dbo
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("CimID", TypeName = "int")]
        public int CimID { get; set; }

        [Column("cim", TypeName = "nvarchar(255)")]
        public string? cim { get; set; }
    }
}
