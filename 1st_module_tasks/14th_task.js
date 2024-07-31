let givenArray = [1, 0, -3, 21, -5];
let sortedArray = [];

for (let i = 0; i < givenArray.length; i++) {
  let minValue = givenArray[i];
  for (let j = i+1; j < givenArray.length; j++) {
    if (givenArray[j] < minValue) {
      minValue = givenArray[j];
    }
  }
  sortedArray[i] = minValue;
}

console.log('Tartiblanmagan massiv: ', givenArray);
console.log('Tartiblangan massiv: ', sortedArray);