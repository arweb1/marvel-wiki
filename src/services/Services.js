import { useHttp } from "../components/hooks/http.hook";

const useMarvelServices = () => {
    const {loading, error, request, clearError, process, setProcess} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2d3729419321618c3bfaab2c651a2cc9';
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`
            ${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    }
    
    const getCharacter = async (id) => {
        const res = await request(`
            ${_apiBase}characters/${id}?${_apiKey}
        `)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
        )
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(
            `${_apiBase}comics/${id}?${_apiKey}`
        )
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No info about page count',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : `Not available now`,
            description: comics.description || "There is no description"
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 210)}... ` : 'Here no descr available',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        loading, 
        error, 
        request,
        clearError,
        process,
        setProcess,
        getAllCharacters, 
        getCharacter,
        getAllComics,
        getComic
    }
}

export default useMarvelServices