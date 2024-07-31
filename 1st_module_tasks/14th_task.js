let givenArray = [1, 0, -3, 21, -5];

console.log('Tartiblanmagan massiv: ', givenArray);

for (let i = 0; i < givenArray.length; i++) {
  for (let j = i+1; j < givenArray.length; j++) {
    if (givenArray[j] < givenArray[i]) {
      givenArray[i] = givenArray[i] - givenArray[j];
      givenArray[j] = givenArray[j] + givenArray[i];
      givenArray[i] = givenArray[j] - givenArray[i];
    }
  }
}

console.log('Tartiblangan massiv: ', givenArray);