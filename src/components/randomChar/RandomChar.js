import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import React,{ useState, useEffect } from 'react';
import Loader from '../loader/Loader';
import Error from '../error/Error';

const RandomChar = () => {
    const [char , setChar] = useState({})
    const [isLoading , setIsLoading] = useState(false)
    const [isError , setIsError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(()=>{
        updateChar()
    },[])

    const onLoaded = (char) =>{
        setChar(char)
        setIsLoading(false)
    }

    const onError = () =>{
        setIsLoading(false)
        setIsError(true)
    }

    const onLoading = () =>{
        setIsLoading(true)
        setIsError(false)
    }
    const updateChar = () =>{
        onLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        marvelService
                .getCharacter(id)
                .then(onLoaded)
                .catch(onError)
    }
        const {name,decoration,thumbnail,homepage,wiki} = char
        const noneImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const styleImg = !noneImg ? 'cover' : 'unset'
        return (
            <div className="randomchar">
                {isError &&<Error/>}
                {isLoading && <Loader/>}
                {!isLoading && !isError && <div className="randomchar__block">
                    <img style={{objectFit: styleImg}} src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                        {decoration}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button disabled={isLoading} onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

export default RandomChar;