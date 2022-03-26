using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TripSharing.Application.Profiles;

namespace TripSharing.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]

        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query {UserName = username}));
        }
    }
}