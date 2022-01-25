using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Application.Interfaces;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Trip Trip { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Trip).SetValidator(new TripValidator());
            }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUsername());
                
                // @todo if user is driver, he could create trip
                var attendee = new TripAttendee
                {
                    AppUser = user,
                    Trip = request.Trip,
                    IsDriver = true
                };
                
                request.Trip.Attendees.Add(attendee);
                
                _context.Trips.Add(request.Trip);

                var result = await _context.SaveChangesAsync() > 0;

                return !result 
                    ? Result<Unit>.Failure("Failed to create trip") 
                    : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}