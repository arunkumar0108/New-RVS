using System.ComponentModel.DataAnnotations;

namespace New_Crud.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
