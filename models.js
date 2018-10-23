'use strict'

const readlineSync = require('readline-sync')

function Player(name) {
    this.name = name
    this.score = 0
    this.ballsFaced = 0
}

function Team(teamName, teamSize) {
    this.teamName = teamName
    this.score = 0
    this.currentNumber = 0
    this.totalPlayers = teamSize
    this.remainingBalls = 6
    this.players = new Array(this.totalPlayers)
}

Team.prototype.teamChooseTo = function () {
    const options = ['Batting', 'Bowling']
    this.currentStatus = options[Math.floor(Math.random() * options.length)]
    return this.currentStatus
}

function HandCricket(teamOneName) {
    this.teamOne = new Team(teamOneName, 1)
    this.teamTwo = new Team('Computer Team', 1)
    this.teamOneScore = 0
    this.teamTwoScore = 0
    this.battingTeam = null
    this.bowlingTeam = null
}
HandCricket.prototype.didMatchEnded = function () {
    if (this.battingTeam.remainingBalls >= 6 || this.bowlingTeam.remainingBalls >= 6) return false
    else {
        if (this.battingTeam.score > this.bowlingTeam.score) return true
        else return false
    }
}

HandCricket.prototype.getWinner = function () {
    if (this.battingTeam.score === this.bowlingTeam.score) return false
    else {
        if (this.battingTeam.score > this.bowlingTeam.score) return this.battingTeam
        else return this.bowlingTeam
    }
}

HandCricket.prototype.check = function (number) {
    const computerNumber = this.getComputerNumber()
    console.log('Computer number is ' + computerNumber)
    this.teamTwo.currentNumber = computerNumber
    return computerNumber === number
}

HandCricket.prototype.toss = function () {
    return Math.floor(Math.random() * Math.floor(2))
}

HandCricket.prototype.getComputerNumber = function () {
    return Math.floor(Math.random() * Math.floor(6)) + 1
}

module.exports = {
    Player,
    Team,
    HandCricket
}