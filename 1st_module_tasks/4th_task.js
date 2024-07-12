let a = 999;

if (!(a >= 1 && a <= 999)) {
  return console.log('Kiritilgan son ruxsat etilgan chegarada(1-999) emas!');
}


function numberDigitsDeterminer(givenNumber) {
  if ((Math.floor(givenNumber / 100) >= 1)) {
    return 3;
  } else if ((Math.floor(givenNumber / 10) >= 1)) {
    return 2;
  } else {
    return 1;
  }
}

console.log(numberDigitsDeterminer(a));