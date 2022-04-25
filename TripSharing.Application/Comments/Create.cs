using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TripSharing.Application.Core;
using TripSharing.Application.Interfaces;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Application.Comments;

public class Create
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public string Content { get; set; }

        public Guid TripId { get; set; }
    }
    
    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Content).NotEmpty();
        }
    }
    
    public class Handler : IRequestHandler<Command, Result<CommentDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }
        
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trips.FindAsync(request.TripId);

            if (trip == null)
            {
                return null;
            }

            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var comment = new Comment
            {
                Author = user,
                Content = request.Content,
                Trip = trip
            };
            
            trip.Comments.Add(comment);

            var success = await _context.SaveChangesAsync() > 0;

            return success 
                ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment)) 
                : Result<CommentDto>.Failure("Failed to create comment!");
        }
    }
}