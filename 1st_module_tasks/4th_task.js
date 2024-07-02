function numberDigitsDeterminer(givenNumber) {
  if (givenNumber >= 100 && givenNumber < 1000) {
    return 3;
  } else if (givenNumber >= 10 && givenNumber < 100) {
    return 2;
  } else if (givenNumber >= 0 && givenNumber < 10) {
    return 1;
  } else {
    return 'Berilgan son shartga mos kelmaydi.'
  }
}

let a = 111;

console.log(numberDigitsDeterminer(a));
