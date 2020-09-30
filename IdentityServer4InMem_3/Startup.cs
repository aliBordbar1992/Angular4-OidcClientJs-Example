using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer4InMem_3
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.Map("/api", api =>
            {
                api.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
                api.UseAuthentication();

                api.Run(async context =>
                {
                    var result = await context.AuthenticateAsync("api");
                    if (!result.Succeeded)
                    {
                        context.Response.StatusCode = 401;
                        return;
                    }

                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject("API Response!"));
                });
            });
            app.UseEndpoints(endpoint =>
            {
                endpoint.MapDefaultControllerRoute();
            });

            app.UseIdentityServer();

            app.UseStaticFiles();
        }
    }
}
