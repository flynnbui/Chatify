using ChatApp.Core.DTOs;
using ChatApp.Core.Interfaces;
using ChatApp.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public authController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var token = await _userServices.LoginUserAsync(userDTO.UserName, userDTO.Password).ConfigureAwait(false);
                return Ok(token);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }


        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var token = await _userServices.RegisterUserAsync(userDTO.UserName, userDTO.Password).ConfigureAwait(false);
                return Ok(token);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }

        }
    }
}
