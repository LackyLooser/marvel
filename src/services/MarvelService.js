import { useFetch } from "../components/hooks/useFetch"

const useMarvelService = () =>{
    const _baseUrl = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = process.env.REACT_APP_MARVEL_API_KEY // api key here
    
    const {isLoading, isError, request, clearError} = useFetch()
    
    const getCharacter = async(id) =>{
        const char = await request(`${_baseUrl}characters/${id}?${_apiKey}`)
        return _transformChar(char.data.results[0])
    }

    const getCharacterByName = async(name) =>{
        const char = await request(`${_baseUrl}characters?name=${name}&${_apiKey}`)
        return char.data.results
    }

    const getAllCharacters = async( offset = 0) => {
        const chars = await request(`${_baseUrl}characters?limit=9&offset=${offset}&${_apiKey}`)
        return {
            newCharList: chars.data.results.map(_transformChar),
            total: chars.data.total
        }
    }

    const getComic = async(id) =>{
        const comic = await request(`${_baseUrl}comics/${id}?${_apiKey}`)
        return _transformComic(comic.data.results[0])
    }
    
    const getAllComics = async( offset = 0, limit = 8) => {
        const comics = await request(`${_baseUrl}comics?limit=${limit}&offset=${offset}&${_apiKey}`)
        return {
            newComicsList: comics.data.results.map(_transformComic),
            total: comics.data.total
        }
    }

    const _transformComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }
    const _transformChar = (char) =>{
        return {
            id: char.id,
            name: char.name,
            comics: char.comics.items,
            description: char.description ? char.description : <h2>description is not</h2>,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
    return {isLoading, isError, clearError, getCharacter, getAllCharacters, getComic, getAllComics, getCharacterByName}
}

export default useMarvelService;