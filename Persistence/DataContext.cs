using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>   //DataContext extends DbContext class provided by Entity Framework Core
    {
        //below we are creating a constructor for the DataContext class and passing it a DbContextOptions object called "options"
        //we then pass the "options" to the base DbContext class using --> : base(options)
        public DataContext(DbContextOptions options) : base(options)   
        {

        }


        //The DbSet<entity> below basically represent our DB entites, we have a class for both Value and Activity in our Domain project
        //list of Values
        public DbSet<Value> Values { get; set; }

        //list of Activities
        public DbSet<Activity> Activities {get; set;}

        protected override void OnModelCreating(ModelBuilder builder){  //seeding data in DB using entity framework

            base.OnModelCreating(builder);  //not having this results in error

            builder.Entity<Value>().HasData(
                new Value {Id = 1, Name = "Value101"},
                new Value {Id = 2, Name = "Value102"},
                new Value {Id = 3, Name = "Value103"}
            ); //this will create a migration which will then try to insert the above values into our values table
        }

    }
}
