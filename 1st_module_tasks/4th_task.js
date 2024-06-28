let a = 1;


function numberDigitsDeterminer(givenNumber) {
  if ((givenNumber % 100) === 0) {
    return 3;
  } else if ((givenNumber % 10) === 0) {
    return 2;
  } else {
    return 1;
  }
}