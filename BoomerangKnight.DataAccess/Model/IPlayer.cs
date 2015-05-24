using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.DataAccess.Model
{
    public interface IPlayer
    {
        string Username { get; set; } 	
        string Hash { get; set; }
        string Salt { get; set; } 		
        int AllTimeKills { get; set; }
        int AllTimeDeaths { get; set; }
        int MatchesPlayed { get; set; }
        int MatchesLost { get; set; }
    }
}