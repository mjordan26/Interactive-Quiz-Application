// ============================
// 1. Question class
// ============================
class Question {
  constructor(text, options, correctIndex, level) {
    this.text = text;
    this.options = options; // array of 4 strings
    this.correctIndex = correctIndex; // index (0-3) of the right answer
    this.level = level; // "Easy" | "Medium" | "Difficult"
  }

  checkAnswer(selectedIndex) {
    return selectedIndex === this.correctIndex;
  }
}
