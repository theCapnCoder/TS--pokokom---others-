
///////////////////////////////////////////// 1. Return what i pass in

export const returnWhatIPassIn = <T>(param: T) => param;

type ReturnWhatIPassIn<T> = T

type one = ReturnWhatIPassIn<1>

const one = returnWhatIPassIn(1)
const two = returnWhatIPassIn("matt")

///////////////////////////////////////////// 2. Generic constrainst

const returnWhatIPassIn1 = <T extends string>(t: T) => t;

// type ReturnWhatIPassIn1<T extends string> = T

// type Example = ReturnWhatIPassIn1<123>

///////////////////////////////////////////// 3. Multiple generics

const returnBothOfWhatIPassIn = <A extends string, B>(a: A, b: B) => {
  return {
    a, b,
  }
}

type RetunBoth<A, B> = {
  a: A,
  b: B
}

const res = returnBothOfWhatIPassIn('one', 'two')
// res.a = 'two'

///////////////////////////////////////////// 4. Multiple generics per object

// const returnBothOfWhatIPassIn1 = <T1 extends { a: any, b: any }>(params: T1) => {
interface Params<T1, T2> {
  a: T1,
  b: T2
}

const returnBothOfWhatIPassIn1 = <T1, T2>(params: Params<T1, T2>) => {
  // const returnBothOfWhatIPassIn1 = <T1, T2>(params: { a: T1, b: T2 }) => {
  return {
    first: params.a,
    second: params.b,
  }
}

const res1 = returnBothOfWhatIPassIn1({ a: 'a', b: 2 })

///////////////////////////////////////////// Gesture

// const getCenter = (pointers: Map<number, PointerCoords>) => {
//   const allCoords = Array.from(pointers.values())
//   return {
//     x: sum(allCoords, (coords) => coords.x) / allCoords.length,
//     y: sum(allCoords, (coords) => coords.y) / allCoords.length,
//   }
// }

// const getDistance = ([a, b]: readonly PointerCoords[]) => Math.hypot(a.x = b.y, a.y - b.y)

const sum = <T>(array: readonly T[], mapper: (item: T) => number): number =>
  array.reduce((acc, item) => acc + mapper(item), 0)

const arr = ['1', '2', '5', {
  wow: 12425
}]

const result = sum(arr, (item) => {
  if (typeof item === 'object' && 'wow' in item) {
    return item.wow
  }
  return parseInt(item)
})

///////////////////////////////////////////// 5. Generics in classes

class Component<TProps> {
  constructor(props: TProps) {
    this.props = props
  }

  private props: TProps;

  getProps = () => this.props;
}

const component = new Component({ a: 1, b: 2, c: 3 });
const result1 = component.getProps();

///////////////////////////////////////////// 6. Generic mapper

const concatenateFirstNameAndLastName = <
  TUser extends {
    firstName: string,
    lastName: string
  }
>(
  user: TUser
) => {
  // ): TUser & {
  //   fullName: string
  // } => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }
}

const users = [
  {
    id: 1,
    firstName: 'Matt',
    lastName: 'Pocock'
  }
]

const newUsers = users.map(concatenateFirstNameAndLastName)
const newUser = users[0]

///////////////////////////////////////////// 7. Create new set
///////////////////////////////////////////// 8. Default generics

// const createSet = <T>(initialValue: T) => {
// const stringSet = createSet('324324');
// const numberSet = createSet(23242);

// const createSet = <T>(initialValue?: T) => {
// const stringSet = createSet<string>('324324');
// const numberSet = createSet<number>(23242);

const createSet = <T>() => {
  return new Set<T>()
}

const set = new Set<string>();
set.add('ldsakfj;al');

// const createSet = <T = string>() => {
//   return new Set<T>()
// }

type CreateSet<T = string> = Set<T>;

type Result = CreateSet;

const stringSet = createSet<string>();
const numberSet = createSet<number>();
const unknownSet = createSet<string>();
const otherStringSet = createSet();

///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 
///////////////////////////////////////////// 