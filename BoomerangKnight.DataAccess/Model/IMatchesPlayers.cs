using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.DataAccess.Model
{
    interface IMatchesPlayers
    {
        int MatchId { get; set; }

        int PlayerId { get; set; }

        string Team { get; set; }
    }
}
