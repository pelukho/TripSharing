using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TripSharing.Application.Core;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips.FindAsync(request.Id);

                if (trip == null)
                {
                    return null;
                }

                _context.Remove(trip);

                var result = await _context.SaveChangesAsync() > 0;

                return !result 
                    ? Result<Unit>.Failure("Failed to delete the trip") 
                    : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}