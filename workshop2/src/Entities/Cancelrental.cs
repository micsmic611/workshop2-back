using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace permissionAPI.src.Entities
{
    [Table("cancel_rental")]
    public class cancelrentalDbo
    {
        [Key]
        [Required]
        [Column("cancel_id", TypeName = "int")]
        public int cancel_id { get; set; }
        [Column("company_id", TypeName = "int")]
        public int company_id { get; set; }
        [Column("user_id", TypeName = "int")]
        public int user_id { get; set; }

        [Column("date_cancel_rental", TypeName = "datetime")]
        public DateTime? date_cancel_rental { get; set; }
        [Column("description", TypeName = "varchar(250")]
        public string? description { get; set; }
        [Column("warehouse_id", TypeName = "int")]
        public int warehouse_id { get; set; }
    }
}
