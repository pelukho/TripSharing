using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using TripSharing.Application.Core;
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

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Trips.Add(request.Trip);

                var result = await _context.SaveChangesAsync() > 0;

                return !result 
                    ? Result<Unit>.Failure("Failed to create trip") 
                    : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}