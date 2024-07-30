let a = 999;

// Yechimning 1 - varyanti
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

// Yechimning 2-varyanti
// function numberDigitsDeterminer(givenNumber) {
//   if (givenNumber >= 100 && givenNumber < 1000) {
//     return 3;
//   } else if (givenNumber >= 10 && givenNumber < 100) {
//     return 2;
//   } else if (givenNumber >= 1 && givenNumber < 10) {
//     return 1;
//   } else {
//     return 'Berilgan son shartga mos kelmaydi.'
//   }
// }

console.log(numberDigitsDeterminer(a));
