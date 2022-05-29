import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Detail from "./pages/DetailPage/detailpage";
import ItemList from "./pages/ListPage/ItemList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel" element={<ItemList/>}/>
        <Route path="/hotel/:id" element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
