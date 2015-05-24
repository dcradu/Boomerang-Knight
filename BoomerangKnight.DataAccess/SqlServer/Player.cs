namespace BoomerangKnight.DataAccess.SqlServer
{
    using BoomerangKnight.DataAccess.Model;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Player : IPlayer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Username { get; set; }

        [Required]
        [StringLength(200)]
        public string Hash { get; set; }

        [Required]
        [StringLength(200)]
        public string Salt { get; set; }

        public int AllTimeKills { get; set; }

        public int AllTimeDeaths { get; set; }

        public int MatchesPlayed { get; set; }

        public int MatchesLost { get; set; }
    }
}
