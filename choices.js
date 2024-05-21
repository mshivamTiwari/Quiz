const questionEl = document.getElementById('question');
const choiceElements = Array.from(document.querySelectorAll('.choice-btn'));
const progressTextEl = document.getElementById('progressText');
const scoreTextEl = document.getElementById('score');
const progressBarFullEl = document.getElementById('progressBarFull');

let currentQ = {};
let isAcceptingAnswers = false;
let currentScore = 0;
let questionCount = 0;
let remainingQuestions = [];

const quizQuestions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answerIndex: 2,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answerIndex: 3,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['//', '', '/**/', '<!>'],
        answerIndex: 1,
    },
];

const MAX_QUESTIONS = 3;

const startQuiz = () => {
    questionCount = 0;
    currentScore = 0;
    remainingQuestions = [...quizQuestions];
    fetchNewQuestion();
};

const fetchNewQuestion = () => {
    if (remainingQuestions.length === 0 || questionCount >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', currentScore);
        return window.location.assign('end.html');
    }

    questionCount++;
    progressTextEl.innerText = `Question ${questionCount}/${MAX_QUESTIONS}`;
    progressBarFullEl.style.width = `${(questionCount / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQ = remainingQuestions[questionIndex];
    questionEl.innerText = currentQ.question;

    choiceElements.forEach((choice, index) => {
        choice.querySelector('.choice-text').innerText = currentQ.choices[index];
        choice.classList.remove('correct', 'incorrect');
    });

    remainingQuestions.splice(questionIndex, 1);
    isAcceptingAnswers = true;
};

const handleChoiceClick = (e) => {
    if (!isAcceptingAnswers) return;

    isAcceptingAnswers = false;
    const selectedChoice = e.target.closest('.choice-btn');
    const selectedAnswerIndex = parseInt(selectedChoice.querySelector('.choice-text').dataset.number) - 1;

    const classToApply = selectedAnswerIndex === currentQ.answerIndex ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        updateScore(10);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        fetchNewQuestion();
    }, 1000);
};

const updateScore = (num) => {
    currentScore += num;
    scoreTextEl.innerText = currentScore;
    localStorage.setItem('mostRecentScore', currentScore);
};

choiceElements.forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
});

startQuiz();
