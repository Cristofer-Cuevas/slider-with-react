import Carousel from "./Corousel/Corousel";
import "./App.css";
import canadaLouiseLake from "./Corousel/images/canada-louise-lake.jpg";
import canadaMoraineLake from "./Corousel/images/canada-moraine-lake.jpg";
import canadaNiagaraFalls from "./Corousel/images/canada-niagara-falls.jpg";
import unitedStatesGoldenGate from "./Corousel/images/united-states-california.jpg";
import unitedStatesLosAngeles from "./Corousel/images/united-states-los-angeles.jpg";
import unitedStatesBoston from "./Corousel/images/united-states-boston.jpg";

import beforeArrow from "./Corousel/svg/navigate_before_black_24dp.svg";
import nextArrow from "./Corousel/svg/navigate_next_black_24dp.svg";

const arrows = [{ beforeArrow: beforeArrow }, { nextArrow: nextArrow }];

const images = [
  { country: "United States", imgUrl: unitedStatesBoston, location: "Boston, United States" },
  { country: "United States", imgUrl: unitedStatesGoldenGate, location: "Golden Gate, California, United States " },
  { country: "United States", imgUrl: unitedStatesLosAngeles, location: "California, Los Angeles, United States" },
  { country: "Canada", imgUrl: canadaLouiseLake, location: "Louise Lake, Alberta, Canada" },
  { country: "Canada", imgUrl: canadaMoraineLake, location: "Moraine Lake, Alberta, Canada" },
  { country: "Canada", imgUrl: canadaNiagaraFalls, location: "Niagara Falls, Ontario, Canada" },
];
console.log(images);

function App() {
  return <Carousel images={images} arrows={arrows} />;
}

export default App;
