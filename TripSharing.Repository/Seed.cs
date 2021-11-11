using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripSharing.Domain;

namespace TripSharing.Repository
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Trips.Any())
            {
                return;
            }

            var trips = new List<Trip>
            {
                new Trip()
                {
                    Date = DateTime.Now,
                    Status = true,
                },
                new Trip()
                {
                    Date = DateTime.Now.AddMonths(-2),
                    Status = false,
                },
                new Trip()
                {
                    Date = DateTime.Now,
                    Status = true,
                },
                new Trip()
                {
                    Date = DateTime.Now.AddMonths(-1),
                    Status = true,
                },
            };

            await context.Trips.AddRangeAsync(trips);
            await context.SaveChangesAsync();
        }
    }
}