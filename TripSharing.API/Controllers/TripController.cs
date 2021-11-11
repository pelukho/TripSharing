using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripSharing.Domain;
using TripSharing.Repository;

namespace TripSharing.Controllers
{
    public class TripController : BaseApiController
    {
        private readonly DataContext _context;

        public TripController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Trip>>> GetTrips()
        {
            return await _context.Trips.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(Guid id)
        {
            return await _context.Trips.FindAsync(id);
        }
    }
}