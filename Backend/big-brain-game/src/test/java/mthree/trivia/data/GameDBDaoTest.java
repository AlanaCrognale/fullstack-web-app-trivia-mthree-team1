/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mthree.trivia.data;

import java.util.List;
import mthree.trivia.models.Game;
import mthree.trivia.models.NewGame;
import mthree.trivia.models.NumWins;
import mthree.trivia.models.Player;
import mthree.trivia.models.Stats;
import mthree.trivia.service.BigBrainService;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author pat
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class GameDBDaoTest {
    
    @Autowired
    PlayerDBDao playerDao;
    
    @Autowired
    GameDBDao gameDao;
    
    @Autowired
    BigBrainService serv;
    
    public GameDBDaoTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        List<Game> games = gameDao.getAllGames();
        for (Game game : games) {
            gameDao.deleteGameByPlayerName(game.getName());
        }
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of newGame method, of class GameDBDao.
     * Also test getGameByPlayerName
     */

    @Test
    public void testNewGame() {
        // Player must be in database since using foreign key
        String name = "Pat";

        Player player = new Player();
        player.setName(name);
        player.setPassword("test");
        
        playerDao.addPlayer(player);
       
       NewGame game = new NewGame();
        game.setCategory("Sports");
        game.setName(name);
        
        gameDao.newGame(game);
        
        List<Game> games = gameDao.getGamesByPlayerName(name);
        
        assertEquals(games.size(), 1); // should only be one game because one newgame made
        Game fromDao = games.get(0);
        
        assertEquals(fromDao.getCategory(), "Sports");
        assertEquals(fromDao.getName(), name);
        
    }


    /**
     * Test of updateGame method, of class GameDBDao.
     * Also getGameById
     */

    @Test
    public void testUpdateGetGame() {
        // Player must be in database since using foreign key
        String name = "Pat";
        Player player = new Player();
        player.setName(name);
        player.setPassword("test");
        playerDao.addPlayer(player);
        
        NewGame newGame = new NewGame();
        newGame.setCategory("Sports");
        newGame.setName(name);
        
        int id = gameDao.newGame(newGame);
        
        Game game = new Game();
        game.setGameId(id);
        game.setName(name);
        game.setCategory("Sports");
        game.setCorrect(1);
        game.setWrong(3);
        game.setScore(4);
        
        gameDao.updateGame(game);
        
        Game fromDao = gameDao.getGameById(id);
        
        assertEquals(game, fromDao);
        
        
    }

    /**
     * Test of getStats method, of class GameDBDao.
     */

    @Test
    public void testGetStats() {
        // Player must be in database since using foreign key
        String name = "Pat";
        Player player = new Player();
        player.setName(name);
        player.setPassword("test");
        playerDao.addPlayer(player);
        
        // Create a new game
        NewGame newGame = new NewGame();
        newGame.setCategory("Sports");
        newGame.setName(name);
        int id = gameDao.newGame(newGame);
        
        // Update stats for that game
        Game game = new Game(id, "Pat", "Sports");
        game.setCorrect(1);
        game.setWrong(3);
        game.setScore(4);
        gameDao.updateGame(game);
        
        List<Stats> playerStats = gameDao.getStats(name);
        Stats gkStats = playerStats.get(0);
        Stats sportsStats = playerStats.get(2);
        
        // General Knowledge was not played so should be no values
        assertEquals(gkStats.getCategory(), "General Knowledge");
        assertEquals(gkStats.getHighScore(), 0);
        
        // Only sports values entered so testing that they input correctly
        assertEquals(sportsStats.getCategory(), "Sports");
        assertEquals(sportsStats.getHighScore(), 4);
        assertEquals(sportsStats.getWins(), 0);
        assertEquals(sportsStats.getCorrectAnswerPercent(), 0.25, 0.0001); // comparing floats so need a delta value
    }


    /**
     * Test of getLeaderboardHighScores method, of class GameDBDao.
     */

    @Test
    public void testGetLeaderboardHighScores() {
         // Player must be in database since using foreign key
        String name = "Pat";
        Player player = new Player();
        player.setName(name);
        player.setPassword("test");
        playerDao.addPlayer(player);
        
        // Add games in sports category ----------------------------------
        // Create a new game
        NewGame newGame = new NewGame();
        newGame.setCategory("Sports");
        newGame.setName(name);
        int id = gameDao.newGame(newGame);
        
        // Update stats for that game
        Game game = new Game(id, "Pat", "Sports");
        game.setCorrect(1);
        game.setWrong(3);
        game.setScore(4);
        gameDao.updateGame(game);
        
        // Loop to add 7 games into General Knowledge category to test that it is only returning 5
        // Also testing ordering
        for (int i = 0; i < 8; i++) {
            // Create a new game 
            newGame.setCategory("General Knowledge");
            newGame.setName(name);
            id = gameDao.newGame(newGame);

            // Update stats for that game
            game = new Game(id, "Pat", "General Knowledge");
            game.setCorrect(1);
            game.setWrong(3);
            game.setScore(i);
            gameDao.updateGame(game);
        }
        
        List<List<Game>> leaderboards = gameDao.getLeaderboardHighScores();
        // Test leaderboards for all 4 categories are returned
        assertEquals(leaderboards.size(),4);
        
        List<Game> gkGames = leaderboards.get(0);
        // Test size of general knowledge is 5
        assertTrue(gkGames.size()==5);
        
        Game bottomGk = gkGames.get(4);
        // Scores 1-7 are in GK so bottom (#5) score should be 3
        assertEquals(bottomGk.getScore(),3);
        
        
    }
    
    /**
     * Test of getLeaderboardWins method, of class GameDBDao.
     */
    @Test
    public void testGetLeaderboardWins() {
        
        String name = "Pat";
        Player player = new Player();
        player.setName(name);
        player.setPassword("test");
        playerDao.addPlayer(player);
        
        // Create a new game
        NewGame newGame = new NewGame();
        int id;
        Game game = new Game();
        // loop to add 20 wins 
        // Also testing ordering
        for (int i = 0; i < 20; i++) {
            // Create a new game 
            newGame.setCategory("General Knowledge");
            newGame.setName(name);
            id = gameDao.newGame(newGame);

            // Update stats for that game
            game = new Game(id, "Pat", "General Knowledge");
            game.setCorrect(18);
            game.setWrong(2);
            game.setScore(i);
            gameDao.updateGame(game);
        }
        
        List<NumWins> winsBoard = gameDao.getLeaderboardWins();
        
        assertEquals(winsBoard.size(), 1);
        NumWins top = winsBoard.get(0);
        
        assertEquals(top.getWins(), 20);
    }

}
