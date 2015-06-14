using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BoomerangKnight.Models
{
    public class Player
    {
        public Player(string connectionId, string username)
        {
            this.ConnectionId = connectionId;
            this.Username = username;
            this.Kills = 0;
            this.Deaths = 0;
            this.Health = 100;
        }

        public string ConnectionId { get; set; }

        public string Username { get; set; }
        
        public bool IsAlive { get; set; }

        public int Kills { get; set; }

        public int Deaths { get; set; }

        public float X { get; set; }
               
        public float Y { get; set; }

        public int Health { get; set; }

        public float BoomerangX { get; set; }

        public float BoomerangY { get; set; }

        public PlayerLevel PlayerLevel
        {
            get
            {
                PlayerLevel playerLevel = Models.PlayerLevel.Knight;

                if (Kills < 10) playerLevel = Models.PlayerLevel.Tool;
                else if (Kills < 25) playerLevel = Models.PlayerLevel.Poser;
                else if (Kills < 50) playerLevel = Models.PlayerLevel.Hustler;

                return playerLevel;                
            }
        }
    }
}