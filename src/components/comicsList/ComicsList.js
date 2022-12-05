import './comicsList.scss';
import { NavLink } from "react-router-dom";
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Loader from '../loader/Loader';
import Error from '../error/Error';

const ComicsList = () => {
    const {isLoading, isError,getAllComics} = useMarvelService()
    const [comics, setComics] = useState([])
    const [isNewComicsLoading, setIsNewComicsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(null)
    useEffect(()=>{
        updateComics()
    },[])
    const onLoaded = ({newComicsList, total}) =>{
        setIsNewComicsLoading(false)
        setComics(comics => comics = [...comics, ...newComicsList])
        setOffset( offset => offset = offset + 8)
        setTotal(total)
    }

    const updateComics = (offset) =>{
        setIsNewComicsLoading(true)
        getAllComics(offset,8)
            .then(onLoaded)
            
    }
    const loading = isLoading && comics.length === 0 ? <Loader/> : null
    const content = !isError && comics ? <View comics={comics}/> : null
    const error = !isLoading && isError ? <Error/> : null
    return (
        <div className="comics__list">
            {loading}
            {content}
            {error}
            <button onClick={()=>updateComics(offset)} disabled={isNewComicsLoading} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
const View = ({comics})=>{
    const comicsRender = comics.map((comic, i) =>{
        return (
            <li className="comics__item" key={i}>
            <NavLink to={`/comics/${comic.id}`}>
                <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{comic.title}</div>
                <div className="comics__item-price">{comic.price}</div>
            </NavLink>
        </li>
        )
    })
    return (
        <ul className="comics__grid">
                {comicsRender}
            </ul>
    )
}

export default ComicsList;