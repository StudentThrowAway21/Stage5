const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={};
let acceptingAnswers = true;
let score=0;
let questionCounter = 0;
let availableQuestions = [];

let questions = 
[ 
    {
        question: "Κατά την Ιλιάδα ποιος σκότωσε τον Πάτροκλο;",
        choice1: "Αχιλλέας",
        choice2: "Έκτορας",
        choice3: "Πάρης",
        choice4: "Οδυσσέας",
        answer: 2,
    },
    {
        question: "Ποια ήταν η σύζυγος του Άδη;",
        choice1: "Περσεφόνη",
        choice2: "Ευρυδίκη",
        choice3: "Μινθώ",
        choice4: "Ιφιγένεια",
        answer: 1,
    },
    {
        question: "Πόσες ήταν οι Ερινύες;",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "Αμέτρητες",
        answer: 2,
    },
    {
        question: "Ποιος ήταν ο Σίσυφος;",
        choice1: "Γιος του Ποσειδώνα και της Αρέθουσας.",
        choice2: "Ο βασιλιάς της Αιγύπτου.",
        choice3: "Ένας ανθρωπομορφισμός του μίσους και του φθόνου.",
        choice4: "Ο ιδρυτής και βασιλιάς της αρχαίας Κορίνθου.",
        answer: 4,
    }

]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length ==0 || questionCounter>MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('endgame.html');
    }
    questionCounter++;
    //console.log(questionCounter);
    progressText.innerText = `Ερώτηση ${questionCounter} από τις ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];

    })
    availableQuestions.splice(questionsIndex,1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selecteAnswer = selectedChoice.dataset['number'];

        let classToApply = selecteAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply == 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
    })
})

incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
}

startGame();
