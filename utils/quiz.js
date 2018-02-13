export function getScoreFeedback(percentage: number) {
  if (percentage === 100) {
    return 'Perfect score! Good Job!';
  }

  if (percentage >= 90 && percentage < 100) {
    return 'Awesome! You almost got perfect score';
  }

  if (percentage >= 60 && percentage < 90) {
    return 'Good score, keep trying!';
  }

  if (percentage > 0 && percentage < 60) {
    return 'You need to study more';
  }

  if (percentage === 0) {
    return 'Dont give up!';
  }
}
