using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using New_Crud.DbContxt;
using New_Crud.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



namespace New_Crud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _context;
        private readonly IConfiguration _config;

        public UserController(UserDbContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Users userDto)
        {
            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (existingUser != null)
                return BadRequest(new { message = "User already exists" });

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            var user = new Users
            {
                Email = userDto.Email,
                Password = hashedPassword
            };

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Users loginUser)
        {
            if (string.IsNullOrEmpty(loginUser.Email) || string.IsNullOrEmpty(loginUser.Password))
                return BadRequest("Invalid credentials");

            // 1. Check DB for correct email & password
            var user = _context.User.FirstOrDefault(u => u.Email == loginUser.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
                return Unauthorized("Wrong email or password");

            // 2. If found → Generate token
            var token = GenerateJwtToken(user);

            // 3. Return token to frontend
            return Ok(new { token });
        }

        private string GenerateJwtToken(Users user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim("UserId", user.Id.ToString())
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }






    }
}
