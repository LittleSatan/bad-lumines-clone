console.log("Starting server...");

const config = require('./config.json');
const express = require('express');
const fs = require('fs');
const app = express();

if (!fs.existsSync("highScores.json")) {
    // Create Highscore
    let highScoreTable = {
        "0": { "name": "BOB", "score": 10000 },
        "1": { "name": "JWC", "score": 9000 },
        "2": { "name": "SKT", "score": 8000 },
        "3": { "name": "TBS", "score": 7000 },
        "4": { "name": "MNM", "score": 6000 },
        "5": { "name": "WKJ", "score": 5000 },
        "6": { "name": "SVO", "score": 4000 },
        "7": { "name": "WHD", "score": 3000 },
        "8": { "name": "TRN", "score": 2000 },
        "9": { "name": "JWC", "score": 1000 }
    }
    fs.writeFile('highScores.json', JSON.stringify(highScoreTable), function(err) {
        if (err) throw err;
    })
}

app.use(express.static('static'));

app.get('/submitScore/:name/:score', submitScore);
app.get('/getHighScores', getHighScores);

app.get('*', function(req, res) {
    res.redirect('/');
});

function submitScore(req, res) {

    let name = req.params.name,
        score = parseInt(req.params.score),
        highScoreTable = JSON.parse(fs.readFileSync('highScores.json', 'utf8'));

    console.log("Recieved Score from " + name + " with " + score + " points. ");

    highscorefor:
        for (let i = 0; i <= 9; i++) {
            if (score > highScoreTable[i].score) {
                for (let j = 9; j > i; j--) {
                    highScoreTable[j].name = highScoreTable[j - 1].name;
                    highScoreTable[j].score = highScoreTable[j - 1].score;
                }
                highScoreTable[i].name = name;
                highScoreTable[i].score = score;
                break highscorefor;
            }
        }

    fs.writeFile('highScores.json', JSON.stringify(highScoreTable), function(err) {
        if (err) throw err;
    })

    res.send(JSON.stringify(highScoreTable));

}

function getHighScores(req, res) {
    let highScoreTable = JSON.parse(fs.readFileSync('highScores.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(highScoreTable));

}

var server = app.listen(config.port);