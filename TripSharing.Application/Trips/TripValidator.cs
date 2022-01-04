using FluentValidation;
using TripSharing.Domain;

namespace TripSharing.Application.Trips
{
    public class TripValidator : AbstractValidator<Trip>
    {
        public TripValidator()
        {
            RuleFor(x => x.Status).NotEmpty();
        }
    }
}