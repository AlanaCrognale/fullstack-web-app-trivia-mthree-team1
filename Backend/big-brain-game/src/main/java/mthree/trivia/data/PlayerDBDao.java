package mthree.trivia.data;

import mthree.trivia.models.Player;
import mthree.trivia.service.BigBrainService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

/**
 * 
 * @author Jared
 */

@Repository
public class PlayerDBDao implements PlayerDao
{
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public PlayerDBDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Autowired
    private BigBrainService Service;

	@Override
	public String addPlayer(Player newPlayer) 
	{
		final String sql = "INSERT INTO player (playerName, playerPassword) VALUES (?,?)";
                final String sqlTest = "SELECT * FROM player WHERE playerName = ?";  
                try {
                    Player player = jdbcTemplate.queryForObject(sqlTest, new PlayerDBDao.PlayerMapper(), newPlayer.getName());
		}
		catch(EmptyResultDataAccessException e) {
                    jdbcTemplate.update(sql, newPlayer.getName(), Service.encodePassword(newPlayer.getPassword()));
                    return "Addition Successful!";
		}
                return "User already exists!";
	}
        
        @Override
        public Player getPlayer(String name) {
            final String sql = "SELECT * FROM player WHERE playerName = ?";
            
            return jdbcTemplate.queryForObject(sql, new PlayerDBDao.PlayerMapper(), name);
        }

	@Override
	public void updatePlayer(Player player)
	{
		final String sql = "UPDATE player SET playerPassword = ? WHERE playerName = ?";
		jdbcTemplate.update(sql, Service.encodePassword(player.getPassword()), player.getName());
	}

	@Override
	public String logIn(Player playerLogin) 
	{
		final String sql = "SELECT * FROM player WHERE playerName = ?";
                //Player player = new Player();
                String correctPassword;
                Player player = new Player();
		try
		{
                    player = jdbcTemplate.queryForObject(sql, new PlayerMapper(), playerLogin.getName());
                    
		}
		catch (EmptyResultDataAccessException e)
		{
                    return "User Not Found!";
		}
                
                
                correctPassword = player.getPassword();
                String attemptPassword = playerLogin.getPassword();
                
                if (Service.verifyEncodedPassword(attemptPassword, correctPassword)) {
                    return "Login Successful!";
                } else {
                    return "Invalid Password";
                }
                
                
	}
	
	@Override
	public boolean deletePlayer(String name) 
	{
            final String sqlGame = "DELETE FROM game WHERE playerName = ?";
            jdbcTemplate.update(sqlGame, name);
            
            final String sql = "DELETE FROM player WHERE playerName = ?";
            return (jdbcTemplate.update(sql, name) > 0);
	}
        
        @Override
        public List<Player> getAllPlayers() {
            final String sql = "SELECT * FROM player";
            
            return jdbcTemplate.query(sql, new PlayerDBDao.PlayerMapper());
        }
	
	private static final class PlayerMapper implements RowMapper<Player>
	{
		@Override
		public Player mapRow(ResultSet rs, int index) throws SQLException
		{
			Player p = new Player();
			p.setName(rs.getString("playerName"));
			p.setPassword(rs.getString("playerPassword"));
			return p;
		}
	}
}
