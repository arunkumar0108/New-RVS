using Microsoft.EntityFrameworkCore;
using New_Crud.Models;

namespace New_Crud.DbContxt
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options): base(options) { }

        public DbSet<Users> User { get; set; }
        
    }
}
