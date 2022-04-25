using System;
using System.Collections.Generic;

namespace TripSharing.Domain
{
    public class Trip
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }
        
        public bool Status { get; set; }
        
        public ICollection<TripAttendee> Attendees { get; set; } = new List<TripAttendee>();
        
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}