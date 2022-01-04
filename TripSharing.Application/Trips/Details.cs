using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TripSharing.Application.Core;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Details
    {
        public class Query : IRequest<Result<Trip>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Trip>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Trip>> Handle(Query request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips.FindAsync(request.Id);

                return Result<Trip>.Success(trip);
            }
        }
    }
}