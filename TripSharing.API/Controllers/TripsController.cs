using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TripSharing.Application.Trips;
using TripSharing.Domain;

namespace TripSharing.Controllers
{
    public class TripsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTrips()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrip(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Trip = trip}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTrip(Guid id, Trip trip)
        {
            trip.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Trip = trip}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}