using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TripSharing.Repository;

namespace TripSharing.Infrastructure.Security
{
    public class IsDriverRequirement : IAuthorizationRequirement
    {
        
    }
    
    public class IsDriverRequirementHandler : AuthorizationHandler<IsDriverRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsDriverRequirementHandler(DataContext DbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = DbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsDriverRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Task.CompletedTask;
            }

            var tripId = Guid.Parse(_httpContextAccessor
                .HttpContext?
                .Request
                .RouteValues
                .SingleOrDefault(x => x.Key == "id")
                .Value?
                .ToString());

            var attendee = _dbContext
                .TripAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.TripId == tripId)
                .Result;

            if (attendee == null)
            {
                return Task.CompletedTask;
            }

            if (attendee.IsDriver)
            {
                context.Succeed(requirement);
            }
            
            return Task.CompletedTask;
        }
    }
}