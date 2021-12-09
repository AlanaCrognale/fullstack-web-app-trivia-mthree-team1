package mthree.trivia.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import mthree.trivia.models.*;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import org.springframework.stereotype.Service;

import static java.lang.Double.isNaN;

/**
 * 
 * @authors Jared, Pat
 */
@Service
public class BigBrainService 
{
	private final JdbcTemplate jdbcTemplate;
	
	public BigBrainService() 
	{
		jdbcTemplate = new JdbcTemplate();		
	}
	
	 // Inputs list of games for a player and returns the players stats
    public List<Stats> playerStats(List<Game> games) {
        List<Stats> playerStatsList = new ArrayList<>();
       
        int maxGeneralKnowledge = 0;
        int gamesGeneralKnowledge = 0;
        int winsGeneralKnowledge = 0;
        int questionsGeneralKnowledge = 0;
        int correctGeneralKnowledge = 0;
        
        int maxEntertainment = 0;
        int gamesEntertainment = 0;
        int winsEntertainment = 0;
        int questionsEntertainment = 0;
        int correctEntertainment = 0;
        
        int maxSports = 0;
        int gamesSports = 0;
        int winsSports = 0;
        int questionsSports = 0;
        int correctSports = 0;
        
        int maxAnimals = 0;
        int gamesAnimals = 0;
        int winsAnimals = 0;
        int questionsAnimals = 0;
        int correctAnimals = 0;
        
        
        for (Game game : games) {
            switch (game.getCategory()) {
                case "General Knowledge":
                    if (game.getScore() > maxGeneralKnowledge) {maxGeneralKnowledge = game.getScore();}
                    gamesGeneralKnowledge += 1;
                    if (game.getCorrect() > 12) {winsGeneralKnowledge += 1;}
                    questionsGeneralKnowledge += (game.getCorrect()+game.getWrong());
                    correctGeneralKnowledge += game.getCorrect();
                    break;
                    
                case "Video Games":
                    if (game.getScore() > maxEntertainment) {maxEntertainment = game.getScore();}
                    gamesEntertainment += 1;
                    if (game.getCorrect() > 12) {winsEntertainment += 1;}
                    questionsEntertainment += (game.getCorrect()+game.getWrong());
                    correctEntertainment += game.getCorrect();
                    break;
                    
                case "Sports":
                    if (game.getScore() > maxSports) {maxSports = game.getScore();}
                    gamesSports += 1;
                    if (game.getCorrect() > 12) {winsSports += 1;}
                    questionsSports += (game.getCorrect()+game.getWrong());
                    correctSports += game.getCorrect();
                    break;
                    
                case "Animals":
                    if (game.getScore() > maxAnimals) {maxAnimals = game.getScore();}
                    gamesAnimals += 1;
                    if (game.getCorrect() > 12) {winsAnimals += 1;}
                    questionsAnimals += (game.getCorrect()+game.getWrong());
                    correctAnimals += game.getCorrect();
                    break;
            }
        }
        
        Stats generalKnowledge = new Stats("General Knowledge", 
                                        maxGeneralKnowledge, 
                                        winsGeneralKnowledge, gamesGeneralKnowledge, 
                                        checkNaN((float)correctGeneralKnowledge/questionsGeneralKnowledge));
        Stats entertainment = new Stats("Video Games", 
                                        maxEntertainment, 
                                        winsEntertainment, gamesEntertainment, 
                                        checkNaN((float)correctEntertainment/questionsEntertainment));
        Stats sports = new Stats("Sports", 
                                        maxSports, 
                                        winsSports, gamesSports, 
                                        checkNaN((float)correctSports/questionsSports));
        Stats animals = new Stats("Animals", 
                                        maxAnimals, 
                                        winsAnimals, gamesAnimals, 
                                        checkNaN((float)correctAnimals/questionsAnimals));
        
        
        playerStatsList.add(generalKnowledge);
        playerStatsList.add(entertainment);
        playerStatsList.add(sports);
        playerStatsList.add(animals);
        
        return playerStatsList;
    }

	
	public boolean playerIsValid(String playerName)
	{
		final String sql = "SELECT * FROM player WHERE playerName = ?";
                try
                {
                        Player player = jdbcTemplate.queryForObject(sql, new BigBrainService.PlayerMapper(), playerName);
                        return false;
                }
                catch(EmptyResultDataAccessException e)
                {
                        return true;
                }
	}
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public String encodePassword (String password) {
        return passwordEncoder.encode(password);
	}

    public boolean verifyEncodedPassword (String password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }

        public List<List<Game>> getLeaderboard(List<Game> games) {
            
            List<Game> gkGames = new ArrayList<>();
            List<Game> vgGames = new ArrayList<>();
            List<Game> spGames = new ArrayList<>();
            List<Game> anGames = new ArrayList<>();
            // Sort the games
            games.sort((Game g1, Game g2) -> {
               if (g1.getScore() > g2.getScore())
                   return -1;
               if (g1.getScore() < g2.getScore())
                   return 1;
               return 0;          
            });
            
            // Add each game to its corresponding category list
            // These should be added in order of score since games is sorted
            for (Game game : games) {
                if (null != game.getCategory()) switch (game.getCategory()) {
                    case "General Knowledge":
                        gkGames.add(game);
                        break;
                    case "Video Games":
                        vgGames.add(game);
                        break;
                    case "Sports":
                        spGames.add(game);
                        break;
                    case "Animals":
                        anGames.add(game);
                        break;
                    default:
                        break;
                }
            }
            
            // Shrink each list to size 5 if it is longer than 5 entries
            int gkSize = gkGames.size();
            int vgSize = vgGames.size();
            int spSize = spGames.size();
            int anSize = anGames.size();
            
            if (gkSize > 5) {
                gkGames.subList(5, gkGames.size()).clear();
            }
            if (vgSize > 5) {
                vgGames.subList(5, vgGames.size()).clear();
            }
            if (spSize > 5) {
                spGames.subList(5, spGames.size()).clear();
            }
            if (anSize > 5) {
                anGames.subList(5, anGames.size()).clear();
            }
            
            // Add each list of top 5 scores to leaderboard
            List<List<Game>> leaderboard = new ArrayList<>();
            leaderboard.add(gkGames);
            leaderboard.add(vgGames);
            leaderboard.add(spGames);
            leaderboard.add(anGames);
            
            // if this doesn't work then:
            // games.sort(Comparator.comparingInt(Game::getScore()));
            /*
            List<Game> leaderboard = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                leaderboard.add(games.get(i));
            }
            */
            return leaderboard;
        }
        
        public List<NumWins> getWins(List<NumWins> allWins) {
            // Order from highest to lowest
            allWins.sort((NumWins w1, NumWins w2) -> {
               if (w1.getWins() > w2.getWins())
                   return -1;
               if (w1.getWins() < w2.getWins())
                   return 1;
               return 0;          
            });
            
            // Shorten to only top 5
            if (allWins.size()>5) {
                allWins.subList(5, allWins.size()).clear();
            }
            
            return allWins;
        }
	
	private static final class PlayerMapper implements RowMapper<Player>
	{
		@Override
		public Player mapRow(ResultSet rs, int index) throws SQLException
		{
			Player p = new Player();
			p.setName(rs.getString("name"));
			p.setPassword(rs.getString("password"));
			return p;
		}
	}

	private double checkNaN (double correctAnswerQuestions) {
	    if (isNaN(correctAnswerQuestions)) {
	        correctAnswerQuestions = 0;
        }
	    return correctAnswerQuestions;
    }
}
