import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Loader from '../loader/Loader';
import Error from '../error/Error';

class CharList extends Component {
    state = {
        charList: [],
        isLoading: false,
        isError: false,
        offset: 210,
        isNewCharsLoading: false,
        total: null
    }
    marvelService = new MarvelService()
    
    onLoading = () =>{
        this.setState(({
            isLoading:true,
            isError:false
        }))
    }

    onNewCharsLoading = () =>{
        this.setState(({
            isNewCharsLoading:true
        }))
    }
    componentDidMount(){
        this.updateCharList()
    }

    onLoaded = ({newCharList,total}) =>{
        this.setState(({offset,charList})=>({
            isLoading:false,
            isNewCharsLoading:false,
            charList: [...charList, ...newCharList],
            offset: offset + 9,
            total: total 
        }))
    }

    onError = () =>{
        this.setState(({
            isLoading:false,
            isError: true
        }))
    }

    updateCharList = (offset) =>{
        if(this.state.charList.length === 0){
            this.onLoading()
        }
        this.onNewCharsLoading()
        this.marvelService.getAllCharacters(offset)
                          .then(this.onLoaded)
                          .catch(this.onError)
    }
    render () {
        const {charList, isError, isLoading, offset, isNewCharsLoading, total} = this.state
        const {selectedChar, onSelectedChar} = this.props

        const loader = isLoading ? <Loader/> : null
        const content = !(isLoading || isError) && charList ? <View charList={charList} selectedChar={selectedChar} onSelectedChar={onSelectedChar}/> : null
        const error = !isLoading && isError ? <Error/> : null
        return (
            <div className="char__list">
                {error}
                {loader}
                {content}
                {total > offset && <button disabled={isNewCharsLoading} 
                        onClick={() => this.updateCharList(offset)} 
                        className="button button__main button__long">

                    <div className="inner">load more</div>
                </button>}
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
            
        </>
    )
}

export default CharList;