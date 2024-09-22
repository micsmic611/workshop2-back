using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
//connect database && go to datacontext 
namespace permissionAPI.src.Entities
{
    [Table("user")]
    public class UserDbo
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("user_id", TypeName = "int")]
        public int UserID { get; set; }

        [Column("user_name", TypeName = "varchar(255)")]
        public string? Username { get; set; }

        [Column("user_password", TypeName = "varchar(255)")]
        public string? Password { get; set; }
        
        [Column("user_lastname", TypeName = "varchar(255)")]
        public string? Lastname { get; set; }

        [Column("user_email", TypeName = "varchar(255)")]
        public string? email { get; set; }

        [Column("user_phone", TypeName = "varchar(20)")]
        public string? phone { get; set; }

        [Column("user_address", TypeName = "varchar(255)")]
        public string? address { get; set; }

        [Column("role_id", TypeName = "int")]
        public int? RoleId { get; set; }

        [Column("user_status", TypeName = "varchar(50)")]
        public string? status { get; set; }       
    }
}
