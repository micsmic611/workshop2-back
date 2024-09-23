using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("role")]
    public class RoleDbo
    {
        [Key]
        [Required]
        [Column("role_id", TypeName = "int")]
        public int RoleId { get; set; }

        [Column("role_name", TypeName = "nvarchar(255)")]
        public string RoleName { get; set; }
    }
}
