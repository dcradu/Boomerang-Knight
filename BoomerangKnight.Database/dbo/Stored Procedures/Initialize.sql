CREATE PROCEDURE Initialize
AS
BEGIN
	SET NOCOUNT ON;

	SET IDENTITY_INSERT dbo.MatchTypes ON
		INSERT INTO MatchTypes(Id, MatchType) SELECT 1, 'Deathmatch'
		INSERT INTO MatchTypes(Id, MatchType) SELECT 2, 'Team deathmatch'
		INSERT INTO MatchTypes(Id, MatchType) SELECT 3, 'Capture the flag'

END