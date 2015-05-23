using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace BoomerangKnight.Hubs
{
    public class GameHub : Hub
    {
        

        public void UpdateMovement(int playerId, float x, float y)
        {
            Clients.All.updatePlayer(playerId, x, y);
        }

        public override System.Threading.Tasks.Task OnConnected()
        {   
            Clients.All.addPlayer(Context.ConnectionId);
            return base.OnConnected();
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}