interface Options {
  Words: string[];
  Lines: string[];
  Code: null;
}

const navbarOptions: Options = {
  Words: [
    "5 - 15 words",
    "20 - 30 words",
    "45 - 55 words",
    "70 - 80 words",
    "above 90 words",
  ],
  Lines: [
    "03 - 08 lines",
    "08 - 12 lines",
    "18 - 22 lines",
    "28 - 32 lines",
    "38 - 42 lines",
    "48 - 52 lines",
    "58 - 62 lines",
    "68 - 72 lines",
    "78 - 82 lines",
    "88 - 92 lines",
    "above 92 lines",
  ],
  Code: null,
};
// const navbarOptions: Options = {
//   Words: ["10 words", "25 words", "50 words", "75 words", "100 words"],
//   Lines: [
//     "5 lines",
//     "10 lines",
//     "20 lines",
//     "30 lines",
//     "40 lines",
//     "50 lines",
//     "60 lines",
//     "70 lines",
//     "80 lines",
//     "90 lines",
//     "100 lines",
//   ],
//   Code: null,
// };

export default navbarOptions;
