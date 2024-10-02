namespace permissionAPI.DTOs
{
    public class CompanyDto
    {
        public int company_id { get; set; }
        public string? company_name { get; set; }
        public string? company_address { get; set; }
        public string? company_email { get; set; }
        public string? company_phone { get; set; }
        public string? company_firstname { get; set; }
        public string? company_lastname { get; set; }
        
    }

    public class InputCompanyDto
    {
        public string? company_name { get; set; }
        public string? company_address { get; set; }
        public string? company_email { get; set; }
        public string? company_phone { get; set; }
        public string? company_firstname { get; set; }
        public string? company_lastname { get; set; }

    }

    public class Companyforupdate
    {
        public int company_id { get; set; }
        public string? company_name { get; set; }
        public string? company_address { get; set; }
        public string? company_email { get; set; }
        public string? company_phone { get; set; }
        public string? company_firstname { get; set; }
        public string? company_lastname { get; set; }
    }
}
