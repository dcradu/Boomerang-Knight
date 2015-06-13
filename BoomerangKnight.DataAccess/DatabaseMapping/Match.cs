namespace BoomerangKnight.DataAccess.DatabaseMapping
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Match
    {
        public int Id { get; set; }

        public int MatchType { get; set; }

        public int? RedTeamKills { get; set; }

        public int? BlueTeamKills { get; set; }

        public int? WinnerId { get; set; }

        [StringLength(10)]
        public string WinnerTeam { get; set; }
    }
}
