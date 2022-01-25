using System;

namespace TripSharing.Domain
{
    public class TripAttendee
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid TripId { get; set; }

        public Trip Trip { get; set; }

        public bool IsDriver { get; set; }
    }
}