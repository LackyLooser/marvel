import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import useMarvelService from "../services/MarvelService"
import Error from '../components/error/Error';
import Loader from '../components/loader/Loader';
import AppBanner from "../components/appBanner/AppBanner"

const SinglePage = ({Component, dataType}) => {
    const {isLoading,isError, getComic, getCharacter} = useMarvelService()
    const [data,setData] = useState('')
    const  { id } = useParams();
    useEffect(() =>{
        switch (dataType) {
            case 'comics':
                getComic(id)
                    .then(setData)
                break;
            case 'characters':
                getCharacter(id)
                    .then(setData)
                break;
        }
        
    },[])

    const error = isError && !isLoading ? <Error/> : null
    const loading = isLoading ? <Loader/> : null
    const content = !isLoading && !isError && data ? <Component data={data}/> : null
    return (
        <>
            <AppBanner/>
            <div className="single-comic" style={isError ? {'gridTemplateColumns': '650px auto'} :null}>
                {error}
                {loading}
                {content}
            <a href="#" className="single-comic__back" style={isError ? {'justifySelf': 'start'} :null}>Back to all</a>
        </div>
        </>
    )
}
export default SinglePage;