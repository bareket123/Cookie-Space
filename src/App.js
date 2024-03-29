import React from 'react'; // Add this line to import React
import './App.scss';
import Login from "./Components/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import CookiesIngredients from "./Components/CookiesIngredients";
import Recipes from "./Components/Recipes";
import CookieDesign from "./Components/CookieDesign";


function App() {
  return (

          <BrowserRouter>
              <Routes>
                  <Route path={"/home"} element={<Home/>}></Route>
                  <Route path={"/"} element={<Login/>}></Route>
                  <Route path={"/ingredients"} element={<CookiesIngredients/>}></Route>
                  <Route path={"/recipes"} element={<Recipes/>}></Route>
                  <Route path={"/cookieDesign"} element={<CookieDesign/>}></Route>

              </Routes>
          </BrowserRouter>


  );
}

export default App;
