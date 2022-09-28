import { Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import CompanyInfo from "./components/CompanyInfo";
import ScrapedData from "./components/ScrapedData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/data" element={<ScrapedData />} />
        <Route path="/:any" element={<CompanyInfo />} />
      </Routes>
    </div>
  );
}

export default App;
