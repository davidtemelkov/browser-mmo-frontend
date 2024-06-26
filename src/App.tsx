import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Layout } from "./components/layout";
import { Quests } from "./pages/quests";
import { UserProvider } from "./contexts/userContext";
import { Work } from "./pages/work";
import { WeaponShop } from "./pages/weaponShop";
import { MagicShop } from "./pages/magicShop";
import { Dungeon } from "./pages/dungeon";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/work" element={<Work />} />
              <Route path="/weaponshop" element={<WeaponShop />} />
              <Route path="/magicshop" element={<MagicShop />} />
              <Route path="/dungeon" element={<Dungeon />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
