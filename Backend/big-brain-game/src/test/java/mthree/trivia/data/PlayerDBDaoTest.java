/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mthree.trivia.data;

import java.util.List;
import mthree.trivia.models.Game;
import mthree.trivia.models.NewGame;
import mthree.trivia.models.Player;
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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author pat
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlayerDBDaoTest {
    
    @Autowired
    PlayerDBDao playerDao;
    
    @Autowired
    GameDBDao gameDao;
    
    @Autowired
    BigBrainService serv;
    
    public PlayerDBDaoTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        List<Player> players = playerDao.getAllPlayers();
        for (Player player : players) {
            gameDao.deleteGameByPlayerName(player.getName());
            playerDao.deletePlayer(player.getName());
        }
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of addPlayer method, of class PlayerDBDao.
     */

    @Test
    public void testAddPlayer() {
        Player player = new Player();
        player.setName("Pat");
        player.setPassword("testPassword");
        
        
        String name = playerDao.addPlayer(player);

        Player fromDao = playerDao.getPlayer(player.getName());
        
        assertEquals(player, fromDao);
    }

    /**
     * Test of updatePlayer method, of class PlayerDBDao.
     */

    @Test
    public void testUpdatePlayer() {
        Player player = new Player();
        player.setName("Pat");
        player.setPassword("originalPassword");
        
        String name = playerDao.addPlayer(player);
        
        String newPassword = "newPassword";
        player.setPassword(newPassword);
        playerDao.updatePlayer(player);
        
        Player fromDao = playerDao.getPlayer(player.getName());
        
        assertEquals(player, fromDao);
    }

    /**
     * Test of logIn method, of class PlayerDBDao.
     */

    @Test
    public void testLogIn() {
        Player player = new Player();
        player.setName("Pat");
        player.setPassword("test");
        playerDao.addPlayer(player);
        
        // Test wrong password
        Player logInAttempt = new Player();
        logInAttempt.setName(player.getName());
        logInAttempt.setPassword("wrong");
        
        String answer1 = playerDao.logIn(logInAttempt);
        assertEquals(answer1, "Invalid Password");
        
        // Test right password
        logInAttempt.setPassword(player.getPassword());
        String answer2 = playerDao.logIn(logInAttempt);
        assertEquals(answer2, "Login Successful!");
        
        // Test user doesn't exist in DB
        logInAttempt.setName("noName");
        String answer3 = playerDao.logIn(logInAttempt);
        assertEquals(answer3, "User Not Found!");
        
    }

    /**
     * Test of deletePlayer method, of class PlayerDBDao.
     */

    @Test
    public void testDeletePlayer() {
        Player player1 = new Player();
        Player player2 = new Player();
        Player player3 = new Player();
        
        player1.setName("A");
        player1.setPassword("Apassword");
        player2.setName("B");
        player2.setPassword("Bpassword");
        player3.setName("C");
        player3.setPassword("Cpassword");
        
        playerDao.addPlayer(player1);
        playerDao.addPlayer(player2);
        
        NewGame gamePlayer1 = new NewGame();
        gamePlayer1.setCategory("Sports");
        gamePlayer1.setName("A");
        
        gameDao.newGame(gamePlayer1);
        
        assertTrue(playerDao.deletePlayer("A")); // delete player with games
        assertTrue(playerDao.deletePlayer("B")); // delete player without games
        assertFalse(playerDao.deletePlayer("C")); // attempt to delete player that doesn't exist in DB
        
    }
   
}
