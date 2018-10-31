const { HandCricket } = require('./models')

let rounds = 2
const handCricket = new HandCricket(rounds)

// Adding the observers to the broadcaster
handCricket.observers.push(consoleOutput)
// handCricket.observers.push(streamScoreToApi)
// handCricket.observers.push(addItToDb)

handCricket.battingTeam = handCricket.toss()
const battingTeamName = handCricket.battingTeam.teamName
handCricket.bowlingTeam = battingTeamName === 'A' ? handCricket.teamTwo : handCricket.teamOne

handCricket.broadcastCurrentState(`Who bats first? ${battingTeamName}`)

let currentRound = 1

while(currentRound <= rounds) {
  handCricket.battingTeam.remainingBalls = 6
  handCricket.battingTeam.score = 0
  handCricket.broadcastCurrentState(`Round ${currentRound}: ${handCricket.battingTeam.teamName} is batting`)
  while(handCricket.battingTeam.remainingBalls !== 0) {
    handCricket.throws()
    handCricket.broadcastCurrentState(`A throws ${handCricket.battingTeam.currentNumber}, 
    B throws ${handCricket.bowlingTeam.currentNumber}.
    ${handCricket.battingTeam.teamName}'s score is ${handCricket.battingTeam.score}`)
  }
  // Swapping the batting and bowling teams
  handCricket.battingTeam = handCricket.battingTeam === handCricket.teamOne ? handCricket.teamTwo : handCricket.teamOne 
  handCricket.bowlingTeam = handCricket.bowlingTeam === handCricket.teamOne ? handCricket.teamTwo : handCricket.teamOne
  currentRound += 1
}

const gameWinnerName = handCricket.getWinner()
if(gameWinnerName === false) {
  handCricket.broadcastCurrentState(`It's a tie`)
} else {
  handCricket.broadcastCurrentState(`Game Winner is ${gameWinnerName.teamName}`)
}

// Output Observers
function consoleOutput (outputToBeConsoled) {
  console.log(outputToBeConsoled)
}

function streamScoreToApi (outputToBeConsoled) {
  // Do the necessary
  console.log(`In Streaming ${outputToBeConsoled}`)
}

function addItToDb (outputToBeConsoled) {
  // Do the necessary
  console.log(`Adding it to db ${outputToBeConsoled}`)
}
