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

        public void UpdateLocation(float x, float y, float boomerangX, float boomerangY)
        {
            var player = _players.Find(p => p.ConnectionId == Context.ConnectionId);

            player.X = x;
            player.Y = y;

            player.BoomerangX = boomerangX;
            player.BoomerangY = boomerangY;

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
            Clients.AllExcept(new[] { Context.ConnectionId }).updatePlayers(_players);
        }

        public void BoomerangHit(string hitPlayerConnectionId)
        {
            var player = _players.First(x => x.ConnectionId == hitPlayerConnectionId);
            
            if(player.Health > 25) 
            {
                player.Health -= 25;
            }
            else
            {
                _players.Remove(player);
                _players.Add(new Player(player.ConnectionId, player.Username)
                            {
                                Deaths = player.Deaths + 1,
                                Kills = player.Kills
                            });
                Clients.Client(hitPlayerConnectionId).reset();

                _players.First(x => x.ConnectionId == Context.ConnectionId).Kills++;
            }

            UpdatePlayersOnClient();
        }
    }
}