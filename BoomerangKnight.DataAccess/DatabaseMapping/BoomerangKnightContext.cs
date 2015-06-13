namespace BoomerangKnight.DataAccess.DatabaseMapping
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class BoomerangKnightContext : DbContext
    {
        public BoomerangKnightContext()
            : base("name=BoomerangKnightContext")
        {
        }

        public virtual DbSet<Match> Matches { get; set; }
        public virtual DbSet<MatchesPlayer> MatchesPlayers { get; set; }
        public virtual DbSet<MatchType> MatchTypes { get; set; }
        public virtual DbSet<Player> Players { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>()
                .Property(e => e.WinnerTeam)
                .IsUnicode(false);

            modelBuilder.Entity<MatchesPlayer>()
                .Property(e => e.Team)
                .IsUnicode(false);

            modelBuilder.Entity<MatchType>()
                .Property(e => e.MatchType1)
                .IsUnicode(false);

            modelBuilder.Entity<Player>()
                .Property(e => e.Username)
                .IsUnicode(false);

            modelBuilder.Entity<Player>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Player>()
                .Property(e => e.Email)
                .IsUnicode(false);
        }
    }
}
