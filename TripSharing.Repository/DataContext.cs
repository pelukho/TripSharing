using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TripSharing.Domain;

namespace TripSharing.Repository
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Trip> Trips { get; set; }

        public DbSet<TripAttendee> TripAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TripAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.TripId}));

            builder.Entity<TripAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(t => t.Trips)
                .HasForeignKey(aa => aa.AppUserId);
            
            builder.Entity<TripAttendee>()
                .HasOne(u => u.Trip)
                .WithMany(t => t.Attendees)
                .HasForeignKey(aa => aa.TripId);
        }
    }
}