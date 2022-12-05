import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import React,{ useState, useEffect, useRef } from 'react';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import useMarvelService from '../../services/MarvelService';
import { CSSTransition } from 'react-transition-group';

const RandomChar = () => {
    const [char , setChar] = useState({})
    const [showAnimate, setShowAnimate] = useState(false)
    const nodeRef = useRef(null);
    const {isError, isLoading, clearError, getCharacter} = useMarvelService()
    useEffect(()=>{
        updateChar()
    },[])

    const onLoaded = (char) =>{
        setChar(char)
        setShowAnimate(true)
    }
    const updateChar = () =>{
        clearError()
        setShowAnimate(false)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onLoaded)
    }
        const {name,decoration,thumbnail,homepage,wiki} = char
        const noneImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const styleImg = !noneImg ? 'cover' : 'unset'
        return (
            <div className="randomchar">
                {isError &&<Error/>}
                {/* {isLoading && <Loader/>} */}
                {!isError && <CSSTransition nodeRef={nodeRef}
                                                          in={showAnimate}
                                                          timeout={10000}
                                                          unmountOnExit
                                                          mountOnExit
                                                          classNames="alert"
                                                          >
                                <div ref={nodeRef} className="randomchar__block">
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
                                </div>
                    </CSSTransition>}
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