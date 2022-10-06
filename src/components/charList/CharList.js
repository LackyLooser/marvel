import './charList.scss';
import React, { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Loader from '../loader/Loader';
import Error from '../error/Error';

const  CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isNewCharsLoading, setIsNewCharsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [total, setTotal] = useState(null)

    const marvelService = new MarvelService()
    
    useEffect(()=>{
        updateCharList()
    },[])

    const onLoading = () =>{
        setIsError(false)
        setIsLoading(true)
    }

    
    const onNewCharsLoading = () =>{
        setIsNewCharsLoading(true)
    }

    const onLoaded = ({newCharList,total}) =>{
        setIsLoading(false)
        setIsNewCharsLoading(false)
        setCharList(charList => charList = [...charList, ...newCharList])
        setOffset(offset => offset = offset + 9)
        setTotal(total)
    }

    const onError = () =>{
        setIsError(true)
        setIsLoading(false)
    }

    const updateCharList = (offset) =>{
        if(charList.length === 0){
            onLoading()
        }
        onNewCharsLoading()
        marvelService.getAllCharacters(offset)
                     .then(onLoaded)
                     .catch(onError)
    }
    
    const {selectedChar, onSelectedChar} = props

    const loader = isLoading ? <Loader/> : null
    const content = !(isLoading || isError) && charList ? <View charList={charList} selectedChar={selectedChar} onSelectedChar={onSelectedChar}/> : null
    const error = !isLoading && isError ? <Error/> : null
    return (
        <div className="char__list">
            {error}
            {loader}
            {content}
            {total > offset && <button disabled={isNewCharsLoading} 
                    onClick={() => updateCharList(offset)} 
                    className="button button__main button__long">

                <div className="inner">load more</div>
            </button>}
        </div>
        
    )
   
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