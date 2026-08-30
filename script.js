/* ---------------------------------------------------------
   1. Question
--------------------------------------------------------- */
class Question {
  constructor(text, options, correctIndex, level) {
    this.text = text;
    this.options = options;        // array of 4 strings
    this.correctIndex = correctIndex;
    this.level = level;            // 'Easy' | 'Medium' | 'Difficult'
  }

  isCorrect(selectedIndex) {
    return selectedIndex === this.correctIndex;
  }

  getCorrectAnswerText() {
    return this.options[this.correctIndex];
  }
}

/* ---------------------------------------------------------
   2. Quiz
--------------------------------------------------------- */
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = []; // { selectedIndex, correct }
  }

  get total() {
    return this.questions.length;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  submitAnswer(selectedIndex) {
    const question = this.getCurrentQuestion();
    const correct = question.isCorrect(selectedIndex);
    if (correct) this.score += 1;
    this.answers.push({ selectedIndex, correct });
    return correct;
  }

  advance() {
    this.currentIndex += 1;
  }

  isFinished() {
    return this.currentIndex >= this.total;
  }

  getPercentage() {
    return Math.round((this.score / this.total) * 100);
  }
}

/* ---------------------------------------------------------
   PLACEHOLDER QUESTION BANK
   Chiwo swap this out with your own questions.
--------------------------------------------------------- */
const QUESTION_BANK = [
  // Easy (4)
  new Question('Which car brand uses a three-pointed star as its logo?', ['BMW', 'Mercedes-Benz', 'Audi', 'Bentley'], 1, 'Easy'),
  new Question('What does "SUV" stand for?', ['Sport Utility Vehicle', 'Super Urban Van', 'Standard Utility Vehicle', 'Sport Universal Van'], 0, 'Easy'),
  new Question('Which fuel is used in a diesel engine?', ['Petrol', 'Diesel', 'Ethanol', 'Propane'], 1, 'Easy'),
  new Question('Which car brand is known for the Mustang?', ['Chevrolet', 'Dodge', 'Ford', 'Toyota'], 2, 'Easy'),

  // Medium (3)
  new Question('What year was the first Volkswagen Beetle produced?', ['1938', '1948', '1958', '1968'], 0, 'Medium'),
  new Question('Which company manufactures the Corvette?', ['Ford', 'Chevrolet', 'Dodge', 'Pontiac'], 1, 'Medium'),
  new Question('What does "RPM" measure in an engine?', ['Fuel efficiency', 'Revolutions per minute', 'Road pressure metric', 'Ride performance mode'], 1, 'Medium'),

  // Difficult (3)
  new Question('Which hypercar held the production car speed record set in 2019?', ['Bugatti Chiron', 'Koenigsegg Agera RS', 'Hennessey Venom F5', 'SSC Tuatara'], 0, 'Difficult'),
  new Question('What type of engine layout does a Porsche 911 traditionally use?', ['Front-engine', 'Mid-engine', 'Rear-engine', 'Inline'], 2, 'Difficult'),
  new Question('Which motorsport event is known as "The Greatest Spectacle in Racing"?', ['Le Mans 24 Hours', 'Monaco Grand Prix', 'Indianapolis 500', 'Dakar Rally'], 2, 'Difficult'),
];

/* ---------------------------------------------------------
   3. QuizFlow — controller for quiz.html
--------------------------------------------------------- */
class QuizFlow {
  constructor(questions) {
    this.quiz = new Quiz(questions);
    this.answerLocked = false;

    this.dom = {
      quizScreen: document.getElementById('quiz-screen'),
      resultsScreen: document.getElementById('results-screen'),
      levelBadge: document.getElementById('level-badge'),
      questionTracker: document.getElementById('question-tracker'),
      progressBar: document.getElementById('progress-bar'),
      questionText: document.getElementById('question-text'),
      optionCards: Array.from(document.querySelectorAll('#answer-options .option-card')),
      nextBtn: document.getElementById('next-btn'),
      finalScore: document.getElementById('final-score'),
      feedbackMessage: document.getElementById('feedback-message'),
    };

    // Pull theme colors straight from the CSS custom properties
    // so feedback stays visually consistent with style.css.
    const rootStyles = getComputedStyle(document.documentElement);
    this.colors = {
      primaryRed: rootStyles.getPropertyValue('--primary-red').trim() || '#E53E3E',
      border: rootStyles.getPropertyValue('--border-color').trim() || '#FED7D7',
      success: '#38A169',      // green, not in the current palette — used for correct feedback
      successTint: '#F0FFF4',
      dangerTint: '#FFF5F5',
    };

    this.injectScoreBadge();
    this.injectReviewContainer();
    this.bindEvents();
  }

  /* ---- one-time DOM setup that doesn't require editing quiz.html ---- */

  injectScoreBadge() {
    const badge = document.createElement('span');
    badge.id = 'score-badge';
    badge.className = 'logo';
    badge.style.fontSize = '1.1rem';
    badge.style.background = this.colors.border;
    badge.style.padding = '0.3rem 0.8rem';
    badge.style.borderRadius = '20px';
    badge.textContent = 'Score: 0';
    this.dom.questionTracker.insertAdjacentElement('afterend', badge);
    this.dom.scoreBadge = badge;
  }

  injectReviewContainer() {
    const wrapper = document.createElement('div');
    wrapper.id = 'review-list';
    wrapper.style.marginTop = '2rem';
    wrapper.style.textAlign = 'left';
    wrapper.style.display = 'grid';
    wrapper.style.gap = '0.75rem';
    this.dom.feedbackMessage.insertAdjacentElement('afterend', wrapper);
    this.dom.reviewList = wrapper;
  }

  bindEvents() {
    this.dom.optionCards.forEach((card, i) => {
      card.addEventListener('click', () => this.handleAnswer(i));
    });
    this.dom.nextBtn.addEventListener('click', () => this.handleNext());
  }

  /* ---- rendering ---- */

  start() {
    this.renderQuestion();
  }

  renderQuestion() {
    const question = this.quiz.getCurrentQuestion();
    this.answerLocked = false;

    this.dom.levelBadge.textContent = `Level: ${question.level}`;
    this.dom.questionTracker.textContent = `Question ${this.quiz.currentIndex + 1} of ${this.quiz.total}`;
    this.dom.scoreBadge.textContent = `Score: ${this.quiz.score}`;
    this.dom.questionText.textContent = question.text;

    const progressPct = (this.quiz.currentIndex / this.quiz.total) * 100;
    this.dom.progressBar.style.width = `${progressPct}%`;

    this.dom.optionCards.forEach((card, i) => {
      const textEl = card.querySelector('.option-text');
      textEl.textContent = question.options[i];
      card.style.borderColor = '';
      card.style.backgroundColor = '';
      card.style.cursor = 'pointer';
      card.classList.remove('option-card--locked');
    });

    this.dom.nextBtn.disabled = true;
    this.dom.nextBtn.textContent =
      this.quiz.currentIndex === this.quiz.total - 1 ? 'See Results' : 'Next Question';

    // retrigger the fade-in animation on the swapped-in question
    this.dom.quizScreen.classList.remove('fade-in');
    void this.dom.quizScreen.offsetWidth; // force reflow so the animation restarts
    this.dom.quizScreen.classList.add('fade-in');
  }

  handleAnswer(selectedIndex) {
    if (this.answerLocked) return;
    this.answerLocked = true;

    const question = this.quiz.getCurrentQuestion();
    this.quiz.submitAnswer(selectedIndex);

    this.dom.optionCards.forEach((card, i) => {
      card.classList.add('option-card--locked');
      card.style.cursor = 'default';
      if (i === question.correctIndex) {
        card.style.borderColor = this.colors.success;
        card.style.backgroundColor = this.colors.successTint;
      } else if (i === selectedIndex) {
        card.style.borderColor = this.colors.primaryRed;
        card.style.backgroundColor = this.colors.dangerTint;
      }
    });

    this.dom.scoreBadge.textContent = `Score: ${this.quiz.score}`;
    this.dom.nextBtn.disabled = false;
  }

  handleNext() {
    this.quiz.advance();
    if (this.quiz.isFinished()) {
      this.showResults();
    } else {
      this.renderQuestion();
    }
  }

  /* ---- results ---- */

  showResults() {
    this.dom.progressBar.style.width = '100%';
    this.dom.quizScreen.style.display = 'none';
    this.dom.resultsScreen.style.display = '';
    this.dom.resultsScreen.classList.add('fade-in');

    const pct = this.quiz.getPercentage();
    this.dom.finalScore.textContent = `You scored ${this.quiz.score} out of ${this.quiz.total} (${pct}%)`;
    this.dom.feedbackMessage.textContent = this.getFeedback(pct);

    this.dom.reviewList.innerHTML = this.quiz.questions
      .map((q, i) => {
        const answer = this.quiz.answers[i];
        const yourAnswer = answer.selectedIndex >= 0 ? q.options[answer.selectedIndex] : 'No answer';
        const border = answer.correct ? this.colors.success : this.colors.primaryRed;
        const correctLine = answer.correct
          ? ''
          : `<br><span style="color:${this.colors.success}; font-weight:600;">Correct answer: ${q.getCorrectAnswerText()}</span>`;
        return `
          <div style="border-left: 4px solid ${border}; background:#fff; border-radius:8px; padding:0.9rem 1rem; box-shadow: var(--shadow-sm);">
            <strong>${i + 1}. ${q.text}</strong><br>
            <span style="color:${answer.correct ? this.colors.success : this.colors.primaryRed};">Your answer: ${yourAnswer}</span>
            ${correctLine}
          </div>
        `;
      })
      .join('');
  }

  getFeedback(pct) {
    if (pct === 100) return 'Perfect score — true gearhead status confirmed!';
    if (pct >= 80) return 'Great run — you really know your cars.';
    if (pct >= 50) return 'Solid effort. A rematch could push that higher.';
    return 'Rough round — hit Try Again and give it another shot.';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const isQuizPage = document.getElementById('quiz-screen');
  if (!isQuizPage) return;

  const params = new URLSearchParams(window.location.search);
  const requestedLevel = (params.get('level') || '').toLowerCase();

  const levelMap = { easy: 'Easy', medium: 'Medium', difficult: 'Difficult' };
  const targetLevel = levelMap[requestedLevel];

  const questionsForRun = targetLevel
    ? QUESTION_BANK.filter(q => q.level === targetLevel)
    : QUESTION_BANK;

  if (targetLevel && questionsForRun.length === 0) {
    console.warn(`No questions found for level "${targetLevel}" — showing all questions instead.`);
  }

  const flow = new QuizFlow(questionsForRun.length ? questionsForRun : QUESTION_BANK);
  flow.start();
});