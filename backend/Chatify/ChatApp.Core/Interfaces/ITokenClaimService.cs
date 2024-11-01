using ChatApp.Core.Models;

namespace ChatApp.Core.Interfaces
{
    public interface ITokenClaimService
    {
        Task<string> GenerateJwtToken(string username);
    }
}
