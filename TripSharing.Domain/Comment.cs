using System;

namespace TripSharing.Domain;

public class Comment
{
    public int Id { get; set; }
    
    public string Content { get; set; }

    public AppUser Author { get; set; }

    public Trip Trip { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}