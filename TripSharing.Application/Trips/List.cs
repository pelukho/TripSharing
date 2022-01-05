using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class List
    {
        public class Query : IRequest<Result<List<Trip>>>
        {
        }
        
        public class Handler : IRequestHandler<Query, Result<List<Trip>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Trip>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Trip>>.Success(await _context.Trips.ToListAsync(cancellationToken));
            }
        }
    }
}