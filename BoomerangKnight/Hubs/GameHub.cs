using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using BoomerangKnight.Models;
using System.Threading.Tasks;
using BoomerangKnight.BusinessLogic.DataHandling;
using System.Threading;
using BoomerangKnight.BusinessLogic.Models;

namespace BoomerangKnight.Hubs
{
    public class GameHub : Hub
    {
        public GameHub()
            : this(Broadcaster.Instance)
        { }

        public GameHub(Broadcaster broadcaster)
        {
            _broadcaster = broadcaster;
        }

        private static List<Player> _players = new List<Player>();
        private Broadcaster _broadcaster;

        public void UpdateLocation(float x, float y, float boomerangX, float boomerangY)
        {
            var player = _players.Find(p => p.ConnectionId == Context.ConnectionId);

            player.X = x;
            player.Y = y;

            player.BoomerangX = boomerangX;
            player.BoomerangY = boomerangY;

            _broadcaster.UpdatePlayersOnClient(_players);
        }
  
        public override Task OnConnected()
        {
            var newPlayer = new Player(Context.ConnectionId, "NewPlayer");
            _players.Add(newPlayer);
            _broadcaster.UpdatePlayersOnClient(_players);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if(_players.Count(x => x.ConnectionId == Context.ConnectionId) > 0)
            {
                _players.Remove(_players.First(x => x.ConnectionId == Context.ConnectionId));
            }
            _broadcaster.UpdatePlayersOnClient(_players);

            return base.OnDisconnected(stopCalled);
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
                player.Deaths = player.Deaths++;

                _players.First(x => x.ConnectionId == Context.ConnectionId).Kills++;

                if (_players.First(x => x.ConnectionId == Context.ConnectionId).Kills == 30)
                {
                    GameEnded();
                }
                else
                {
                    player.Health = 100;
                    Clients.Client(hitPlayerConnectionId).reset();
                }
            }

            _broadcaster.UpdatePlayersOnClient(_players);
        }

        private void GameEnded()
        {
            var matchesManager = new MatchesManager();

            matchesManager.InsertMatchDetails(_players);

            _players.ForEach(x => x.ResetStats());
            Clients.All.reset();
        }

        public void ReceiveEmailFromNewPlayer(string email)
        {
            var usersManager = new UsersManager();

            _players.First(x => x.ConnectionId.Equals(Context.ConnectionId)).Username = usersManager.GetUsernameByEmail(email);

            _broadcaster.UpdatePlayersOnClient(_players);
        }
    }

    // Source : http://www.asp.net/signalr/overview/getting-started/tutorial-high-frequency-realtime-with-signalr#serverloop
    public class Broadcaster
    {
        private readonly static Lazy<Broadcaster> _instance = new Lazy<Broadcaster>(() => new Broadcaster());
        
        private readonly TimeSpan BroadcastInterval = TimeSpan.FromMilliseconds(40);
        private readonly IHubContext _hubContext;
        private Timer _broadcastLoop;
        public Broadcaster()
        {
            // Save our hub context so we can easily use it 
            // to send to its connected clients
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            
            // Start the broadcast loop
            _broadcastLoop = new Timer(
                UpdatePlayersOnClient,
                null,
                BroadcastInterval,
                BroadcastInterval);
        }
     
        public void UpdatePlayersOnClient(object _players)
        {
            _hubContext.Clients.All.updatePlayers(_players);
        }

        public static Broadcaster Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}