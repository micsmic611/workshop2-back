using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("ROLE")]
    public class RoleDbo
    {
        [Key]
        [Required]
        [Column("RoleId", TypeName = "int")]
        public int RoleId { get; set; }

        [Column("RoleName", TypeName = "nvarchar(255)")]
        public string RoleName { get; set; }
    }
}
