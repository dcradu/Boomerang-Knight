using BoomerangKnight.DataAccess;
using BoomerangKnight.DataAccess.DatabaseMapping;
using models = BoomerangKnight.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.BusinessLogic.DataHandling
{
    public class MatchesManager
    {
        private MatchesRepository _matchesRepository = new MatchesRepository();
        private UsersRepository _usersRepository = new UsersRepository();

        public void InsertMatchDetails(List<models.Player> players)
        {
            var match = new Match();
            match.WinnerId = _usersRepository.GetIdByUsername(players.First(x => x.Kills == 30).Username);
            match.MatchType = (int)models.MatchType.Deathmatch;

            var matchId = _matchesRepository.InsertMatch(match);
            foreach(var player in players)
            {
                var matchPlayer = new MatchesPlayer();
                matchPlayer.Deaths = player.Deaths;
                matchPlayer.Kills = player.Kills;
                matchPlayer.MatchId = matchId;
                matchPlayer.PlayerId = _usersRepository.GetIdByUsername(player.Username);

                _matchesRepository.InsertMatchPlayer(matchPlayer);
            }
            
        }
    }
}
