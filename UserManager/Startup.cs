using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using AutoMapper;
using UserManager.DTO;
using UserManager.Core.Mappers;
using System.IdentityModel.Tokens.Jwt;

[assembly: OwinStartup(typeof(UserManager.Startup))]

namespace UserManager
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            MappingProfile.InitializeMappings();
        }
    }
}
