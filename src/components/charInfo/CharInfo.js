import './charInfo.scss';
import React, { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Loader from '../loader/Loader';
import Skeleton from '../skeleton/Skeleton'
import useMarvelService from '../../services/MarvelService';

const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState(null)
    const {isError, isLoading, clearError, getCharacter} = useMarvelService()

    useEffect(()=>{
        if(selectedChar){
            updateChar(selectedChar)
        }
    },[selectedChar])

    const onLoaded = (char) =>{
        setChar(char)
    }


    const updateChar = (id) =>{
        clearError()
        getCharacter(id)
            .then(onLoaded)
        
    }
    
    const error = !isLoading && isError ? <Error/> : null
        const loading = isLoading ? <Loader/> : null
        const skeleton = !isLoading && !isError && !char ? <Skeleton/> : null
        const content = !isLoading && !isError && char ? <View char={char}/> : null
        return (
            <div className="char__info">
                {error}
                {loading}
                {skeleton}
                {content}
            </div>
        )
    
}

const View = ({char}) =>{
    const {thumbnail, name, homepage, wiki, description, comics} = char

    let clazz = {objectFit: 'cover'}
    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        clazz = {objectFit: 'unset'}
    }
    return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={clazz}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {comics.map((item, index) =>{
                        if (index > 9) return null
                        return (
                            <li key={index} className="char__comics-item">
                                        {item.name}
                                    </li>
                        )
                    })}
                </ul>
            </>
    )
}
export default CharInfo;