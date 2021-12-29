using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Details
    {
        public class Query : IRequest<Trip>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Trip>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Trip> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Trips.FindAsync(request.Id);
            }
        }
    }
}