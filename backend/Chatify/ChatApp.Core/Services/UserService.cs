using ChatApp.Core.Interfaces;
using ChatApp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Core.Services
{
    public class UserService : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenClaimService _tokenClaimsService;
        public UserService(IUserRepository userRepository, ITokenClaimService tokenClaimsService)
        {
            _userRepository = userRepository;
            _tokenClaimsService = tokenClaimsService;
        }

        public async Task<User> GetUserDetailAsync(string username)
        {
            var result = await _userRepository.GetUserAsync(username);
            if(result == null)
            {
                throw new InvalidOperationException("User not found");
            }
            return result;
        }

        public async Task<string> LoginUserAsync(string username, string password)
        {
            var (result, errorMessage) = await _userRepository.LoginAsync(username, password).ConfigureAwait(false);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(errorMessage);
            }
            return await _tokenClaimsService.GenerateJwtToken(username).ConfigureAwait(false);
        }



        public async Task<string> RegisterUserAsync(string username, string password)
        {
            var result = await _userRepository.CreateUserAsync(username, password);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"User registration failed: {errors}");
            }

            return await _tokenClaimsService.GenerateJwtToken(username).ConfigureAwait(false);
        }

    }
}
