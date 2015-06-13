using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using BoomerangKnight.Models;
using System.Threading.Tasks;

namespace BoomerangKnight.Hubs
{
    public class GameHub : Hub
    {
        private static List<Player> _players = new List<Player>();

        public void UpdateLocation(float x, float y)
        {
            var player = _players.Find(p => p.ConnectionId == Context.ConnectionId);

            player.X = x;
            player.Y = y;

            UpdatePlayersOnClient();
        }

        public override Task OnConnected()
        {
            var newPlayer = new Player(Context.ConnectionId, "NewPlayer");
            _players.Add(newPlayer);
            UpdatePlayersOnClient();

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if(_players.Count(x => x.ConnectionId == Context.ConnectionId) > 0)
            {
                _players.Remove(_players.First(x => x.ConnectionId == Context.ConnectionId));
            }
            UpdatePlayersOnClient();

            return base.OnDisconnected(stopCalled);
        }

        private void UpdatePlayersOnClient()
        {
            Clients.AllExcept(new string[] { Context.ConnectionId }).updatePlayers(_players);
        }
    }
}