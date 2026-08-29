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