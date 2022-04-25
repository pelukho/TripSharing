using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Application.Interfaces;
using TripSharing.Repository;

namespace TripSharing.Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return null;
                }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    return null;
                }

                var currentPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

                if (currentPhoto != null)
                {
                    currentPhoto.IsMain = false;
                }

                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                return success 
                    ? Result<Unit>.Success(Unit.Value) 
                    : Result<Unit>.Failure("Problem with setting main photo");
            }
        }
    }
}