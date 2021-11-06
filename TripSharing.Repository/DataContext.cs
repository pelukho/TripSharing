using Microsoft.EntityFrameworkCore;
using TripSharing.Domain;

namespace TripSharing.Repository
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Trip> Trips { get; set; }
    }
}