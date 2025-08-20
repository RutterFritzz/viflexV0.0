<?php

namespace Database\Seeders;

use App\Models\Club;
use App\Models\Competition;
use App\Models\CompetitionTeam;
use App\Models\Game;
use App\Models\GameCoach;
use App\Models\Gameday;
use App\Models\GamePlayer;
use App\Models\Location;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use App\Models\UserTeamRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    private function addPlayersAndCoachesToGame(Game $game, Team $team)
    {
        $players = $team->players();
        $coaches = $team->coaches();
        $players->each(function ($player) use ($team, $game) {
            GamePlayer::create([
                'game_id' => $game->id,
                'user_id' => $player->id,
                'team_id' => $team->id,
            ]);
        });
        $coaches->each(function ($coach) use ($team, $game) {
            GameCoach::create([
                'game_id' => $game->id,
                'user_id' => $coach->id,
                'team_id' => $team->id,
            ]);
        });
    }

    public function run(): void
    {
        // Create roles first
        $playerRole = Role::firstOrCreate(['name' => 'player']);
        $coachRole = Role::firstOrCreate(['name' => 'coach']);

        // Create test user
        if (!User::where('email', 'test@example.com')->exists()) {
            User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);
        }

        // Create 4 clubs
        $clubNames = ['HSV Haren', 'UFC Groningen', 'Floorball Rodenburg', 'UFC Hogeland'];
        $clubLocations = ['Haren', 'Groningen', 'Leek', 'Hogeland'];
        $clubs = collect();
        for ($i = 0; $i < 4; $i++) {
            $clubs->push(Club::create([
                'name' => $clubNames[$i],
                'location' => $clubLocations[$i],
            ]));
        }

        // Create 4 locations
        $locationNames = ['Sportcentrum ScharlakenHof', 'Sporthal Leeuwenborg', 'Topsporthal', 'Op Roakeldaishal'];
        $locationCities = ['Haren', 'Groningen', 'Leek', 'Warffum'];
        $locations = collect();
        for ($i = 0; $i < 4; $i++) {
            $locations->push(Location::create([
                'name' => $locationNames[$i],
                'city' => $locationCities[$i],
            ]));
        }

        // For each club, create teams
        $teamNames = [['HSV o10', 'HSV o12-1', 'HSV o12-2', 'HSV o14', 'HSV o18'], ['UFC Groningen o10', 'UFC Groningen o12', 'UFC Groningen o14', 'UFC Groningen o18'], ['Floorball Rodenburg o10-1', 'Floorball Rodenburg o10-2', 'Floorball Rodenburg o12-1', 'Floorball Rodenburg o12-2', 'Floorball Rodenburg o18'], ['UFC Hogeland o10', 'UFC Hogeland o12', 'UFC Hogeland o14']];
        $teamCategories = [['o10', 'o12', 'o12', 'o14', 'o18'], ['o10', 'o12', 'o14', 'o18'], ['o10', 'o10', 'o12', 'o12', 'o18'], ['o10', 'o12', 'o14']];
        $allTeams = collect();
        for ($i = 0; $i < 4; $i++) {
            for ($j = 0; $j < count($teamNames[$i]); $j++) {
                $allTeams->push(Team::create([
                    'name' => $teamNames[$i][$j],
                    'club_id' => $clubs[$i]->id,
                    'category' => $teamCategories[$i][$j],
                ]));
            }
        }

        $playerNames = [
            ['Mirthe Banus', 'Tjalling Duitscher', 'Marcus te Velde', 'Laura Zandstra', 'Lotte Jeronimus', 'Megan Wekema', 'Loek Faber', 'Floris van Dalen', 'Mette Kooi', 'Femke Mertens', 'Jente Jongsma', 'Anna Bergstra'],
            ['Ruben van Elmpt', 'Nynke Lettinga', 'Finn van Schagen', 'Lauren te Velde', 'Berend Verbrug', 'Renée Thole', 'Guus Faber'],
            ['Stijn Bergstra Julia Camargo Carvalho', 'Joep van de Camp', 'Jacob Groot', 'Sofie van der Ploeg', 'Maarten Woudenberg', 'Pol van Santen'],
            ['Hugo Uyttenboogaart', 'Jaiden Sardjoe', 'Thomas Uyttenboogaart', 'Finn Smit', 'Dethmer Kielman', 'Bram Vogelzang', 'Floor van den Horn', 'Nathan te Velde', 'Jonas Vermeer', 'Silas Hulsman'],
            ['Lotte Takens', 'Axel Staal', 'Merel Weitering', 'Tobin van Haitsma', 'Rick Koops', 'Jasper Woudenberg', 'Inge Kooi', 'Maud Verschut', 'Ischa van Santen', 'Ruben Timmers', 'Toncan Fokkens', 'Rutger van der Kooi', 'Milo Bron', 'Lars Verschut', 'Niels Stuurwold'],
            ['Ilse van Aken', 'Leah Boonstra', 'Koen van Bruggen', 'Annelieke Hennink', 'Annabel van der Spoel', 'Trevor Kremer', 'Jesse Rodenboog'],
            ['Sil de Boer', 'Alica Kalicharan', 'Roelf Kappenburg', 'Arturs Vilums', 'Anelia de Vries'],
            ['Arun Elias', 'Thijmen Hennink', 'Max van Leeuwen', 'Shivani Ramlal', 'Pieter van Veen', 'Josef Westberg'],
            ['Elin Eriksson', 'Michiel Klijn', 'Tara Wierenga', 'Thomas Menses', 'Maarten Wierenga', 'Mika Dokter', 'Milan Engels', 'Sarah Smit', 'Adam Perl', 'Valeria Pieterse', 'Justin Sandee', 'Marijn Brunsveld', 'Gatis Vilums'],
            ['Joas Buursema', 'Jurre Verwoerd', 'Gido Betten', 'Sepp Berga', 'Julian Teitsma', 'Sarah Lourens', 'Tijn Mengerink', 'Floris Kik', 'Tom Schwab', 'Jesse Groen', 'Matthijs de Ruig', 'Nathan Gombert'],
            ['Remeijn Visser', 'Batu Alsan', 'Joas Buursema', 'Floris Kik', 'Tijn Mengerink', 'Matthijs de Ruig', 'Jesse Groen', 'Heleen Land'],
            ['Amare Visser', 'Sarah Talen', 'Milan Gurian De Oliveira Sikkema', 'Setfan Borger', 'Luuk Pera', 'Lotte Spannagel', 'Lisanne Pera', 'Iris Fruchnich',],
            ['Sepp Berga', 'Mélina Tuinstra', 'Daniel Land', 'Anna Lynn Gurian de Oliveira Sikkema', 'Twam Berga', 'Lotte Kruit', 'Milan Oosterhuis'],
            ['Laura Veening', 'Nynke Yntema', 'Danée Visser', 'Jordy Zantinga', 'Niels Flikkema', 'Chir Huiting', 'Tristen Visser', 'Lynn Scholte', 'Lars van der Baan', 'Evelyn Merkus', 'Tirza Bakker', 'Melissa de Vries', 'Naomi Zantinga', 'Rick de Haas', 'Wende Ekkers'],
            ['Robert Maciejun', 'Cas Bosman', 'Marlinde Buisman', 'Kaya Maciejun', 'Jaivey Knol', 'Rowan Das', 'Maik Mensen', 'Thomas Trox', 'Eva Gol'],
            ['Joey Feldman', 'Anna Buisman', 'Ben Jonkheer', 'Emma Timmers', 'Dominic Gomez', 'Esper-Sverre Buma', 'Eva Gol', 'Julian De Bruin'],
            ['Weslet Feldman', 'Vera Veldkamp', 'Eline Buisman', 'Hannah Timmers', 'Babette Woldring', 'Freerk Grashuis', 'Koen Joling', 'Wout Bosman', 'Ties Brenninkmeijer'],
        ];
        // For each team, create players
        for ($i = 0; $i < count($allTeams); $i++) {
            $players = collect();
            for ($j = 0; $j < count($playerNames[$i]); $j++) {
                $players->push(User::create([
                    'name' => $playerNames[$i][$j],
                    'email' => fake()->unique()->safeEmail(),
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ]));
            }
            foreach ($players as $player) {
                UserTeamRole::create([
                    'user_id' => $player->id,
                    'team_id' => $allTeams[$i]->id,
                    'role_id' => $playerRole->id,
                ]);
            }
        }

        $coachNames = [
            ['Maud Verschut', 'Merel Weitering'],
            ['Stefan te Velde'],
            ['Axel Staal', 'Jasper Woudenberg'],
            ['Rutger van der Kooi'],
            ['Mark Verschut'],
            ['Bianca'],
            ['Mark'],
            [''],
            ['Chiel Kroesen'],
            ['Danée Visser', 'Tristen Visser'],
            ['Henri Koops'],
            ['Henri Koops'],
            ['Danée Visser', 'Tristen Visser'],
            [''],
            ['Anna'],
            ['Jacco Buisman'],
            ['Jacco Buisman'],
        ];

        // For each team, create coaches
        for ($i = 0; $i < count($allTeams); $i++) {
            $coaches = collect();
            for ($j = 0; $j < count($coachNames[$i]); $j++) {
                if ($coachNames[$i][$j] === '') {
                    continue;
                }
                $user = User::where('name', $coachNames[$i][$j])->first();
                if ($user) {
                    $coaches->push($user);
                } else {
                    $coaches->push(User::create([
                        'name' => $coachNames[$i][$j],
                        'email' => fake()->unique()->safeEmail(),
                        'email_verified_at' => now(),
                        'password' => Hash::make('password'),
                    ]));
                }
            }
            foreach ($coaches as $coach) {
                UserTeamRole::create([
                    'user_id' => $coach->id,
                    'team_id' => $allTeams[$i]->id,
                    'role_id' => $coachRole->id,
                ]);
            }
        }

        // Create competitions
        $competitionNames = ['Jeugd Noord o10', 'Jeugd Noord o12', 'Jeugd Noord o14', 'Jeugd Noord o18'];
        $competitionCategories = ['o10', 'o12', 'o14', 'o18'];
        $competitionYears = [2025, 2025, 2025, 2025];
        $competitions = collect();
        for ($i = 0; $i < count($competitionNames); $i++) {
            $competitions->push(Competition::create([
                'name' => $competitionNames[$i],
                'category' => $competitionCategories[$i],
                'year' => $competitionYears[$i],
            ]));
        }

        // Select teams for this competition
        $competitionTeams = [
            [1, 6, 11, 15],
            [2, 3, 7, 12, 13, 16],
            [4, 8, 17],
            [5, 9, 14]
        ];

        // Create competition-team relationships
        for ($i = 0; $i < count($competitionTeams); $i++) {
            for ($j = 0; $j < count($competitionTeams[$i]); $j++) {
                CompetitionTeam::create([
                    'competition_id' => $competitions[$i]->id,
                    'team_id' => $competitionTeams[$i][$j],
                ]);
            }
        }

        // Create games

        $gamedays = [
            [1, '2025-08-15'],
            [2, '2025-08-16'],
            [1, '2025-08-17'],
            [3, '2025-08-18'],
        ];

        for ($i = 0; $i < count($gamedays); $i++) {
            Gameday::create([
                'location_id' => $gamedays[$i][0],
                'date' => $gamedays[$i][1],
            ]);
        }

        $games = [
            [1, 1, 1, 6, '10:00'],
            [1, 1, 11, 15, '12:00'],
            [1, 2, 2, 3, '14:00'],
            [1, 2, 12, 13, '16:00'],
        ];
        foreach ($games as $game) {
            $game = Game::create([
                'gameday_id' => $game[0],
                'competition_id' => $game[1],
                'home_team_id' => $game[2],
                'away_team_id' => $game[3],
                'time' => $game[4],
            ]);
            $this->addPlayersAndCoachesToGame($game, $game->homeTeam);
            $this->addPlayersAndCoachesToGame($game, $game->awayTeam);
        }
    }
}
