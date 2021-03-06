import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Detail from "./pages/DetailPage/detailpage";
import ItemList from "./pages/ListPage/ItemList";
import Login from "./pages/LoginPage/Login";
import Mapview from "./pages/MapPage/Mapview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel" element={<ItemList/>}/>
        <Route path="/hotel/:id" element={<Detail/>}/>
        <Route path="/auth" element={<Login/>}/>
        <Route path="/mapview" element={<Mapview/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
