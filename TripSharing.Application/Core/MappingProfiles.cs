using AutoMapper;
using TripSharing.Domain;

namespace TripSharing.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Trip, Trip>();
        }
    }
}