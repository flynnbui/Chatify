namespace ChatApp.API.Hubs;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    // Store a mapping of user IDs to connection IDs
    private static Dictionary<string, string> UserConnections = new Dictionary<string, string>();

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public void RegisterUser(string userId)
    {
        // Add or update the user's connection ID
        UserConnections[userId] = Context.ConnectionId;
    }

    public async Task SendMessageToUser(MessageData messageData)
    {
        if (UserConnections.TryGetValue(messageData.recipientId, out string connectionId))
        {
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageData);
        }
    }
}

public class MessageData
{
    public string senderId { get; set; }
    public string recipientId { get; set; }
    public string message { get; set; }
}