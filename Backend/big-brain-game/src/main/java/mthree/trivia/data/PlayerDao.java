/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mthree.trivia.data;

import java.util.List;
import mthree.trivia.models.Player;

/**
 *
 * @author pat
 */
public interface PlayerDao {
    
    String addPlayer(Player newPlayer);
    
    Player getPlayer(String name);
    
    void updatePlayer(Player player);
    
    String logIn(Player playerLogin);
    
    boolean deletePlayer(String name);
    
    List<Player> getAllPlayers();
}
