using System;

namespace TripSharing.Domain
{
    public class Trip
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public bool Status { get; set; }
    }
}