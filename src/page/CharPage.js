import React ,{ useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundry from "../components/errorBoundry/ErrorBoundry";
import CharSearchForm from "../components/charSearchForm/charSearchForm";
const CharPage = () =>{
    const [selectedChar, seTSelectedChar] = useState(null)
    const onSelectedChar = (selectedChar) =>{
        seTSelectedChar(selectedChar)
    }
    return (
        <>
        <ErrorBoundry>
                        <RandomChar/>
                    </ErrorBoundry>
                    
                    <div className="char__content">
                        <ErrorBoundry>
                            <CharList selectedChar={selectedChar} onSelectedChar={onSelectedChar}/>
                        </ErrorBoundry>
                        
                        
                        <div>
                            <ErrorBoundry>
                                <CharInfo selectedChar={selectedChar}/>
                            </ErrorBoundry>
                            <ErrorBoundry>
                                <CharSearchForm/>
                            </ErrorBoundry>
                        </div>
                        
                        
                    </div></>
    )
}
export default CharPage