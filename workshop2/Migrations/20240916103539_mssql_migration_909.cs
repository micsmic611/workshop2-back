using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace workshop2.Migrations
{
    /// <inheritdoc />
    public partial class mssql_migration_909 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "custom_schema");

            migrationBuilder.CreateTable(
                name: "number1",
                columns: table => new
                {
                    CimID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cim = table.Column<string>(type: "nvarchar(255)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_number1", x => x.CimID);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role_name = table.Column<string>(type: "nvarchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "custom_schema",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_name = table.Column<string>(type: "varchar(255)", nullable: true),
                    user_password = table.Column<string>(type: "varchar(255)", nullable: true),
                    user_lastname = table.Column<string>(type: "varchar(255)", nullable: true),
                    user_email = table.Column<string>(type: "varchar(255)", nullable: true),
                    user_phone = table.Column<string>(type: "varchar(20)", nullable: true),
                    user_address = table.Column<string>(type: "varchar(255)", nullable: true),
                    role_id = table.Column<int>(type: "int", nullable: true),
                    user_status = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.user_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "number1");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "User",
                schema: "custom_schema");
        }
    }
}
