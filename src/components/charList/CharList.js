import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Loader from '../loader/Loader';
import Error from '../error/Error';

class CharList extends Component {
    state = {
        charList: [],
        isLoading: false,
        isError: false
    }
    marvelService = new MarvelService()
    
    onLoading = () =>{
        this.setState(({
            isLoading:true,
            isError:false
        }))
    }

    componentDidMount(){
        this.updateCharList()
    }

    onLoaded = (charList) =>{
        this.setState(({
            isLoading:false,
            charList
        }))
    }

    onError = () =>{
        this.setState(({
            isLoading:false,
            isError: true
        }))
    }

    updateCharList = () =>{
        this.onLoading()
        this.marvelService.getAllCharacters()
                          .then(this.onLoaded)
                          .catch(this.onError)
    }
    render () {
        const {charList,isError,isLoading} = this.state
        const {selectedChar,onSelectedChar} = this.props

        const loader = isLoading ? <Loader/> : null
        const content = !(isLoading || isError) && charList ? <View charList={charList} selectedChar={selectedChar} onSelectedChar={onSelectedChar}/> : null
        const error = !isLoading && isError ? <Error/> : null
        return (
            <div className="char__list">
                <>
                {error}
                {loader}
                {content}
                </>
            </div>
            
        )
    }
   
}

const View = ({selectedChar,charList,onSelectedChar}) =>{
    const charListRender = charList.map(char =>{
        const clazz = selectedChar === char.id ? "char__item char__item_selected" : "char__item"
        let imgStyle = {objectFit: 'cover'}
        if(char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            imgStyle = {objectFit: 'fill'}
        }
        return (
            <li onClick={()=>onSelectedChar(char.id)} className={clazz} key={char.id}>
                    <img style={imgStyle} src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
        )
    })
    return (
        <>
            <ul className="char__grid">
                {charListRender}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default CharList;