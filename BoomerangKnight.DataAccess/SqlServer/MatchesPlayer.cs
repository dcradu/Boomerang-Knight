namespace BoomerangKnight.DataAccess.SqlServer
{
    using BoomerangKnight.DataAccess.Model;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MatchesPlayer : IMatchesPlayers
    {
        [Key]
        public int MatchId { get; set; }

        public int PlayerId { get; set; }

        [StringLength(20)]
        public string Team { get; set; }
    }
}
