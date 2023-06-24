'use strict';
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = [...dogsJulia];
  dogsJuliaCorrect.splice(dogsJuliaCorrect.length - 2, 2);
  dogsJuliaCorrect.splice(0, 1);
  const allDogs = [...dogsJuliaCorrect, ...dogsKate];

  console.log(allDogs);
  allDogs.forEach((dog, i) => {
    dog >= 3
      ? console.log(`Dog ${i + 1} is ${dog} years old and is an adult`)
      : console.log(`Dog ${i + 1} is ${dog} years old and is a puppy`);
  });
};
const juliaDogs = [3, 5, 2, 12, 7];
const kateDogs = [4, 1, 15, 8, 3];

checkDogs(juliaDogs, kateDogs);

const calcAverageHumanAge = dogsAges => {
  const dogsHumanAges = dogsAges.map(dogAge => {
    return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
  });
  console.log(dogsHumanAges);

  const adultDogs = dogsHumanAges.filter(dogAgeHuman => {
    return !(dogAgeHuman < 18);
  });
  console.log(adultDogs);

  const totalDogHumanAge = adultDogs.reduce((accumulator, current) => {
    return accumulator + current;
  });

  const averageDogHumanAge = totalDogHumanAge / adultDogs.length;
  console.log(averageDogHumanAge);
};

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

calcAverageHumanAge(data1);
