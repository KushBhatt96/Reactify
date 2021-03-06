using System;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build(); //here we are building the web host for our application
            
            using (var scope = host.Services.CreateScope()){
                var Services = scope.ServiceProvider;
                try{
                    var context = Services.GetRequiredService<DataContext>();
                    var userManager = Services.GetRequiredService<UserManager<AppUser>>();
                    context.Database.Migrate(); //anytime we start the app, we'll check if DB exists, if not one will be created
                    Seed.SeedData(context, userManager).Wait();
                    //based on our migrations
                }
                catch(Exception ex){
                    var logger = Services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }
            //run the web server and start listening for HTTP requests
            host.Run(); //creates DB based on migration, should see new DB file called reactivities.db --> created in API project
        }

        //the static method CreateDefaultBuilder of the Host class does the following: sets up web server, loading configuation, logging
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)   
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
