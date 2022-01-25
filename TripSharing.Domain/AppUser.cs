using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TripSharing.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public ICollection<TripAttendee> Trips { get; set; }
    }
}