using auth.Helpers;
using Microsoft.EntityFrameworkCore;
using permissionAPI;
using permissionAPI.src.Core.Interface;
using permissionAPI.src.Core.Service;
using permissionAPI.src.Infrastructure.Interface;
using permissionAPI.src.Infrastructure.Repositories;
using workshop2.src.Core.Interface;
using workshop2.src.Infrastructure.Interface;
using workshop2.src.Infrastructure.Repositories;
using workshop2.src.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Add services to the container.



//Test connect
builder.Services.AddScoped<Inumber1Repository,number1Repository>();
builder.Services.AddScoped<Inumber1Service,number1Service>();
//User
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUserService,UserService>();
//warehouse
builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
//company
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();

builder.Services.AddScoped<IRentalRepository, RentalRepository>();
builder.Services.AddScoped<IRentalService, RentalService>();


builder.Services.AddScoped<JwtService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(o =>
{
    o.AddDefaultPolicy(builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();