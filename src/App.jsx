import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/HomeIndex"; 
import MovieDetail from "./pages/MovieDetail/MovieDetailIndex"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
