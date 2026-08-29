// ============================
// 1. Question class
// ============================

class Question {
  constructor(text, options, correctIndex, level) {
    this.text = text;
    this.options = options; 
    this.correctIndex = correctIndex; 
    this.level = level; 
  }

  checkAnswer(selectedIndex) {
    return selectedIndex === this.correctIndex;
  }
}


// ============================
// 2. Quiz class
// ============================

class Quiz {
  constructor(questions) {
    this.questions = questions;    
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];         
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  getTotal() {
    return this.questions.length;
  }

  // This section records the answer for the current question and updates the score.
  submitAnswer(selectedIndex) {
    const question = this.getCurrentQuestion();
    const wasCorrect = question.checkAnswer(selectedIndex);

    if (wasCorrect) this.score++;

    this.userAnswers.push({ selectedIndex, wasCorrect });
    return wasCorrect;
  }

  nextQuestion() {
    this.currentIndex++;
  }

  isComplete() {
    return this.currentIndex >= this.questions.length;
  }

  getScore() {
    return this.score;
  }

  getPercentage() {
    return Math.round((this.score / this.getTotal()) * 100);
  }
}

// ============================
// 3. Question data
// ============================

const rawQuestions = [
  // --- Easy questions---
  { text: "Which car brand is known for their relaibility?", options: ["Jaguar", "Ford", "Toyota", "Fiat"], correctIndex: 2, level: "Easy" },
  { text: "What does 'SUV' stand for?", options: ["Super Utility Vehicle", "Sport Utility Vehicle", "Standard Urban Van", "Sport Urban Vehicle"], correctIndex: 1, level: "Easy" },
  { text: "How many seats does the average vehicle have", options: ["7 Seats", "4 Seats", "5 Seats", "3 Seats"], correctIndex: 2, level: "Easy" },

   // --- Medium questions ---
   { text: "What brand is known for thier GT3 Rs models?", options: ["Porche", "Mercedes", "BMW", "Buggati"], correctIndex: 1, level: "Medium" },
   { text: "Which JDM car is known as the 'Godzilla' in motorsport circles?", options: ["Toyota Supra", "Nissan Skyline GT-R (R34)", "Mazda RX-7", "Subaru WRX"], correctIndex: 1, level: "Medium" },
   { text: "What is the most popular powertrain for everday normal vehicles?", options: ["All Wheel Drive", "Front Wheel Drive", "Rear Wheel Drive", "4 Wheel Drive"], correctIndex: 1, level: "Medium" },
   { text: "What powertrain is traditionaly used to initiate a drift?", options: ["FWD", "RWD", "AWD", "4WD"], correctIndex: 1, level: "Medium" },

   // --- Hard questionns ---
   { text: "Which Sports car brand is known for building The Ultimate Driving Machine and providing Sheer Driving Pleasure", options: ["Bugatti Chiron Super Sport 300+", "Koenigsegg Jesko", "BMW", "SSC Tuatara"], correctIndex: 2, level: "Difficult" },
   { text: "What is the primary advantage of a dual-clutch transmission (DCT)?", options: ["Lower cost", "Near-instant gear changes", "Better fuel economy only", "No clutch pedal needed in manuals"], correctIndex: 1, level: "Difficult" },
   { text: "Which engine layout is used in the BMW M3 Competion", options: ["Naturally Aspirated V-8", "Turbo Inline 4", "Twin Turbo Straight 6", "VR6"], correctIndex: 2, level: "Difficult" },
];

const questions = rawQuestions.map(
  q => new Question(q.text, q.options, q.correctIndex, q.level)
);

const quiz = new Quiz(questions);


// ============================
// 4. DOM references
// ============================
const levelBadge = document.getElementById("level-badge");
const questionTracker = document.getElementById("question-tracker");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionCards = document.querySelectorAll(".option-card");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const finalScore = document.getElementById("final-score");
const feedbackMessage = document.getElementById("feedback-message");

let selectedIndex = null; 
// tracks the option the user clicked, before confirming
