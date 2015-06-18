CREATE TABLE [dbo].[Players] (
    [Id]           INT           IDENTITY (1, 1) NOT NULL,
    [Username]     VARCHAR (20)  CONSTRAINT [DF_Players_Username] DEFAULT ('') NOT NULL,
    [Password]     VARCHAR (200) NOT NULL,
    [Email]        VARCHAR (50)  NOT NULL,
    [CreationDate] DATE          CONSTRAINT [DF_Players_CreationDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Players] PRIMARY KEY CLUSTERED ([Id] ASC)
);

