import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Layout } from "./components/layout";
import { CurrentQuests } from "./pages/currentQuests";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quests" element={<CurrentQuests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
