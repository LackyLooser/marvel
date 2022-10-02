class MarvelService {
    _baseUrl = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = process.env.REACT_APP_MARVEL_API_KEY // api key here
    
    getResurce = async(url) =>{
        const res = await fetch(url)

        if(!res.ok){
           throw new Error(`По запросу на ${url} получина ожибка ${res.status}`)
        }
        return await res.json()
    }
    getCharacter = async(id) =>{
        const char = await this.getResurce(`${this._baseUrl}characters/${id}?${this._apiKey}`)
        return this._transformChar(char.data.results[0])
    }
    getAllCharacters = async() => {
        const chars = await this.getResurce(`${this._baseUrl}characters?limit=9&${this._apiKey}`)
        return chars.data.results.map(this._transformChar)
    }

    _transformChar = (char) =>{
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
}

export default MarvelService;