namespace BoomerangKnight.DataAccess.SqlServer
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model : DbContext
    {
        public Model()
            : base("name=Model")
        {
        }

        public virtual DbSet<MatchesPlayer> MatchesPlayers { get; set; }
        public virtual DbSet<MatchType> MatchTypes { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Match> Matches { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
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
                .Property(e => e.Hash)
                .IsUnicode(false);

            modelBuilder.Entity<Player>()
                .Property(e => e.Salt)
                .IsUnicode(false);

            modelBuilder.Entity<Match>()
                .Property(e => e.WinnerTeam)
                .IsUnicode(false);
        }
    }
}
