# AutoQuiz — Car Trivia Quiz App

A multi-category car trivia quiz app built as a group project for Melsoft Academy, testing knowledge across car brands, mechanics, performance, and motorsport using core JavaScript OOP principles.

## Description

AutoQuiz challenges users with car-themed trivia questions split across difficulty levels (Easy, Medium, Difficult), each built from combined question categories. Users answer multiple-choice questions one at a time, track their score in real time, and get a results summary at the end with the option to try again.

## Features

- Home screen introducing the quiz and its levels
- One question displayed at a time with 4 multiple-choice options
- Click-to-select answers with visual feedback (correct/incorrect highlighting)
- Live score and question tracker (e.g. "Question 3 of 10")
- Progress bar visualization
- Results screen with final score and percentage
- Restart / retry functionality
- Responsive design for mobile and desktop
- Light/dark mode toggle

## Question Categories

Combined into 3 difficulty levels, 10 questions each (30 total):

- **Easy:** Car Brands & Models + Car Parts & Features
- **Medium:** Engines & Mechanics + Performance
- **Difficult:** Motorsport + Driving & Road Safety

## Tech Stack

- HTML5
- CSS3 (responsive design, transitions, progress bar, card layouts)
- JavaScript (ES6 Classes / OOP)
- Git & GitHub for version control

## Object-Oriented Structure

- `Question` class — represents a single question (text, options, correct answer, level), with a `checkAnswer()` method
- `Quiz` class — manages the full quiz run: current question, score, progress, and completion state

## Team & Roles

| Member | Role |
|---|---|
| Chiwo | JavaScript / Quiz Functionality + OOP |
| Andre | Results + Quiz Flow |
| Brayden | HTML / Page Structure |
| Siyabonga | Content input (early stage) |
| Asisipho | Project coordination, GitHub setup, CSS/UI |

## Issues Faced

- **Communication gaps early on:** at the start of the project, one team member had to actively push others to engage and respond before real progress began.
- **Team member disappearance:** Siyabonga contributed early input (topic voting, GitHub username) but then went silent and was not reachable for the remainder of the project.
- **Member left mid-project:** Asisipho, who had set up the GitHub repo and coordinated early tasks, left the group chat before the project was completed, requiring the remaining members to pick up coordination.
- **Duplicate work / merge conflicts:** Chiwo and Andre both independently built out similar JavaScript functionality (quiz flow and results logic) on separate branches without syncing first, resulting in overlapping code that had to be reviewed and reconciled into a single structure.
- **Incomplete page handoff:** one team member's HTML branch initially left out additional required pages/sections, which had to be flagged and corrected.
- **Presentation assignment:** no team member volunteered to present the project, requiring a separate resolution closer to the deadline.
