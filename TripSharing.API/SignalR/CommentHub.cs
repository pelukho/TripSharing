using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using TripSharing.Application.Comments;

namespace TripSharing.SignalR;

public class CommentHub : Hub
{
    private readonly IMediator _mediator;

    public CommentHub(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task SendComment(Create.Command command)
    {
        var comment = await _mediator.Send(command);

        await Clients.Group(command.TripId.ToString()).SendAsync("ReceiveComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var tripId = httpContext.Request.Query["tripId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, tripId);

        var result = await _mediator.Send(new List.Query {TripId = Guid.Parse(tripId)});
        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}