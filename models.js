'use strict'

function Player (name) {
    this.name = name
    this.score = 0
    this.ballsFaced = 0
}

function Team (teamName, teamSize) {
    this.teamName = teamName
    this.teamScore = 0
    this.totalPlayers = teamSize
    this.players = new Array(this.totalPlayers)
}

Team.prototype.teamChooseTo = function () {
    const options = ['Batting', 'Bowling']
    this.currentStatus =  options[Math.floor(Math.random() * options.length)]
    return this.currentStatus
}

function HandCricket (teamOneName) {
    this.teamOne = new Team(teamOneName, 1)
    this.teamTwo = new Team('Computer Team', 1)
    this.teamOneScore = 0
    this.teamTwoScore = 0
    this.teamOneBallsRemaining = 6
    this.teamTwoBallsRemaining = 6
}

HandCricket.prototype.toss = function () {
    return Math.floor(Math.random() * Math.floor(2))
}




module.exports = {
    Player,
    Team,
    HandCricket
}