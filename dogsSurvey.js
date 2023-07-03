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

const totalDogHumanAge = dogsAges => {
  return dogsAges
    .map(dogAge => {
      return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
    })
    .filter(dogAgeHuman => {
      return dogAgeHuman >= 18;
    })
    .reduce((accumulator, current, i, arr) => {
      return accumulator + current / arr.length;
    }, 0);

  // const averageDogHumanAge = totalDogHumanAge / adultDogs.length;
  // console.log(averageDogHumanAge);
};

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const avg1 = totalDogHumanAge(data1);
console.log(avg1);

// coding challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

console.log(dogs);

const dogSarah = dogs.find(dog => {
  return dog.owners.includes('Sarah');
});

console.log(dogSarah.curFood);

const checkConsumption = function (dog) {
  const tenPercentRecommended = dog.recommendedFood * 0.1;

  if (dog.curFood > dog.recommendedFood + tenPercentRecommended) {
    console.log('Excess consumption');
  } else if (dog.curFood < dog.recommendedFood - tenPercentRecommended) {
    console.log('Too little consumption');
  } else {
    console.log('Moderate consumption');
  }
};

checkConsumption(dogSarah);
checkConsumption(dogs[3]);

const ownersEatTooMuch = dogs
  .filter(dog => {
    const tenPercentRecommended = dog.recommendedFood * 0.1;

    return dog.curFood > dog.recommendedFood + tenPercentRecommended;
  })
  .map(dog => dog.owners)
  .flat();

console.log(ownersEatTooMuch);
