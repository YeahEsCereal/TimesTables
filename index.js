const scoreDisplay = document.querySelector('#score')
let score = 0
let questionsAmount = 0
let cTime = 60
let question
let answer
let correct = new Audio('hitTheButtonRemake/cor.mp3')
let incorrect = new Audio('hitTheButtonRemake/incor.mp3')
let finish = new Audio('hitTheButtonRemake/end.mp3')

function timesTable(number) {
    let lastQuestion = 'h'
    document.querySelector('.selectTable').style.display = 'none'
    document.querySelector('.game').style.display = 'block'
    listy = [1, 2, 3, 4]
    document.querySelectorAll('#btn1').forEach(function(btn) {
        btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
        index = listy.indexOf(parseInt(btn.innerHTML));
        if (index > -1) {
            listy.splice(index, 1);
        }
        if (number != 'mixed') {
            btn.innerHTML = eval(btn.innerHTML) * number;
        }
    })
    listy = [5, 6, 7, 8]
    document.querySelectorAll('#btn2').forEach(function(btn) {
        btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
        index = listy.indexOf(parseInt(btn.innerHTML));
        if (index > -1) {
            listy.splice(index, 1);
        }
        if (number != 'mixed') {
            btn.innerHTML = eval(btn.innerHTML) * number;
        }
    })
    listy = [9, 10, 11, 12]
    document.querySelectorAll('#btn3').forEach(function(btn) {
        btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
        index = listy.indexOf(parseInt(btn.innerHTML));
        if (index > -1) {
            listy.splice(index, 1);
        }
        if (number != 'mixed') {
            btn.innerHTML = eval(btn.innerHTML) * number;
        }
    })
    startTimer()
    questions(number, lastQuestion)
}

function startTimer() {
    document.querySelector('#time').innerHTML = 'Time: ' + formatTime(cTime);
    cTime -= 1
    timerInterval = setInterval(() => {
        document.querySelector('#time').innerHTML = 'Time: ' + formatTime(cTime);
        cTime -= 1
    }, 1000)
}

function formatTime(time) {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60);

    if (seconds == 0 && minutes == 0) {
        clearInterval(timerInterval)
        stopGame()
        return '0:00'
    }

    return minutes + ':' + ((seconds > 9) ? seconds : '0' + seconds);
}

function questions(timesTablea, lastQuestion) {
    question = randomQuestion(timesTablea);
    while (question == lastQuestion) {
        question = randomQuestion(timesTablea);
    }
    answer = [];
    for (let i = 0; i < question.length + 1; i++) {
        splitQues = question.split('')
        char = splitQues[i]
        switch (splitQues[i]) {
            case "x":
                char = "*"
        }
        answer.push(char)
    }
    answer = eval(answer.join(''))
    lastQuestion = question;
    button(question, answer, lastQuestion, timesTablea)
}

function button(question, answer, lastQuestion, timesTablea) {
    document.querySelector('#question').innerHTML = question + '=?';
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.onclick = () => {
            if (btn.innerHTML == answer) {
                addToScore(1);
                questions(timesTablea, lastQuestion);
            } else {
                addToScore('Question');
            }
        }
    })
}

function randomQuestion(timesTable) {
    let num1;
    let num2;
    let numberF = Math.floor(Math.random() * 2);
    if (timesTable != 'mixed') {
        if (numberF == 1) {
            num1 = timesTable;
            num2 = Math.floor(Math.random() * 12) + 1;
        } else {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = timesTable;
        }
    } else {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        listy = [1, 2, 3, 4]
        document.querySelectorAll('#btn1').forEach(function(btn) {
            btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
            index = listy.indexOf(parseInt(btn.innerHTML));
            if (index > -1) {
                listy.splice(index, 1);
            }
            btn.innerHTML = eval(btn.innerHTML) * num1;
        })
        listy = [5, 6, 7, 8]
        document.querySelectorAll('#btn2').forEach(function(btn) {
            btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
            index = listy.indexOf(parseInt(btn.innerHTML));
            if (index > -1) {
                listy.splice(index, 1);
            }
            btn.innerHTML = eval(btn.innerHTML) * num1;
        })
        listy = [9, 10, 11, 12]
        document.querySelectorAll('#btn3').forEach(function(btn) {
            btn.innerHTML = listy[Math.floor(Math.random() * listy.length)]
            index = listy.indexOf(parseInt(btn.innerHTML));
            if (index > -1) {
                listy.splice(index, 1);
            }
            btn.innerHTML = eval(btn.innerHTML) * num1;
        })
    }
    return num1 + 'x' + num2;
}

function addToScore(number) {
    if (number != 'Question') {
        score += number
        questionsAmount += 1
        correct.load()
        correct.play()
    } else {
        questionsAmount += 1
        incorrect.load()
        incorrect.play()
    }
    scoreDisplay.innerHTML = 'Score: ' + score + '/' + questionsAmount;
}

function stopGame() {
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.selectTable').style.display = 'none';
    document.querySelector('.results').style.display = 'block';
    document.querySelector('#result').innerHTML = 'Score: ' + score + '/' + questionsAmount;
    finish.load()
    finish.play()
}
