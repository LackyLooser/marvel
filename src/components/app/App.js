import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { Component } from "react/cjs/react.production.min";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";
class App extends Component {
    state = {
        selectedChar: null
    }
    onSelectedChar = (id) =>{
        this.setState(({
            selectedChar: id
        }))
    }
    render(){
        const {selectedChar} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundry>
                        <RandomChar/>
                    </ErrorBoundry>
                    
                    <div className="char__content">
                        <ErrorBoundry>
                            <CharList selectedChar={selectedChar} onSelectedChar={this.onSelectedChar}/>
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
    
}

export default App;