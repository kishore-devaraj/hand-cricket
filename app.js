'use strict'
const readlineSync = require('readline-sync')
const { Player, Team, HandCricket } = require('./models')

const handCricket = new HandCricket('Player Team')
const toss = Number(readlineSync.question('Toss time! Choose either 0 or 1: '))

if (!isInputValid(toss)) return
handCricket.tossWon = handCricket.toss() === toss ? true : false
if (handCricket.tossWon) {
    console.log('Toss Won')
    let chooseTo = Number(readlineSync.question('\'Batting\' or \'Bowling\' ? Choose either 0 or 1: '))

    if (!isInputValid(chooseTo)) return
    chooseTo = chooseTo === 0 ? 'Batting' : 'Bowling'
    handCricket.battingTeam = chooseTo === 'Batting' ? handCricket.teamOne : handCricket.teamTwo
    handCricket.bowlingTeam = chooseTo === 'Batting' ? handCricket.teamTwo : handCricket.teamOne

    console.log('You have chosen to ' + chooseTo)
} else {
    console.log('Toss Lost')
    const computerChooseTo = handCricket.teamTwo.teamChooseTo()
    handCricket.battingTeam = computerChooseTo === 'Batting' ? handCricket.teamTwo : handCricket.teamOne
    handCricket.bowlingTeam = computerChooseTo === 'Batting' ? handCricket.teamOne : handCricket.teamTwo
    console.log('Computer choose to: ' + computerChooseTo)
}


let playCricket = true
while (playCricket) {
    console.log('*****************************************************************')
    console.log(`${handCricket.battingTeam.teamName} is Batting!`)
    // console.log(`${handCricket.battingTeam}`)
    // console.log(typeof handCricket.battingTeam.remainingBalls)

    while (handCricket.battingTeam.remainingBalls !== 0) {
        console.log(`${handCricket.battingTeam.remainingBalls} balls remaining`)
        console.log(`Score: ${handCricket.battingTeam.score}`)
        const userInput = getInputFromUser()
        if (handCricket.check(userInput)) {
            handCricket.battingTeam === handCricket.teamOne ? console.log('You are OUT!')
                : console.log('You have taken the wicket')
            handCricket.battingTeam.remainingBalls = 0
            break
        } else {
            const score = userInput + handCricket.teamTwo.currentNumber
            handCricket.battingTeam.score += score
            handCricket.battingTeam.remainingBalls = handCricket.battingTeam.remainingBalls - 1
        }

        // Checking whether the match is ended and declaring the winner
        if (handCricket.didMatchEnded()) {
            const winner = handCricket.getWinner()
            if (!winner) console.log('It\'s is Tie')
            else console.log(`${winner.teamName} is Winner!`)
        }
    }

    console.log(`${handCricket.battingTeam.teamName}\'s Final Score: ${handCricket.battingTeam.score}`)
    handCricket.battingTeam = handCricket.battingTeam === handCricket.teamOne ? handCricket.teamTwo : handCricket.teamOne
    handCricket.battingTeam = handCricket.battingTeam === handCricket.teamOne ? handCricket.teamOne : handCricket.teamTwo

    playCricket = handCricket.teamOne.remainingBalls === 0 && handCricket.teamTwo.remainingBalls === 0 ?
        false : true
}



// Helper function
function isInputValid(input) {
    if (input !== 1 && input !== 0) {
        console.log('Wrong Input. It should be called either 0 or 1')
        return false
    }
    return true
}

function getInputFromUser() {
    const input = Number(readlineSync.question('Enter the number from 1 - 6? :'))
    if ([1, 2, 3, 4, 5, 6].indexOf(input) !== -1) {
        return input
    } else {
        console.log('Invalid input, Try again')
        getInputFromUser()
    }
}


