using System;
using System.Collections.Generic;
using TripSharing.Application.Profiles;

namespace TripSharing.Application.Trips
{
    public class TripDto
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }
        
        public bool Status { get; set; }

        public string DriverName { get; set; }

        public ICollection<AttendeeDto> Attendees { get; set; }
    }
}