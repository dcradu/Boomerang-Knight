CREATE TABLE [dbo].[Matches] (
    [Id]            INT          IDENTITY (1, 1) NOT NULL,
    [MatchType]     INT          NOT NULL,
    [RedTeamKills]  INT          NULL,
    [BlueTeamKills] INT          NULL,
    [WinnerId]      INT          NULL,
    [WinnerTeam]    VARCHAR (10) NULL,
    CONSTRAINT [PK_Matches] PRIMARY KEY CLUSTERED ([Id] ASC)
);

