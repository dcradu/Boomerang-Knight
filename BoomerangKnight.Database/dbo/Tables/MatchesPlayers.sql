CREATE TABLE [dbo].[MatchesPlayers] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [MatchId]  INT          NOT NULL,
    [PlayerId] INT          NOT NULL,
    [Team]     VARCHAR (20) NULL,
    [Kills]    INT          CONSTRAINT [DF_MatchesPlayers_Kills] DEFAULT ((0)) NOT NULL,
    [Deaths]   INT          CONSTRAINT [DF_MatchesPlayers_Deaths] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_MatchesPlayers_1] PRIMARY KEY CLUSTERED ([Id] ASC)
);

