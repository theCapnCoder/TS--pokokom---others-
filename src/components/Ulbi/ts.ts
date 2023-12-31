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

// Typeguard Ts

interface BmwBase extends CarBase {
  climateControl: boolean
  brand: 'bmw'
  model: 'x5' | 'x7'
}

interface BmwX5 extends BmwBase {
  value: string
  model: 'x5'
}

interface BmwX7 extends BmwBase {
  value: number
  model: 'x7'
}

type TBmw = BmwX5 | BmwX7

interface AudiBase extends CarBase {
  brand: 'audi'
  conditioner?: boolean
  model: 'a3' | 'a4'
}

interface AudiA3 extends AudiBase {
  conditioner?: boolean
  model: 'a3'
}

interface AudiA4 extends AudiBase {
  conditioner?: boolean
  model: 'a4'
}

type TAudi = AudiA3 | AudiA4

type TCar = TBmw | TAudi

function isBmwX5(car: TCar): car is BmwX5 {
  return car.brand === 'bmw' && car.model === 'x5'
}

function isBmwX7(car: TCar): car is BmwX7 {
  return car.brand === 'bmw' && car.model === 'x7'
}

function fn(car: TCar) {
  // if (car.brand === 'bmw' && car.model === 'x5') {
  if (isBmwX5(car)) {
    // todo with bmw
  }

  if (isBmwX7(car)) {
    // todo with bmw
  }
}


// Enum

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

console.log(typeof UserRole) // object

function fn1(role: UserRole) {

}

// fn1(UserRoles.ADMIN) //different

const enum UserRoles2 {
  USER = 'user',
  ADMIN = 'admin',
}

function fn2(role: UserRoles2) {
}

// fn2(UserRoles.ADMIN)
// console.log(typeof UserRoles2) // Error

// for (const key in UserRoles2) {
//   console.log(key)
// }

// Error,const unum is not object, but if we use enum it will be

const UserRoles3 = {
  USER: 'user',
  ADMIN: 'admin',
} as const // - read only

// type UserRoles3 = typeof UserRoles3[keyof typeof UserRoles3]

type ValueOf<T> = T[keyof T]
type UserRoles3 = ValueOf<typeof UserRoles3>

function fn4(role: UserRoles3) {
}

// fn4('') // clue

//// ReturnType, Parameters

interface User {
  id: string
  data: string
}

function fn5(arg1: string, arg2: boolean): User {
  return {
    id: '1',
    data: 'value'
  }
}

type FnResult = ReturnType<typeof fn5>
type FnArgs = Parameters<typeof fn5>

//// Conditional Types

// type Conditional<T> = T extends string ? number : boolean

// const value: Conditional<number> = true

type Data = { value: string }
type Car2 = { model: string }

type DataOrCar<T> = T extends string ? Data : Car2

function todo<T>(arg: T): DataOrCar<T> {
  // if(...) return ...
  // else return...

  throw Error('Function not implemented.')
}

const value = todo('kje')
// value.value

//// Tuple
// Картеж - это массив фиксированной длины с заранее известным типом элементов, которые должны нам вернуться.

type Tuple = [string, number, boolean]
// type Tuple = [string, number, boolean, ...string[]]

const array: Tuple = ['1', 2, true]

//// Immutable, readonly

interface User1 {
  username: string
}

const ojb: User1 = {
  username: '1'
} as const;

// function userFn(user: Readonly<User1>) {
//   user.username = '2'
// }


//// Utitlty Types


// Omit, Pick, Exclude and Extract for union

interface User2 {
  username: string
  birthday: {
    day: number
    month: number
    year: number
  }
}

type ValueOf1<T> = T[keyof T]

type BirthDay = ValueOf1<Pick<User2, 'birthday'>>

// Partial, only first children

type DeepParital<T> = T extends object ? {
  [P in keyof T]?: DeepParital<T[P]>
} : T


//// React
// <T> JSX interpreter like not close tag
// <T extends string>
