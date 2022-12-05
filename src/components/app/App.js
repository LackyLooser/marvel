import decoration from '../../resources/img/vision.png';
import React ,{ useState } from "react";
import {Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import ComicPage from "../../page/ComicPage";
import CharPage from "../../page/CharPage"
import SinglePage from "../../page/SinglePage";
import SingleComic from "../singleComic/SingleComic"
import SingleCharacter from "../singleCharacter/SingleCharacter"
const  App = () => {
    
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<CharPage />}/>
                        <Route path="/comics" element={<ComicPage />}/>
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComic} dataType='comics'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharacter} dataType='characters'/>}/>
                    </Routes>
                    
                    
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    
}

export default App;