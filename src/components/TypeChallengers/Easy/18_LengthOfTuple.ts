// For given a tuple, you need create a generic Length, pick the length of the tuple
// For example:

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<T extends string[]> = T['length']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5

export const colors = ['red', 'green', 'blue'] as const;
export const colors1 = ['red', 'green', 'blue'];

export const person = {
  name: 'Alice',
  age: 30,
} as const;

export let fruit = 'apple' as const;
export let fruit1 = 'apple';
