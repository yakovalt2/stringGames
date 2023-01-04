/* FOR THE PALINDROMES */

var palindromeText = document.querySelector('.the-palindrome')
var getPalindromeBtn = document.querySelector('.get-palindrome')
var isPalindromeBtn = document.querySelector('.is-palindrome')
var isPalindromeYesNo = document.querySelector('.yes-no')

/* FOR THE CLOCK */

var dateEl = document.querySelector('.date')
var timeEl = document.querySelector('.time')

/* FOR THE QUOTES */

var btnQuotes = document.querySelector('.get-quote')
var divQuotes = document.querySelector('.the-quote')

/* PALINDROMES */

function showPalindrome() {
    palindromeText.value = palindromes[getRandom(palindromes.length)]
}

function checkPalindrome() {

    var pal = palindromeText.value.replace(/[\s,\.!\-_;:\'’\"\?]/g, "").replace('ך', 'כ').replace('ם', 'מ').replace('ן', 'נ').replace('ף', 'פ').replace('ץ', 'צ').toLowerCase()

    console.log("pal: ", pal)
    console.log('pal.split("").reverse().join("" ): ', pal.split("").reverse().join(""))

    if (pal.length === 0) isPalindromeYesNo.innerText = "Empty"
    else {
        if (pal === pal.split("").reverse().join("")) isPalindromeYesNo.innerText = "Yes!"
        else isPalindromeYesNo.innerText = "No:("
    }
}

/* CLOCK */

function getClock() {
    var dateTime = new Date()

    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday']

    /* Example of passing reference to the object to the function
    var time = {}
    timeEl.innerText = setAMPM(dateTime.getHours(), time) + ":" + addZero(dateTime.getMinutes()) 
    + ":" + addZero(dateTime.getSeconds()) + " " + time.ampm */

    var ampm

    dateEl.innerText = weekDays[dateTime.getDay()] + " | " + dateTime.getDate()
        + "/" + addZero(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear()

    timeEl.innerText = setAMPM(dateTime.getHours()) + ":" + addZero(dateTime.getMinutes())
        + ":" + addZero(dateTime.getSeconds()) + " " + ampm


    // JavaScript passes variables into functions BY VALUE (not BY REFERENCE),
    // so we cannot change variables of primitive datatypes
    // but ANYWAY object variables contain REFERENCE,
    // so we can change inside of the objects,
    // but not the reference itself
    function setAMPM(hour) {
        // Now SCOPE CHAIN includes the GLOBAL SCOPE
        //                          the SCOPE of getClock()
        //                      and the SCOPE of setAMPM()

        if (hour < 12) {
            ampm = 'AM'
            return hour
        } else if (hour === 12) {
            ampm = "PM"
            return hour
        } else {
            /* Example of passing reference to the object to the function
            timeToChange.ampm = "PM"*/
            ampm = "PM"
            return hour - 12
        }
    }

    // asynchronous function - waiting for some moment to be executed
    setTimeout(getClock, 500)
}

function addZero(num) {
    if (num < 10) return "0" + num
    else return num
}

/* QUOTES */

function getQuote() {
    divQuotes.innerHTML = quotes[getRandom(quotes.length)]
}


/* Get Random Num */
// Gets random number from 0 to max - 1 (max = array length)
function getRandom(max) {
    return Math.floor(Math.random() * max);
}

/* All the Listeners */
getPalindromeBtn.addEventListener('click', showPalindrome)
isPalindromeBtn.addEventListener('click', checkPalindrome)
btnQuotes.addEventListener('click', getQuote)


window.onload = function () {
    getClock()
    showPalindrome()
}

/* ANAGRAM */

var anagram = document.getElementById('anagram')
var anagramButton = document.querySelector('.new-anagram')
var yourTry = document.getElementById('your-anagram')
var checkAnagramButton = document.querySelector('.check-anagram')
var rightAnagram = document.getElementById('right_anagram')

function getRightAnagram(word) {
    let buf = [];
    for (let i = 0; i < anagrams.length; i++) {
        if (word.length == anagrams[i].length) {
            let str1 = word.split('').sort().join('');
            let str2 = anagrams[i].split('').sort().join('');
            if (str1 === str2 && word != anagrams[i]) buf.push(anagrams[i]);
        }
    }
    return buf;
}


anagramButton.addEventListener('click', (e) => {
    anagram.value = anagrams[getRandom(anagrams.length)]
})

function showPraiseOrReproval() {
    rightAnagram.innerHTML = getRightAnagram(anagram.value);
    if (getRightAnagram(anagram.value).includes(yourTry.value)) rightAnagram.innerHTML += ". " + praises[getRandom(praises.length)];
    else if (yourTry.value == "") rightAnagram.innerHTML += "";
    else rightAnagram.innerHTML += ". Sorry, you're wrong!";
}

checkAnagramButton.addEventListener('click', e => showPraiseOrReproval())


/* WORD GAMES*/

let masterWord = document.querySelector(".master-word") //для masterword
let startGameButton = document.querySelector(".start-game");
let yourWordsInput = document.querySelector(".your-words");
let yourWordsDiv = document.querySelector('.y-words-div')
let checkTheWords = document.querySelector(".check-words")
let myWords = document.querySelector(".comp-words")
let myWordsDiv = document.querySelector('.c-words-div')
let yourPoints = document.querySelector('.your-points')
let myPoints = document.querySelector('.comp-points')

//функция по кнопке start 
function start() {
    yourWordsInput.value = ''
    yourWordsInput.style = 'display:inline-block;';
    myWords.style = 'display:inline-block';
    yourWordsDiv.style = 'display:none';
    myWordsDiv.style = 'display:none;';
    //обнуляем очки
    myPoints.innerHTML = 0;
    yourPoints.innerHTML = 0;

    //выбираем masterWord из vocab, если слово длиннее 6 символов
    for (let i = 0; i < vocab.length; i++) {
        let randomWord = vocab[getRandom(vocab.length)];
        if (randomWord.length >= 6 && randomWord != masterWord.value) { masterWord.value = randomWord; break; }
    }
}


function getUniqueLetters(str) {
    let arr = [...new Set(str.split(''))];
    return arr;
}

startGameButton.addEventListener('click', e => start());
yourWordsInput.addEventListener('input', e => {
})

checkTheWords.addEventListener('click', e => {
    myWords.value = ''
    yourWordsDiv.innerHTML = '';
    myWordsDiv.innerHTML = '';
    yourWordsInput.style = 'display:none';
    yourWordsDiv.style = 'display:inline-block;';
    myWords.style = 'display:none';
    myWordsDiv.style = 'display:inline-block;';
    let yourWords = yourWordsInput.value.split(/\n/);


    let rightWords = [];
    for (let i = 0; i < vocab.length; i++) {
        if (vocab[i].length <= masterWord.value.length && vocab[i] != masterWord.value) {
            let matches = 0;
            for (let k = 0; k < getUniqueLetters(vocab[i]).length; k++) {
                if (getUniqueLetters(masterWord.value).includes(getUniqueLetters(vocab[i])[k])) matches += 1;
            }
            if (matches >= 4) rightWords.push(vocab[i]);
        }
    }
    let points = 0;



    //проверка введенных пользователем слов
    let yourWordsStr;
    for (let i = 0; i < yourWords.length; i++) {
        let f = 0;
        if (!rightWords.includes(yourWords[i])) {
            for (let k = 0; k < yourWords[i].length; k++) if (getUniqueLetters(masterWord.value).includes(yourWords[i][k])) f += 1;
            if (f >= 4) {
                for (let k = 0; k < yourWords[i].length; k++) {
                    if (!getUniqueLetters(masterWord.value).includes(yourWords[i][k]))
                        yourWordsDiv.innerHTML += '<span class="red">' + yourWords[i][k] + '</span>';
                    else
                        yourWordsDiv.innerHTML += yourWords[i][k];
                }
                yourWordsDiv.innerHTML += ' ' + yourWords[i].length + '<br>';
                points += yourWords[i].length;
            }
            else {
                for (let k = 0; k < yourWords[i].length; k++) {
                    if (!getUniqueLetters(masterWord.value).includes(yourWords[i][k]))
                        yourWordsDiv.innerHTML += '<span class="red">' + yourWords[i][k] + '</span>';
                    else
                        yourWordsDiv.innerHTML += yourWords[i][k];
                }
                yourWordsDiv.innerHTML += '<br>';
            }
        }
        else yourWordsDiv.innerHTML += '<s>' + yourWords[i] + ' 0</s><br>'


    }
    yourPoints.innerHTML = points;



    points = 0;
    for (let i = 0; i < rightWords.length; i++) {
        if (yourWords.includes(rightWords[i])) {
            myWordsDiv.innerHTML += '<s>' + rightWords[i] + ' 0</s><br>';
        }
        else {
            myWordsDiv.innerHTML += rightWords[i] + ' ' + rightWords[i].length + '<br>';
            points += rightWords[i].length;
        }
    }
    myPoints.innerHTML = points;

})


/* FOR GEMATRIA */

let gemInput = document.querySelector('.gem-input');
let gemButton = document.querySelector('.gem-calc');
let gemRes = document.querySelector('.res-calc');
let alphabet = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת']
let gemArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 40, 50, 50, 60, 70, 80, 80, 90, 90, 100, 200, 300, 400]


function getGem(str) {
    let res = 0;
    let arr = str.split('')
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < 25; k++) if (arr[i] == alphabet[k]) res += gemArr[k];
    }
    return res;
}

gemButton.addEventListener('click', e => {
    gemRes.innerHTML = getGem(gemInput.value)
    console.log(getGem(gemInput.value))
})

