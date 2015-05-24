namespace BoomerangKnight.DataAccess.SqlServer
{
    using BoomerangKnight.DataAccess.Model;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MatchType : IMatchType
    {
        public int Id { get; set; }

        [Column("MatchType")]
        [Required]
        [StringLength(20)]
        public string MatchType1 { get; set; }
    }
}
