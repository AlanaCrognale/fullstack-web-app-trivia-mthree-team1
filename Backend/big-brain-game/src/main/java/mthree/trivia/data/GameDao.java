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
import mthree.trivia.models.Stats;

/**
 *
 * @author pat
 */

public interface GameDao {
    
    int newGame(NewGame game);
    
    boolean updateGame(Game game);
    
    List<Stats> getStats(String name);
    
    boolean deleteGameByPlayerName(String playerName);
    
    List<List<Game>> getLeaderboardHighScores();
    
    List<NumWins> getLeaderboardWins();
    
    List<Game> getAllGames();
    
    List<Game> getGamesByPlayerName(String name);
    
    Game getGameById(int id);
}
