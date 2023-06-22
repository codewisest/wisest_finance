'use strict';
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = [...dogsJulia];
  dogsJuliaCorrect.splice(dogsJuliaCorrect.length - 2, 2);
  dogsJuliaCorrect.splice(0, 1);
  const allDogs = [...dogsJuliaCorrect, ...dogsKate];

  console.log(allDogs);
  allDogs.forEach((dog, i) => {
    dog >= 3
      ? console.log(`Dog ${i + 1} is an adult`)
      : console.log(`Dog ${i + 1} is a puppy`);
  });
};
const juliaDogs = [3, 5, 2, 12, 7];
const kateDogs = [4, 1, 15, 8, 3];

checkDogs(juliaDogs, kateDogs);
