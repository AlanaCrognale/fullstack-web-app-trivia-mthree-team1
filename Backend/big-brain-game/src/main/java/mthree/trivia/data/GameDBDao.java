/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mthree.trivia.data;

import mthree.trivia.models.Game;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import mthree.trivia.models.NewGame;
import mthree.trivia.models.NumWins;
import mthree.trivia.models.Stats;
import mthree.trivia.service.BigBrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pat
 */

@Repository
public class GameDBDao implements GameDao {

    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public GameDBDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Autowired
    private BigBrainService serv;

    
    
    private static final class GameMapper implements RowMapper<Game> {
        @Override
        public Game mapRow(ResultSet rs, int index) throws SQLException {
            Game gm = new Game();
            gm.setGameId(rs.getInt("gameId"));
            gm.setName(rs.getString("playerName"));
            gm.setCategory(rs.getString("category"));
            gm.setScore(rs.getInt("score"));
            gm.setCorrect(rs.getInt("correct"));
            gm.setWrong(rs.getInt("wrong"));
            
            return gm;
        }
    }
    
    private static final class WinsMapper implements RowMapper<NumWins> {
        @Override
        public NumWins mapRow(ResultSet rs, int index) throws SQLException {
            NumWins nw = new NumWins();
            nw.setName(rs.getString("playerName"));
            nw.setWins(rs.getInt("wins"));
            
            return nw;
        }
    }
    
    
    @Override
    public int newGame(NewGame game) {
        final String sql = "INSERT INTO game(playerName, category, score, correct, wrong) "
                + "VALUES (?,?,0,0,0)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement statement = conn.prepareStatement(
                sql,
                Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, game.getName());
            statement.setString(2, game.getCategory());
            return statement;
        }, keyHolder);
        
        return (keyHolder.getKey().intValue());
        
    }

    @Override
    public boolean updateGame(Game game) {
        final String sql = "UPDATE game SET "
                + "score = ?, "
                + "correct = ?, "
                + "wrong = ? "
                + "WHERE gameId = ?";

        if (game.getCorrect() < 13) {
            game.setWrong(3);
        }
        
        return (jdbcTemplate.update(sql, game.getScore(), game.getCorrect(), game.getWrong(), game.getGameId()) > 0);
    }

    @Override
    public List<Stats> getStats(String name) {
        final String sql = "SELECT * FROM game WHERE playerName = ?" ;
        
         List<Game> games = new ArrayList<>();
         games = jdbcTemplate.query(sql, new GameDBDao.GameMapper(), name);
         
         return(serv.playerStats(games));
    }
    
    @Override
    public boolean deleteGameByPlayerName(String playerName) {
        final String sql = "DELETE FROM game WHERE playerName = ?";
        return jdbcTemplate.update(sql, playerName) > 0;
    }
    
    @Override
    public List<Game> getAllGames() {
        final String sql = "SELECT * FROM game";

        return jdbcTemplate.query(sql, new GameDBDao.GameMapper());
    }  
    
    @Override
    public List<List<Game>> getLeaderboardHighScores() {
        final String sql= "SELECT * FROM game";
        return (serv.getLeaderboard(jdbcTemplate.query(sql, new GameDBDao.GameMapper())));
    }
    
    @Override
    public List<NumWins> getLeaderboardWins() {
        final String sql = "SELECT playerName, COUNT(case when correct>12 then 1 end) as wins FROM game GROUP BY playerName";
        List<NumWins> allWins = jdbcTemplate.query(sql, new GameDBDao.WinsMapper());
        
        allWins = serv.getWins(allWins);
        
        return allWins;
    }
    
    @Override
    public List<Game> getGamesByPlayerName(String name) {
        final String sql = "SELECT * FROM game WHERE playerName = ?";
        
         List<Game> games = jdbcTemplate.query(sql, new GameDBDao.GameMapper(), name);
         
         return games;
    }
    
    @Override
    public Game getGameById(int id) {
        final String sql = "SELECT * FROM game WHERE gameId = ?";
        
        Game game = jdbcTemplate.queryForObject(sql, new GameDBDao.GameMapper(), id);
        
        return game;
    }
    
          
}
