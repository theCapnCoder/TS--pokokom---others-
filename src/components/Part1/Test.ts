export default 'hello';

//typeof
//ReturnType
//Parametrs
//Awaited
//keyof
//Extract
//Exclude
//as const

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


const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
  // };
} as const;

type Exam = typeof programModeEnumMap["GROUP"]


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