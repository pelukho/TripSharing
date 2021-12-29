using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Org.BouncyCastle.Asn1.Ocsp;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Trip Trip { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips.FindAsync(request.Trip.Id);

                _mapper.Map(request.Trip, trip);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}