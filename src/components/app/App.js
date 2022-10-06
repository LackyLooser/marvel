import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import React ,{ useState } from "react";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";
const  App = () => {
    const [selectedChar, seTSelectedChar] = useState(null)
    const onSelectedChar = (selectedChar) =>{
        seTSelectedChar(selectedChar)
    }
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundry>
                        <RandomChar/>
                    </ErrorBoundry>
                    
                    <div className="char__content">
                        <ErrorBoundry>
                            <CharList selectedChar={selectedChar} onSelectedChar={onSelectedChar}/>
                        </ErrorBoundry>
                        
                        <ErrorBoundry>
                            <CharInfo selectedChar={selectedChar}/>
                        </ErrorBoundry>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    
}

export default App;