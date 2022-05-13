import {Routes, Route} from "react-router-dom";
import {BrowserRouter, Link} from "react-router-dom";
import React from 'react';
import "../App.css";
import Navbar from "./navbar";
import ViewCars from "./viewcar";
import AddCars from "./addcars";
import UpdateCars from "./updatecars";
import Home from "./homepage";


// homepage
function App() {
    return (
        <div>
            <Navbar />
            <Routes>

                    <Route index element={<Home/>}/>
                <Route path="cars">
                    <Route index element={<ViewCars/>} />
                    <Route path="add" element={<AddCars />} />
                    <Route path="update" >
                        <Route path=":id" element={<UpdateCars />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
