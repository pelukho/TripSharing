using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Application.Interfaces;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (trip == null)
                {
                    return null;
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return null;
                }

                var driverName = trip.Attendees.FirstOrDefault(x => x.IsDriver)?.AppUser?.UserName;

                var attendance = trip.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && driverName == user.UserName)
                {
                    trip.Status = !trip.Status;
                }

                if (attendance != null && driverName != user.UserName)
                {
                    trip.Attendees.Remove(attendance);
                }

                if (attendance == null)
                {
                    attendance = new TripAttendee
                    {
                        AppUser = user,
                        Trip = trip,
                        IsDriver = false,
                    };
                    
                    trip.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;
                
                return !result 
                    ? Result<Unit>.Failure("Failed to update attendance") 
                    : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}