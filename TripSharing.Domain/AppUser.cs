using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TripSharing.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }
        
        public string Phone { get; set; }
        
        public bool HasCar { get; set; }

        public ICollection<TripAttendee> Trips { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}