namespace workshop2.DTOs
{
    public class EmployeeDTO
    {
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
        public string? status { get; set; }
    }

    public class InputEmployeeDTO
    {
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
        public string? status { get; set; }
    }

    public class UpdateEmpDTO
    { 
        public int UserID { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }

    }
}
