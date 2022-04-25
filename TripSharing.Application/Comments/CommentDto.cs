using System;

namespace TripSharing.Application.Comments;

public class CommentDto
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Content { get; set; }

    public string Username { get; set; }

    public string DisplayName { get; set; }

    public string Photo { get; set; }
}