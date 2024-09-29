namespace permissionAPI.DTOs
    //collect data &&next step repo
{
    public class UserDbo
    { 
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
        public string? status { get; set; }       

    }
    public class InputUSerDbo
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
        public string? status { get; set; }      
    }
    public class LoginDto
    {
        public string? email { set; get; }
        public string? Password { set; get; }
    }
    public class RegisterDto
    {
        public string Username { set; get; }
        public string email { set; get; }
        public string Password { set; get; }
    }
}
