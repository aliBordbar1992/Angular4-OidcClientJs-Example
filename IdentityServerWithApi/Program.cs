﻿using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace IdentityServer4InMem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseKestrel();
                    webBuilder.UseContentRoot(Directory.GetCurrentDirectory());
                    webBuilder.UseUrls("http://localhost:5555");
                    webBuilder.UseStartup<Startup>();
                });
    }
}
