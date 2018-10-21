'use strict'
const readlineSync = require('readline-sync')
const { Player, Team, HandCricket } = require('./models')

const handCricket = new HandCricket('Player Team')
const toss = Number(readlineSync.question('Toss time! Choose either 0 or 1: '))

if (!isInputValid(toss)) return
handCricket.tossWon = handCricket.toss() === toss ? true : false
if (handCricket.tossWon) {
    console.log('Toss Won')
    const chooseTo = Number(readlineSync.question('\'Batting\' or \'Bowling\' ? Choose either 0 or 1: '))
    
    if (!isInputValid(chooseTo)) return
    handCricket.teamOne.currentStatus = [Number(chooseTo)] === 0 ? 'Bowling' : 'Batting'
    console.log('You have chosen to ' + handCricket.teamOne.currentStatus)
} else {
    console.log('Toss Lost')
    console.log('Computer choose to: ' + handCricket.teamTwo.teamChooseTo())
}



// Helper function
function isInputValid(input) {
    if (input !== 1 && input !== 0) {
        console.log('Wrong Input. It should be called either 0 or 1')
        return false
    }
    return true
}


