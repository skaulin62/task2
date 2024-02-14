import "./styles/index.sass";
import AppWrapper from "./providers";
import HomePage from "@/pages/HomePage";

const App = () => {
  return (
    <AppWrapper>
      <div className="container">
        <HomePage />
      </div>
    </AppWrapper>
  );
};

export default App;
