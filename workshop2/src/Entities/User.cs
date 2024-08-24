using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("User")]
    public class UserDbo
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("UserID", TypeName = "int")]
        public int UserID { get; set; }

        [Column("Username", TypeName = "nvarchar(255)")]
        public string? Username { get; set; }

        [Column("Password", TypeName = "nvarchar(255)")]
        public string? Password { get; set; }
        
        [Column("RoleID", TypeName = "nvarchar(255)")]
        public string? RoleID { get; set; }
    }
}
