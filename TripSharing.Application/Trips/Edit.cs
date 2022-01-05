using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Org.BouncyCastle.Asn1.Ocsp;
using TripSharing.Application.Core;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Trips
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips.FindAsync(request.Trip.Id);

                if (trip == null)
                {
                    return null;
                }

                _mapper.Map(request.Trip, trip);

                var result = await _context.SaveChangesAsync() > 0;

                return !result 
                    ? Result<Unit>.Failure("Failed to update the trip") 
                    : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}