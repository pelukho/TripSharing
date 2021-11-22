using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Create
    {
        public class Command : IRequest
        {
            public Trip Trip { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Trips.Add(request.Trip);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}