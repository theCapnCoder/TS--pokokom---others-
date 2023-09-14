import React from "react";

export const GetFunctionRetunr = () => {
  ///////////////////////////////////////////// 1. Get function return type
  const myFunc = (arg: string) => {
    return "hello";
  };

  type MyFunc = typeof myFunc;
  type ReturnValue = ReturnType<MyFunc>;
  type MyFuncReturn = ReturnType<typeof myFunc>;

  ///////////////////////////////////////////// 2. Get function parameters

  const makeQuery = (
    url: string,
    opts?: {
      method?: string;
      headers?: {
        [key: string]: string;
      };
      body?: string;
    }
  ) => {};

  type MakeQueryParameters = Parameters<typeof makeQuery>;
  type MakeQueryParametersSecondArgument = MakeQueryParameters[1];

  ///////////////////////////////////////////// 3. Awaited

  const getUser = () => {
    return Promise.resolve({
      id: "123",
      name: "Jogn",
      email: "john@example.com",
    });
  };

  type RetureValue = Awaited<ReturnType<typeof getUser>>;

  ///////////////////////////////////////////// 4. Get object keys

  const testingFrameworks = {
    vitest: {
      label: "Vitest",
    },
    jest: {
      label: "Jest",
    },
    mocha: {
      label: "Mocha",
    },
  };

  type TestingFramework = keyof typeof testingFrameworks;

  ///////////////////////////////////////////// 5. Termynology

  // discriminated union
  type A =
    | {
        type: "a";
        // a: string;
        whatever: string;
      }
    | {
        type: "b";
        // b: string;
        something: string;
      }
    | {
        type: "c";
        // c: string;
        whoCares: string;
      };

  const getUnion = (result: A) => {
    // result.a
    // if (result.type == "a") {
    //   const res = result.a;
    // }
    if (result.type == "c") {
      const res = result.whoCares;
    }
  };

  // union
  type B = "a" | "b" | "c";

  // enum
  enum C {
    A = "a",
    B = "b",
    C = "c",
  }

  ///////////////////////////////////////////// 6. Extract from discriminated union

  type Event =
    | {
        type: "click";
        event: MouseEvent;
        a: string;
      }
    | {
        type: "focus";
        event: FocusEvent;
        a: string;
      }
    | {
        type: "keydown";
        event: KeyboardEvent;
      };

  // type ClickEvent = Extract<Event, { type: "click" }>;
  type ClickEvent = Extract<Event, { a: string }>;

  type Fruit = "apple" | "banana" | "orange";
  type BananaAndOrange = Extract<Fruit, "banana" | "orange">;

  ///////////////////////////////////////////// 7. Exclude from discriminated union

  type NonKeyDownEvent = Exclude<Event, { type: "keydown" }>;

  /////////////////////////////////////////////

  function walkToTheOffice(action: "grabACoffee" | "keepWalking") {
    const transitions = {
      grabACoffee: "late",
      keepWalking: "on time",
    } as const;

    const result = transitions[action];
    console.log(result);
  }

  walkToTheOffice("grabACoffee");
  walkToTheOffice("keepWalking");

  ///////////////////////////////////////////// 8. Indexed access

  const fakeDataDefaults = {
    String: "Default string",
    Int: 1,
    Float: 1.14,
    Boolean: true,
    ID: "id",
    obj: {
      String: "Default string",
    },
  };

  type Example = typeof fakeDataDefaults["obj"]["String"];

  type FakeDataDefaults = typeof fakeDataDefaults;

  type StringType = FakeDataDefaults["String"];
  type IntType = FakeDataDefaults["Int"];
  type FloatType = FakeDataDefaults["Float"];
  type BooleanType = FakeDataDefaults["Boolean"];
  type iIDType = FakeDataDefaults["ID"];

  ///////////////////////////////////////////// 9. Discriminated union to discriminator
  // Show 6

  type EventType = Event["event"];

  type Color =
    | {
        base: "one";
        color: "red";
      }
    | {
        base: "two";
        color: "green";
      }
    | {
        base: "three";
        color: "blue";
      };

  type ColorType = Color["color"];

  ///////////////////////////////////////////// 10. As const

  const programModeEnumMap = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "1on1",
    SELF_DIRECTED: "selfDirected",
    PLANNED_ONE_ON_ONE: "planned1on1",
    PLANNED_SELF_DIRECTED: "plannedSelfDirected",
    // };
  } as const;

  // const arr = [1,2,3] as const;
  // arr[0] = 10;

  type GroupProgramm = typeof programModeEnumMap["GROUP"];
  type AnnouncementProgram = typeof programModeEnumMap["ANNOUNCEMENT"];
  type OneOnOneProgramm = typeof programModeEnumMap["ONE_ON_ONE"];
  type SelfDirectedProgram = typeof programModeEnumMap["SELF_DIRECTED"];
  type PlannedOneOnOneProgram = typeof programModeEnumMap["PLANNED_ONE_ON_ONE"];
  type PlannedSelfDirectedProgram =
    typeof programModeEnumMap["PLANNED_SELF_DIRECTED"];

  ///////////////////////////////////////////// 11. Indexed access with unions

  type IndividualProgram = typeof programModeEnumMap[
    | "ONE_ON_ONE"
    | "SELF_DIRECTED"
    | "PLANNED_ONE_ON_ONE"
    | "PLANNED_SELF_DIRECTED"];

  type IndividualProgram1 = typeof programModeEnumMap[Exclude<
    keyof typeof programModeEnumMap,
    "GROUP" | "ANNOUNCEMENT"
  >];

  type IndividualProgram2 = Exclude<
    keyof typeof programModeEnumMap,
    "GROUP" | "ANNOUNCEMENT"
  >;

  ///////////////////////////////////////////// 12. Get object values

  const frontendToBackendEnumMap = {
    singleModule: "SINGLE_MODULE",
    multiModule: "MULTI_MODULE",
    sharedModule: "SHARED_MODULE",
  } as const;

  type Obj = typeof frontendToBackendEnumMap;

  type BackendModuleEnum =
    typeof frontendToBackendEnumMap[keyof typeof frontendToBackendEnumMap];

  type BackendModuleEnum1 = Obj[keyof Obj];

  type BackendModuleEnum2 = Obj[
    | "singleModule"
    | "multiModule"
    | "sharedModule"];

  ///////////////////////////////////////////// 13. Get array value

  const fruitsFirst = ["apple", "banana", "orange"];
  //!!! important add 'as const';
  const fruits = ["apple", "banana", "orange"] as const;

  type AppleOrBanan = typeof fruits[0 | 1];
  type Fruit1 = typeof fruits[number];

  ///////////////////////////////////////////// 14. Template literal with string

  type Route = `/${string}`;

  const goToRoute = (route: Route) => {};

  goToRoute("/users");
  goToRoute("/users/1");

  // Below it's mistake
  // goToRoute("users/1")

  ///////////////////////////////////////////// 15. Extract with template literals

  type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";

  type DynamicRoutes = Extract<Routes, `${string}:${string}`>;

  ///////////////////////////////////////////// 16. Unions in template literals

  type BreadType = "rye" | "brown" | "white";

  type Filling = "cheese" | "ham" | "salami";

  type Sandwich = `${BreadType} sandwich with ${Filling}`;
  type Sandwich1 = `${BreadType} ${"sandwich" | "buguette"} with ${Filling}`;

  ///////////////////////////////////////////// 17. Splitting string

  type Path = "Users/John/Documents/notes.txt";

  // import {S} from 'ts-toolbelt';
  // type SplitPath = S.Split<Path, "/">;

  ///////////////////////////////////////////// 18. Template literals in object keys

  type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

  type ObjectOfKeys = Record<TemplateLiteralKey, string>;

  ///////////////////////////////////////////// 19. Uppercase object

  type Event1 = "log_in" | "log_out" | "sign_up";

  type ObjectOfKeys1 = Record<Uppercase<Event1>, string>;
  type UppercaseEvent = Uppercase<Event1>;
  type CapitalizeEvent = Capitalize<Event1>;
  type LowercaseEvent = Lowercase<Event1>;

  ///////////////////////////////////////////// 19. Type helpers pattern

  type ReturnWhatIPassIn<T> = T;
  // type ReturnWhatIPassIn<T> = T | undefined;

  type Something = ReturnWhatIPassIn<"Something">;

  ///////////////////////////////////////////// 20.1 Mayby

  type Maybe<T> = T | null | undefined;

  type Example1 = Maybe<string>;

  ///////////////////////////////////////////// 20.2 Constraints

  type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

  const addRoutePrefix = (route: unknown) => {};

  ///////////////////////////////////////////// 20.3 Multiple

  type CreateDataShape<TData, TError> = {
    data: TData;
    error: TError;
  };

  ///////////////////////////////////////////// 20.4 Default solution

  // type CreateDataShape1<TData, TError = undefined> = {
  // type CreateDataShape1<TData, TError extends Error | undefined = undefined> = {
  type MaybeError = Error | undefined;
  type CreateDataShape1<TData, TError extends MaybeError = undefined> = {
    data: TData;
    error: TError;
  };

  type Example2 = CreateDataShape1<number>;

  ///////////////////////////////////////////// 20.5 Function constraints

  type GetParametersAndReturnType<T extends (...args: any) => any> = {
    params: Parameters<T>;
    returnValue: ReturnType<T>;
  };

  ///////////////////////////////////////////// 20.6 Not undefined or null constraint

  type Maybe1<T extends {}> = T | null | undefined;

  ///////////////////////////////////////////// 20.7 Non empty array

  // type NonEmptyArray<T> = [T, T, T];
  // type NonEmptyArray<T> = [T, ...Array<T>];
  // const example3: NonEmptyArray<number> = [1,2,3,4]

  type NonEmptyArray<T> = Array<T>;

  const makeEnum = (values: NonEmptyArray<string>) => {};

  ///////////////////////////////////////////// 20. Conditional types

  type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodby" : "hello";

  type Example3 = YouSayGoodbyeAndISayHello<"hello">;

  ///////////////////////////////////////////// 21. Returning never

  // type YouSayGoodbyeAndISayHello1<T> = T extends "hello" | "goodby" ? 'wow' : never;
  type YouSayGoodbyeAndISayHello1<T> = T extends "hello" | "goodby"
    ? T extends "hello"
      ? "goodbye"
      : "hello"
    : never;

  ///////////////////////////////////////////// 22. Infer with raw values

  // type GetDataValue<T> = T extends { data: any } ? T["data"] : never;
  type GetDataValue<T> = T extends { data: infer TData } ? TData : never;

  type Example4 = GetDataValue<{ data: 1 }>;

  ///////////////////////////////////////////// 23. Infer with generics

  interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getNaem: () => Name;
    getPoint: () => Point;
  }

  type Example5 = MyComplexInterface<
    "click",
    "window",
    "me-event",
    { x: 12; y: 14 }
  >;

  // type GetPoint<T> = T extends MyComplexInterface<any, any, any, any>
  //   ? ReturnType<T['getPoint']>
  //   : "never";

  type GetPoint<T> = T extends MyComplexInterface<
    infer TWhatever,
    infer TContext,
    infer TEvent,
    infer TPoint
  >
    ? TPoint
    : "never";
  type Example6 = GetPoint<MyComplexInterface<1, 2, 3, 12>>;

  ///////////////////////////////////////////// 24. Template literal value extraction

  type Names = ["Matt Pocock", "Jimi Hendrix", "Eric Clapton"];

  // type GetSurname<T extends string> = S.Split<T, " ">[1];
  type GetSurname<T> = T extends `${infer First} ${infer Last}` ? Last : never;

  ///////////////////////////////////////////// 25. Get result from async function

  const getServerSideProps = async () => {
    const data = await fetch("https://#");
    const json: { title: string } = await data.json();

    return {
      props: {
        json,
        isCool: true,
      },
    };
  };

  type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
    props: infer P;
  }>
    ? P
    : never;

  type Props = InferPropsFromServerSideFunction<typeof getServerSideProps>;

  ///////////////////////////////////////////// 26. Infer in union types

  const parser1 = {
    parse: () => 1,
  };

  const parser2 = () => "123";

  const parser3 = {
    extract: () => true,
  };

  type GetParserResult<T> = T extends {
    parse: () => infer TResult;
  }
    ? TResult
    : T extends () => infer TResult
    ? TResult
    : T extends {
        extract: () => infer TResult;
      }
    ? TResult
    : never;

  // Better soulution

  type GetParserResult1<T> = T extends
    | {
        parse: () => infer TResult;
      }
    | {
        extract: () => infer TResult;
      }
    | (() => infer TResult)
    ? TResult
    : never;

  ///////////////////////////////////////////// 27. Distributive conditional types

  type Fruit2 = "apple" | "banana" | "orange" | "pear";

  // type AppleOrBanana = Fruit2 extends "apple" | "banana" ? Fruit2 : never;

  // type AppleOrBanana1 = Fruit2 extends "apple" | "banana"
  //   ? "apple" | "banana"
  //   : never;

  type AppleOrBanana1 = Fruit2 extends infer T
    ? T extends "apple" | "banana"
      ? T
      : never
    : never;

  type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;

  type AppleOrBanana = GetAppleOrBanana<Fruit2>;

  ///////////////////////////////////////////// 28 Union to object

  type Route1 = "/" | "/about" | "/admin" | "/admin/users";

  type RoutesObject = {
    // [index: string]: string;
    // [R in Route1]: string;
    // [R in '/' | 'wow']: R;
    // [R in Route1]: R | undefined;
    [R in Route1]: R;
  };

  ///////////////////////////////////////////// 29. K in keyof

  interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
  }

  type AttributeGetters = {
    // [K in keyof Attributes]: K;
    // [K in keyof Attributes]: Attributes[K];
    // [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
    // [K in
    //   | "firstName"
    //   | "lastName"
    //   | "age" as `get${Capitalize<K>}`]: () => Attributes[K];
    [K in keyof Attributes]: () => Attributes[K];
  };

  /////////////////////////////////////////////

  // 84 lesson

  ///////////////////////////////////////////// 32. Never in key remapping

  interface Example7 {
    name: string;
    age: number;
    id: string;
    organizationId: string;
    groupId: string;
  }

  type SearchForId = `${string}${"id" | "Id"}${string}`;

  const id: SearchForId = "ageId";

  type OnlyIdKey<T> = {
    [K in keyof T as K extends SearchForId ? K : never]: T[K];
  };

  type Result = OnlyIdKey<Example7>;

  ///////////////////////////////////////////// 32. Discriminated union to object

  type Route2 =
    | {
        route: "/";
        search: {
          page: string;
          perPage: string;
        };
      }
    | { route: "/about"; search: {} }
    | { route: "/admin"; search: {} }
    | {
        route: "/admin/user";
        search: {
          id: number;
        };
      };

  // type Extracted = Extract<Route2, { route: "/" }>;
  // type Extracted = Extract<Route2, { route: "/" }>["search"];
  type Extracted = Extract<Route2, { route: "/admin/user" }>["search"];

  type RoutesObject1 = {
    // [R in Route2["route"]]: string;
    [R in Route2["route"]]: Extract<Route2, { route: R }>["search"];
  };

  type RoutesObject2 = {
    [R in Route2 as R["route"]]: R["search"];
  };

  ///////////////////////////////////////////// 33. Object to union of tuples

  interface Values {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
  }

  type ValuesObjectValues = Values[keyof Values];

  type ValuesAsUnionOfTuples = {
    [K in keyof Values]: [K, Values[K]];
  };

  type ValuesAsUnionOfTuples1 = {
    [K in keyof Values]: [K, Values[K]];
  }[keyof Values];

  ///////////////////////////////////////////// 34. Object ot union of template litersl

  interface FruitMap {
    apple: "red";
    banana: "yellow";
    orange: "orange";
  }

  // type TransformedFruit = {
  //   [K in keyof FruitMap]: K
  // }[keyof FruitMap]

  type TransformedFruit = {
    [K in keyof FruitMap]: `${K}:${FruitMap[K]}`;
  }[keyof FruitMap];

  ///////////////////////////////////////////// 35 Discriminated union to union

  type Fruit3 =
    | {
        name: "apple";
        color: "red";
      }
    | {
        name: "banana";
        color: "yellow";
      }
    | {
        name: "orange";
        color: "orange";
      };

  type FruitName = Fruit3["name"];

  type TransformFriut = {
    [F in Fruit3 as F["name"]]: `${F["name"]}:${F["color"]}`;
  }[Fruit3["name"]];

  ///////////////////////////////////////////// 36. Get dynamic path params

  type UsrPath = "/users/:id";

  type UserOrganisationPath = "/users/:id/organisations/:organizationsId";

  // type Result2 = S.Split<UserOrganisationPath, "/">;

  // type ExtractPathParams<TPath extends string> = {
  //   [K in S.Split<TPath, "/">[number] as K extends `:${infer P}`
  //     ? P
  //     : never]: string;
  // };

  // type Result1 = ExtractPathParams<UserOrganisationPath>;

  ///////////////////////////////////////////// 38. Mutually exclusive properties

  interface Attributes1 {
    id: string;
    email: string;
    username: string;
  }

  // type MutuallyExclusive<T> = {
  //   [K in keyof T]: T[K];
  // }

  // type MutuallyExclusive<T> = {
  //   [K in keyof T]: Record<K, {}>;
  // };

  // const example: ExclusiveAttributes = {
  //   email: {
  //     email: {},
  //   },
  //   id: {
  //     id: {},
  //   },
  //   username: {
  //     username: {},
  //   },
  // };

  // const example: ExclusiveAttributes = {
  //   email: {
  //     email: "12421",
  //   },
  //   id: {
  //     id: "124",
  //   },
  //   username: {
  //     username: "2342",
  //   },
  // };

  const example: ExclusiveAttributes = {
    id: "1241",
  };

  type MutuallyExclusive<T> = {
    [K in keyof T]: Record<K, T[K]>;
  }[keyof T];

  type ExclusiveAttributes = MutuallyExclusive<Attributes1>;

  ///////////////////////////////////////////// 39 Discriminated union with unique values to object

  type Route3 =
    | {
        route: "/";
        search: {
          page: string;
          perPage: string;
        };
      }
    | { route: "/about" }
    | { route: "/admin" }
    | { route: "/admin/user" };

  type RoutesObject3 = {
    [R in Route3 as R["route"]]: R extends { search: infer S } ? S : never;
  };

  ///////////////////////////////////////////// 40. Deep partial

  // type DeepPartial<T> = { [K in keyof T]: DeepPartial<T[K]> };

  type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

  // type DeepPartial<T> = T extends Array<infer U>
  //   ? Array<DeepPartial<U>>
  //   : { [K in keyof T]?: DeepPartial<T[K]> };

  type MyType = {
    a: string;
    b: number;
    c: {
      d: string;
      e: {
        f: string;
        g: {
          h: string;
          i: string;
        }[];
      };
    };
  };

  type Result1 = DeepPartial<MyType>;

  const result: Result1 = {
    c: {
      e: {
        g: [
          {
            h: "1431531",
          },
        ],
      },
    },
  };

  /////////////////////////////////////////////
  return <div>GetFunctionRetunr</div>;
};
