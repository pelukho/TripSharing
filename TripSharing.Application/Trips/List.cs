using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class List
    {
        public class Query : IRequest<Result<List<TripDto>>>
        {
        }
        
        public class Handler : IRequestHandler<Query, Result<List<TripDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TripDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var trips = await _context.Trips
                    .ProjectTo<TripDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                
                return Result<List<TripDto>>.Success(trips);
            }
        }
    }
}