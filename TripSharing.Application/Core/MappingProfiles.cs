using System.Linq;
using AutoMapper;
using TripSharing.Application.Trips;
using TripSharing.Domain;

namespace TripSharing.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Trip, Trip>();
            CreateMap<Trip, TripDto>()
                .ForMember(
                    d => d.DriverName,
                    o => o.MapFrom(
                        s => s.Attendees.FirstOrDefault(
                            x => x.IsDriver
                            ).AppUser.UserName));
            CreateMap<TripAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName)
                )
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName)
                )
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}