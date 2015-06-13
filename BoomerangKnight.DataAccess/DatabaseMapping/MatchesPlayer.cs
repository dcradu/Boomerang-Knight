namespace BoomerangKnight.DataAccess.DatabaseMapping
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MatchesPlayer
    {
        public int Id { get; set; }

        public int MatchId { get; set; }

        public int PlayerId { get; set; }

        [StringLength(20)]
        public string Team { get; set; }

        public int Kills { get; set; }

        public int Deaths { get; set; }
    }
}
