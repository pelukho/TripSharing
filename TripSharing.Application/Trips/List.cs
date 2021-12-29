using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class List
    {
        public class Query : IRequest<List<Trip>>
        {
        }
        
        public class Handler : IRequestHandler<Query, List<Trip>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Trip>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Trips.ToListAsync();
            }
        }
    }
}