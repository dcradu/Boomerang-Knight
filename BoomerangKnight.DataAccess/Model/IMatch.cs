using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.DataAccess.Model
{
    public interface IMatch
    {
        int Id { get; set; }

        int MatchType { get; set; }

        int RedTeamKills { get; set; }

        int BlueTeamKills { get; set; }

        int WinnerId { get; set; }

        string WinnerTeam { get; set; }
    }
}
