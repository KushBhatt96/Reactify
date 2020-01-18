using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }


        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){  //seeding data in DB using entity framework
            builder.Entity<Value>().HasData(
                new Value {Id = 1, Name = "Value101"},
                new Value {Id = 2, Name = "Value102"},
                new Value {Id = 3, Name = "Value103"}
            ); //this will create a migration which will then try to insert the above values into our values table
        }

    }
}
