<<<<<<< HEAD
let a = 999;

if (!(a >= 1 && a <= 999)) {
  return console.log('Kiritilgan son ruxsat etilgan chegarada(1-999) emas!');
}


function numberDigitsDeterminer(givenNumber) {
  if ((Math.floor(givenNumber / 100) >= 1)) {
    return 3;
  } else if ((Math.floor(givenNumber / 10) >= 1)) {
=======
function numberDigitsDeterminer(givenNumber) {
  if (givenNumber >= 100 && givenNumber < 1000) {
    return 3;
  } else if (givenNumber >= 10 && givenNumber < 100) {
>>>>>>> cc301f30607f088d10c65f7a7cfb9682e688344b
    return 2;
  } else if (givenNumber >= 0 && givenNumber < 10) {
    return 1;
  } else {
    return 'Berilgan son shartga mos kelmaydi.'
  }
}

<<<<<<< HEAD
console.log(numberDigitsDeterminer(a));
=======
let a = 111;

console.log(numberDigitsDeterminer(a));
>>>>>>> cc301f30607f088d10c65f7a7cfb9682e688344b
