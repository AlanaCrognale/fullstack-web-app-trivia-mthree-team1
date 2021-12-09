package mthree.trivia.controllers;

import mthree.trivia.data.GameDao;
import mthree.trivia.data.GameDBDao;
import mthree.trivia.data.PlayerDao;
import mthree.trivia.data.PlayerDBDao;
import mthree.trivia.models.*;

import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

/**
 * 
 * @authors Jared, Pat
 */

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bigbraintrivia")
public class BigBrainTriviaController 
{
	private final PlayerDao playerDao;
	private final GameDao gameDao;
	
	public BigBrainTriviaController(PlayerDao _playerDao, GameDao _gameDao)
	{
		playerDao = _playerDao;
		gameDao = _gameDao;
	}
        
        @PostMapping("/test")
        @ResponseStatus(HttpStatus.FOUND)
        public void test() {
            
        }
	
	@PostMapping("/game/{playerName}/{category}")
	@ResponseStatus(HttpStatus.CREATED)
	public int CreateGame(@PathVariable String playerName, @PathVariable String category)
	{
		NewGame game = new NewGame();
		game.setName(playerName);
		game.setCategory(category);
		return gameDao.newGame(game);
	}
	
	@PostMapping("/player")
	@ResponseStatus(HttpStatus.CREATED)
	public Message CreatePlayer(@RequestBody Player newPlayer)
	{
		Message message = new Message(playerDao.addPlayer(newPlayer));
		return message;
	}
	
	@PutMapping("/player/{name}")
	public Message UpdatePlayer(@RequestBody Player player)
	{
		playerDao.updatePlayer(player);
		Message message = new Message("Password Updated!");
		return message;
	}
	
	@PutMapping("/game/{id}")
	public void UpdateScore(@RequestBody Game game)
	{
		gameDao.updateGame(game);
	}
        
	@GetMapping("/game/{id}")
	public Game GetGameById(@PathVariable int id) { return gameDao.getGameById(id); }
	
	@PostMapping("/player/login")
	public Message Login(@RequestBody Player playerLogin)
	{
		Message message = new Message(playerDao.logIn(playerLogin));
		return message;
	}

	@GetMapping("/stats/{playerName}")
	public List<Stats> GetStats(@PathVariable String playerName) { return gameDao.getStats(playerName); }
	
	@GetMapping("/leaderboard/highscore")
	public List<List<Game>> GetLeaderboardHighScore()
	{
		return gameDao.getLeaderboardHighScores();
	}
        
	@GetMapping("/leaderboard/wins")
	public List<NumWins> GetLeaderboardWins()
	{
		return gameDao.getLeaderboardWins();
	}

	@DeleteMapping("/player/{name}")
	public void DeletePlayer(@PathVariable String name)
	{
		playerDao.deletePlayer(name);
	}
}