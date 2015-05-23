using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace BoomerangKnight.Hubs
{
    public class LobbyHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}