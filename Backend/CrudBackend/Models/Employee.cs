using System.ComponentModel.DataAnnotations;

namespace New_Crud.Models
{
    public class Employee

    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(5)]
        public string EmployeeId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Designation { get; set; }

        public string Salary { get; set; }

        public string Experience { get; set; }
    }
}
