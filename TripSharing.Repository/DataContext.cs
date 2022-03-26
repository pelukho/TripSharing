using Microsoft.AspNetCore.Identity;
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
        public DbSet<Photo> Photos { get; set; }

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
            
            builder.Entity<AppUser>(entity => entity.Property(m => m.NormalizedEmail).HasMaxLength(200));
            builder.Entity<AppUser>(entity => entity.Property(m => m.Id).HasMaxLength(200));
            builder.Entity<AppUser>(entity => entity.Property(m => m.NormalizedUserName).HasMaxLength(200));
            
            builder.Entity<Photo>(entity => entity.Property(m => m.Id).HasMaxLength(200));
            
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.NormalizedName).HasMaxLength(200));
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.Id).HasMaxLength(200));

            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.UserId).HasMaxLength(200));
            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.LoginProvider).HasMaxLength(200));
            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.ProviderKey).HasMaxLength(200));
            
            builder.Entity<IdentityUserRole<string>>(entity => entity.Property(m => m.UserId).HasMaxLength(200));
            builder.Entity<IdentityUserRole<string>>(entity => entity.Property(m => m.RoleId).HasMaxLength(200));

            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.UserId).HasMaxLength(200));
            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.LoginProvider).HasMaxLength(200));
            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.Name).HasMaxLength(200));

            builder.Entity<IdentityUserClaim<string>>(entity => entity.Property(m => m.UserId).HasMaxLength(200));
            builder.Entity<IdentityRoleClaim<string>>(entity => entity.Property(m => m.RoleId).HasMaxLength(200)); 
        }
    }
}