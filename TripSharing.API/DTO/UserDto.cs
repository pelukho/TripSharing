namespace TripSharing.DTO
{
    public class UserDto
    {
        public string DisplayName { get; set; }

        public string Token { get; set; }

        public string UserName { get; set; }
        
        public string Phone { get; set; }
        
        public bool HasCar { get; set; }

        public string Image { get; set; }
    }
}