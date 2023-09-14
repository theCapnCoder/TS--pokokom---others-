type CarBrand = 'bmw' | 'audi' | 'toyota'

interface CarBase {
  year: number
  brand: CarBrand
}

interface Bmw extends CarBase {
  climateControl: boolean
  brand: 'bmw'
}

interface Audi extends CarBase {
  brand: 'audi'
  conditioner?: boolean
}

interface Toyota extends CarBase {
  brand: 'toyota'
  cruise?: boolean
}

type Car = Bmw | Audi

// Exhaustive check

function exhaustiveCheck(param: never) {
  console.log("exhaustiveCheck" + param)
}

function todoSmtWithCar(car: Car) {
  switch (car.brand) {
    case 'bmw':
      // todo with bmw
      break;
    case 'audi':
      // todo with audi
      break;
    // case 'toyota':
    // // todo with toyota
    default:
      exhaustiveCheck(car)
  }
}
