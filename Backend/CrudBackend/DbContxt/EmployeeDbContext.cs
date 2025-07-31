using Microsoft.EntityFrameworkCore;
using New_Crud.Models;


namespace New_Crud.DbContxt
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
        
        }

        public DbSet<Employee> RVSWorkers { get; set; }

        public DbSet<Users> Users { get; set; }

    }
}
