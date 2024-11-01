using ChatApp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Core.Interfaces
{
    public interface IUserServices
    {
        Task<string> RegisterUserAsync(string username, string password);
        Task<string> LoginUserAsync(string username, string password);
        Task<User> GetUserDetailAsync(string username);
    }
}
