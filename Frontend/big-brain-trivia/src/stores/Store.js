import { store } from 'react-easy-state'

const bigbrainstore = store({

// Initialize Global Variables
currentUser : '',
 categories : new Map([
    ['9', 'General Knowledge'],
    ['15', 'Video Games'],
    ['21', 'Sports'],
    ['27', 'Animals']
]),
category : "",
playerStats : [],
questions : {},
easyQuestions : [],
mediumQuestions : [],
hardQuestions : [],
gameId: '',

// CURRENT USER -----------------
setCurrentUser(userName) {
    bigbrainstore.currentUser = userName
    console.log('Current User: ' + bigbrainstore.currentUser)
},

getCurrentUser() {
    return bigbrainstore.currentUser
},
// END STORE -------------------

// PLAYER STATS -------------------
setPlayerStats() {
    fetch('http://localhost:8080/api/bigbraintrivia/stats/' + bigbrainstore.currentUser)
        .then((response) => response.json())
        .then((json) => console.log('Player Stats: ' + json));

    //console.log('Player Stats Set: ' + bigbrainstore.playerStats)
},

getPlayerStats() {
    return bigbrainstore.playerStats
},
// END STORE -------------------

// QUESTIONS -------------------
async setQuestions(categoryId) {

    // Fetch Easy Questions
    await fetch('https://opentdb.com/api.php?amount=5&category=' + categoryId + '&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(json => bigbrainstore.easyQuestions = json.results);

    // Fetch Medium Questions
    await fetch('https://opentdb.com/api.php?amount=5&category=' + categoryId + '&difficulty=medium&type=multiple')
        .then(response => response.json())
        .then(json => bigbrainstore.mediumQuestions = json.results);

    // Fetch Hard Questions
    await fetch('https://opentdb.com/api.php?amount=5&category=' + categoryId + '&difficulty=hard&type=multiple')
        .then(response => response.json())
        .then(json => {
            bigbrainstore.hardQuestions = json.results;

        });
    bigbrainstore.category = bigbrainstore.categories.get(categoryId)
    console.log(bigbrainstore.easyQuestions)

    // Set Questions
    //bigbrainstore.questions = {category: categoryName, easyQuestions: bigbrainstore.easyQuestions, mediumQuestions: bigbrainstore.mediumQuestions, hardQuestions : bigbrainstore.hardQuestions}

},

getQuestions() {
    console.log('Questions Set: ' + bigbrainstore.questions.category)
    console.log('Questions Set: ' + bigbrainstore.questions.easyQuestions)
    return bigbrainstore.questions
},
// END STORE -------------------

// GAME ID -----------------
setGameId(id) {
    bigbrainstore.gameId = id

    console.log('Game Id: ' + bigbrainstore.gameId)
}
// END STORE -------------------

})

export default bigbrainstore
