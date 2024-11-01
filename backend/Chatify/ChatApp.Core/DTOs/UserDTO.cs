using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ChatApp.Core.DTOs
{
    public record class UserDTO
(
    [Required]
    string UserName,

    [Required]
    [PasswordPropertyText]
    string Password
);
}
