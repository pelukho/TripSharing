using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TripSharing.Domain;

namespace TripSharing.Repository
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Sergey",
                        UserName = "Sergey",
                        Email = "sergey@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Denis",
                        UserName = "Denis",
                        Email = "den@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Nikita",
                        UserName = "Nikita",
                        Email = "nik@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$word1");
                }
            }

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