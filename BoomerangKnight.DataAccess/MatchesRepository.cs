using BoomerangKnight.DataAccess.DatabaseMapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.DataAccess
{
    public class MatchesRepository
    {
        public int InsertMatch(DatabaseMapping.Match match)
        {
            using(var context = new BoomerangKnightContext())
            {
                context.Matches.Add(match);
                context.SaveChanges();

                return match.Id;
            }
        }

        public void InsertMatchPlayer(MatchesPlayer matchPlayer)
        {
            using (var context = new BoomerangKnightContext())
            {
                context.MatchesPlayers.Add(matchPlayer);
                context.SaveChanges();
            }
        }
    }
}
