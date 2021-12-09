package mthree.trivia.models;
/**
 * 
 * @author Pat
 *
 */

public class Stats 
{
    private String Category;
    private int HighScore;
    private float WinLoseRatio;
    private int Wins;
    private int totalGames;
    private double CorrectAnswerPercent;

    public Stats() {
    }

     public Stats(String Category, int HighScore, int Wins, int TotalGames, double CorrectAnswerPercent) {
            this.Category = Category;
            this.HighScore = HighScore;
            this.CorrectAnswerPercent = CorrectAnswerPercent;
            this.Wins = Wins;
            this.totalGames = TotalGames;
        }

    public String getCategory() 
    {
            return Category;
    }

    public void setCategory(String category) 
    {
            Category = category;
    }

    public int getHighScore() 
    {
            return HighScore;
    }

    public void setHighScore(int highScore) 
    {
            HighScore = highScore;
    }

    public float getWinLoseRatio() 
    {
            return WinLoseRatio;
    }

    public void setWinLoseRatio(float winLoseRatio) 
    {
            WinLoseRatio = winLoseRatio;
    }

    public double getCorrectAnswerPercent() 
    {
            return CorrectAnswerPercent;
    }

    public void setCorrectAnswerPercent(double correctAnswerPercent) { CorrectAnswerPercent = correctAnswerPercent; }

    public int getWins() {
        return Wins;
    }

    public void setWins(int Wins) {
        this.Wins = Wins;
    }

    public int getTotalGames() {
        return totalGames;
    }

    public void setTotalGames(int totalGames) {
        this.totalGames = totalGames;
    }
        
        
	
}
