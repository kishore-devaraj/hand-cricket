'use strict'

function Team (name, rounds) {
  this.teamName = name
  this.rounds = Math.floor(rounds / 2)
  this.score = 0
  this.finalScore = 0
  this.currentNumber = 0
  this.remainingBalls = 0
}

function HandCricket (rounds) {
  this.teamOne = new Team('A', rounds)
  this.teamTwo = new Team('B', rounds)
  this.rounds = rounds
  this.battingTeam = null
  this.bowlingTeam = null
  this.observers = []
}

HandCricket.prototype.toss = function () {
  return Math.floor(Math.random() * Math.floor(2)) === 0 ? this.teamOne : this.teamTwo
}

HandCricket.prototype.getComputerNumber = function () {
  const allowThrows = [0, 1, 2, 3, 4, 6]
  return allowThrows[Math.floor(Math.random() * Math.floor(6))]
}

HandCricket.prototype.getRandom = function (number) {
  this.battingTeam.currentNumber = this.getComputerNumber()
  this.bowlingTeam.currentNumber = this.getComputerNumber()
}

HandCricket.prototype.check = function () {
  if(this.battingTeam.currentNumber === this.bowlingTeam.currentNumber) {
    // The team is out
    this.battingTeam.remainingBalls = 0
    this.battingTeam.rounds -= 1
    this.battingTeam.finalScore = this.battingTeam.score
    this.battingTeam.score = 'Out'
  } else {
    this.battingTeam.score += this.battingTeam.currentNumber
    this.battingTeam.remainingBalls -= 1
  }
}

HandCricket.prototype.throws = function () {
  this.getRandom()
  this.check()
}

HandCricket.prototype.getWinner = function () {
  if (this.battingTeam.finalScore === this.bowlingTeam.finalScore) return false // tie
  else {
      if (this.battingTeam.finalScore > this.bowlingTeam.finalScore) return this.battingTeam // Batting Team is winner
      else return this.bowlingTeam // Bowling Team is winner
  }
}

HandCricket.prototype.didMatchEnded = function () {
  if (this.battingTeam.remainingBalls >= 6 || this.bowlingTeam.remainingBalls >= 6) return false
  else {
      if (this.battingTeam.score > this.bowlingTeam.score) return true
      else return false
  }
}

HandCricket.prototype.broadcastCurrentState = function (state) {
  this.observers.map( observer => {
    observer(state)
  })
}


module.exports = {
  HandCricket
}