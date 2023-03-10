import { BrowserRouter, Route, Routes } from "react-router-dom";
import Challenge1 from "./pages/Challenge1";
import Challenge2 from "./pages/Challenge2";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Challenge1 />} />
        <Route path="/challenge2" element={<Challenge2 />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
