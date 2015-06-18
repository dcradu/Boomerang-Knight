CREATE TABLE [dbo].[MatchTypes] (
    [Id]        INT          IDENTITY (1, 1) NOT NULL,
    [MatchType] VARCHAR (20) NOT NULL,
    CONSTRAINT [PK_MatchTypes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

