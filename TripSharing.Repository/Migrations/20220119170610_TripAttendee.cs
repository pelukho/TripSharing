using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripSharing.Repository.Migrations
{
    public partial class TripAttendee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TripAttendees",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "varchar(767)", nullable: false),
                    TripId = table.Column<byte[]>(type: "varbinary(16)", nullable: false),
                    IsDriver = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripAttendees", x => new { x.AppUserId, x.TripId });
                    table.ForeignKey(
                        name: "FK_TripAttendees_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripAttendees_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripAttendees_TripId",
                table: "TripAttendees",
                column: "TripId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TripAttendees");
        }
    }
}
