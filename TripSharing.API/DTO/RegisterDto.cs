using System.ComponentModel.DataAnnotations;

namespace TripSharing.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [RegularExpression("((^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$)?(^(?=.*\\d)(?=.*[a-z])(?=.*[@#$%^&+=]).*$)?(^(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?(^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?).{8,}", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Phone { get; set; }
    }
}