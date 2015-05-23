﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BoomerangKnight.Startup))]
namespace BoomerangKnight
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR();
        }
    }
}
