using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TripSharing.Application.Trips;
using TripSharing.Domain;

namespace TripSharing.Controllers
{
    public class TripController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Trip>>> GetTrips()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
            return Ok(await Mediator.Send(new Create.Command {Trip = trip}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTrip(Guid id, Trip trip)
        {
            trip.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {Trip = trip}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}