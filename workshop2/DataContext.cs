using Microsoft.EntityFrameworkCore;



using permissionAPI.src.Entities;

namespace permissionAPI
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        // Add configuration for other entities here
        
        public DbSet<RoleDbo> Role { get; set; }

        public DbSet<number1Dbo> cim { get; set; }

        public DbSet<UserDbo> User { get; set; }
        
        public DbSet<WarehouseDbo> warehouse { get; set; }
        public DbSet<RentalDbo> Rental { get; set; }

        public DbSet<CompanyDbo> Company { get; set; }
        public DbSet<cancelrentalDbo> cancelrental { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Define configuration for number1Dbo if necessary
            modelBuilder.Entity<number1Dbo>().ToTable("number1");
        }
    }
}