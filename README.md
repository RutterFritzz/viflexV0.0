# Viflex V0.0

## Tables

A discription of what a table does and how you can use it

### User table

This table stores all the users. A user is uniqe and one person has one user. Only in speical cases should a person have more then one user in the users table (i.g. if a person has a super_admin account and a normal account)

### Clubs table

A club has teams.

### Teams table

A team belongs to a club and has players and coach(es). A Team can have games as home team or away team.

### Roles table

This table now only has two options, player or coach. But this shows what the user is.

### user_team_roles table

This shows what user belongs to what team and what role it has in that team. This makes it possible for a user to belong in multible teams and have different functions in different teams.

>[!NOTE]
For every record of this table there should be a data table that shows the info about the player/coach i.g. how many matches they attended or how mutch they scored etc.

### Locations table

A location is a place where matchdays can be held. It is the physical place of where the matches are held.

### Gamedays table

Gamedays have one or more games. They tell the game where the game is and what day the game is.

### Competitions table

A game needs to be in a competition

>[!note]
this will later be used to add scores so you can see who is winning etc. A team also has a competition.

A game in competiton A can only have teams participating form competition A

### competition_team table

A pivot table to show witch team is in what competition, a team can have many competitions and a compeittion can have many teams

### Games table

A game has two teams (home and away team) it has two referees (home and away referee)
> [!NOTE]
(this should be changed becouse a game can have one or maybe more referees, think of a mentor referee that needs to be present to help a puiple)

it has the score

>[!NOTE]
It should later have more info about a game i.g. who scored etc.

>[!NOTE]
They should also belong to a club?? A club is responsible for organizing everything.

### Referees table

This shows whitch users are also a referee. Compared to the roles a user can only be one referee and can not have two referee instances.

### game_referees table

pivot table to show witch referees need to be at what game.

>[!NOTE]
This is a thing but in the game table you still have home and away referee, a choice needs to be made.

### game_players table

pivot table to show witch players need to be at what game.

### game_coaches table

pivot table to show witch coaches need to be at what game.