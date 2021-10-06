const body = document.querySelector('body');
const logo = document.querySelector('h1');
const themeText = document.querySelector('h2');
const options = document.querySelectorAll('.option');
const output = document.querySelector('.output');
const outputText = document.querySelector('.output-text');
const range = document.querySelector('.theme-input')
const range2 = document.querySelector('.theme-input-2')
const rangeTrack = document.querySelector('.secondary-theme');
const keypad = document.querySelector('.keypad');
const keys = document.querySelectorAll('.key');
const numKeys = document.querySelectorAll('.num');
const equalKey = document.querySelector('.equal-key');
const values = document.querySelectorAll('.val')
const operators = document.querySelectorAll('.operator')
const del = document.querySelector('.del')
const reset = document.querySelector('.reset-key')
let equationNums = [];
let equation;
let currNum;



//Event listeners

range.addEventListener('change', changeTheme)
range2.addEventListener('change', changeTheme)
keys.forEach(key => {
    key.addEventListener('mousedown', pressKey)
    key.addEventListener('mouseup', releaseKey)
})
numKeys.forEach(key => {
    key.addEventListener('mousedown', pressKey)
    key.addEventListener('mouseup', releaseKey)
})
values.forEach(key => {
    key.addEventListener('click', typeNum)
})
operators.forEach(key => {
    key.addEventListener('click', setOperation)
})
equalKey.addEventListener('click', parseEquation)
del.addEventListener('click', deleteKey)
reset.addEventListener('click', resetScreen)

//Updating calculator screen

function typeNum(e) {
    let num = e.target.firstElementChild.innerHTML
    outputText.innerHTML += num;
    currNum = outputText.innerHTML
}


function setOperation(e) {
    let screen = outputText.innerHTML;
    if (screen.length > 0 && screen[screen.length-1] != ' ') {
        if (e.target.id === '+') {
            outputText.innerHTML += ' + '
        } else if (e.target.id === '-') {
            outputText.innerHTML += ' - '
        } else if (e.target.id === 'x') {
            outputText.innerHTML += ' x '
        } else if (e.target.id === '/') {
            outputText.innerHTML += ' / '
        }
    } else {
        alert('Please enter a number')
    }
}

function deleteKey() {
    let screen = outputText.innerHTML.split('')
    if (screen[screen.length-1] != ' ') {
        console.log('num')
        screen.pop()
    } else {
        console.log('space')
        screen.splice([screen.length-2], 2)
    }
    outputText.innerHTML = screen.join('')
}

function resetScreen() {
    outputText.innerHTML = '';
}

//Calculate equation

function parseEquation() {
    //save equation string as variable
    equation = outputText.innerHTML
    //split equation into an array
    equation = equation.split(' ') 
    determineSteps(equation)
}

function determineSteps(eq) {
    if (equation.includes('x') || equation.includes('/')) {
        equation.forEach(el => {
            if (el === 'x') {
                multiply()
            } else if (el === '/') {
                divide()
            }
        });  
    } else if (equation.includes('+') || equation.includes('-')) {
        equation.forEach(el => {
            if (el === '+') {
                add()
            } else if (el === '-') {
                subtract()
            }
        });
    } 
    outputText.innerHTML = equation; 
}

function multiply() {
    console.log('multiply' + equation)
    let sum = parseFloat(equation[equation.indexOf('x') - 1]) * parseFloat(equation[equation.indexOf('x') + 1]);
    equation.splice(equation.indexOf('x') - 1, 3, sum)
    determineSteps(equation)
}

function divide() {
    console.log('divide' + equation)
    let sum = parseFloat(equation[equation.indexOf('/') - 1]) / parseFloat(equation[equation.indexOf('/') + 1]);
    equation.splice(equation.indexOf('/') - 1, 3, sum)
    determineSteps(equation)
}

function add() {
    console.log('add' + equation)
    let sum = parseFloat(equation[equation.indexOf('+') - 1]) + parseFloat(equation[equation.indexOf('+') + 1]);
    equation.splice(equation.indexOf('+') - 1, 3, sum)
    determineSteps(equation)
}

function subtract() {
    console.log('subtract' + equation)
    let sum = parseFloat(equation[equation.indexOf('-') - 1]) - parseFloat(equation[equation.indexOf('-') + 1]);
    equation.splice(equation.indexOf('-') - 1, 3, sum)
    determineSteps(equation)
}


//Stylistic functions

function pressKey(e) {
    if (range.value === '0') {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 2px 0 0 hsl(30, 25%, 89%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 2px 0 0 hsl(6, 63%, 50%)';
        } else {
            e.target.style.boxShadow = '0 2px 0 0 hsl(225, 21%, 49%)';
        }
    } else if (range.value === '1') {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 2px 0 0 hsl(45, 7%, 89%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 2px 0 0 hsl(25, 98%, 40%)';
        } else {
            e.target.style.boxShadow = '0 2px 0 0 hsl(185, 42%, 37%)';
        }
    } else {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 2px 0 0 hsl(268, 47%, 21%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 2px 0 0 hsl(176, 100%, 44%)';
        } else {
            e.target.style.boxShadow = '0 2px 0 0 hsl(281, 89%, 26%)';
        }
    }
}

function releaseKey(e) {
    if (range.value === '0') {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 3px 0 0 hsl(28, 16%, 65%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 3px 0 0 hsl(6, 70%, 34%)';
        } else {
            e.target.style.boxShadow = '0 3px 0 0 hsl(224, 28%, 35%)';
        }
    } else if (range.value === '1') {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 3px 0 0 hsl(35, 11%, 61%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 3px 0 0 hsl(25, 99%, 27%)';
        } else {
            e.target.style.boxShadow = '0 3px 0 0 hsl(185, 58%, 25%)';
        }
    } else {
        if (e.target.classList.contains('num')) {
            e.target.style.boxShadow = '0 3px 0 0 hsl(290, 70%, 36%)';
        } else if (e.target === equalKey) {
            equalKey.style.boxShadow = '0 3px 0 0 hsl(177, 92%, 70%)';
        } else {
            e.target.style.boxShadow = '0 3px 0 0 hsl(290, 70%, 36%)';
        }
    } 
}

function changeTheme(e) {
    if (e.target.value === '0') {
        range.classList.remove('hidden');
        range2.classList.add('hidden');
        range.value = '0';
        body.style.backgroundColor = 'hsl(222, 26%, 31%)';
        logo.style.color = 'white';
        themeText.style.color = 'white';
        rangeTrack.style.backgroundColor = 'hsl(223, 31%, 20%)'
        options.forEach(option => {
            option.style.color = 'white';
        })
        output.style.backgroundColor = 'hsl(224, 36%, 15%)';
        outputText.style.color = "white";
        keypad.style.backgroundColor = 'hsl(223, 31%, 20%)';
        keys.forEach(key => {
            key.style.backgroundColor = 'hsl(225, 21%, 49%)';
            key.style.boxShadow = '0 3px 0 0 hsl(224, 28%, 35%)';
            key.firstElementChild.style.color = 'white';
        })
        numKeys.forEach(key => {
            key.style.backgroundColor = 'hsl(30, 25%, 89%)';
            key.style.boxShadow = '0 3px 0 0 hsl(28deg 16% 65%)';
            key.firstElementChild.style.color = 'hsl(221, 14%, 31%)';
        })
        equalKey.style.backgroundColor = 'hsl(6, 63%, 50%)'
        equalKey.style.boxShadow = '0 3px 0 0 hsl(6deg 70% 34%)'

    } else if (e.target.value === '1') {
        range.classList.remove('hidden');
        range.value = '1'
        range2.classList.add('hidden');
        body.style.backgroundColor = 'hsl(0, 0%, 90%)';
        logo.style.color = 'hsl(60, 10%, 19%)'
        themeText.style.color = 'hsl(60, 10%, 19%)';
        rangeTrack.style.backgroundColor = 'hsl(0, 5%, 81%)';
        options.forEach(option => {
            option.style.color = 'hsl(60, 10%, 19%)';
        })
        output.style.backgroundColor = 'hsl(0, 0%, 93%)';
        outputText.style.color = 'hsl(60, 10%, 19%)';
        keypad.style.backgroundColor = 'hsl(0, 5%, 81%)';
        keys.forEach(key => {
            key.style.backgroundColor = 'hsl(185, 42%, 37%)';
            key.style.boxShadow = '0 3px 0 0 hsl(185, 58%, 25%)';
            key.firstElementChild.style.color = 'white';
        })
        numKeys.forEach(key => {
            key.style.backgroundColor = 'hsl(45, 7%, 89%)';
            key.style.boxShadow = '0 3px 0 0 hsl(35, 11%, 61%)';
            key.firstElementChild.style.color = 'hsl(60, 10%, 19%)';
        })
        equalKey.style.backgroundColor = 'hsl(25, 98%, 40%)';
        equalKey.style.boxShadow = '0 3px 0 0 hsl(25, 99%, 27%)'

    } else if (e.target.value === '2') {
        range.classList.add('hidden');
        range2.classList.remove('hidden');
        range2.value = '2'
        body.style.backgroundColor = 'hsl(268, 75%, 9%)';
        logo.style.color = 'hsl(52, 100%, 62%)'
        themeText.style.color = 'hsl(52, 100%, 62%)';
        rangeTrack.style.backgroundColor = 'hsl(268, 71%, 12%)';
        options.forEach(option => {
            option.style.color = 'hsl(52, 100%, 62%)';
        })
        output.style.backgroundColor = 'hsl(268, 71%, 12%)';
        outputText.style.color = 'hsl(52, 100%, 62%)';
        keypad.style.backgroundColor = 'hsl(268, 71%, 12%)';
        keys.forEach(key => {
            key.style.backgroundColor = 'hsl(281, 89%, 26%)';
            key.style.boxShadow = '0 3px 0 0 hsl(285, 91%, 52%)';
            key.firstElementChild.style.color = 'white';
        })
        numKeys.forEach(key => {
            key.style.backgroundColor = 'hsl(268, 47%, 21%)';
            key.style.boxShadow = '0 3px 0 0 hsl(290, 70%, 36%)';
            key.firstElementChild.style.color = 'hsl(52, 100%, 62%)';
        })
        equalKey.style.backgroundColor = 'hsl(176, 100%, 44%)';
        equalKey.style.boxShadow = '0 3px 0 0 hsl(177, 92%, 70%)'
    }
}
