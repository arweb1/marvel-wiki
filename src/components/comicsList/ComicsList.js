import {useState, useEffect} from "react"
import { Link } from "react-router-dom";

import useMarvelServices from '../../services/Services';

import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelServices(),
          [comicsList, setComicsList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(0),
          [ended, setEnded] = useState(false)

    useEffect(() => {
        updateChar(offset, true)
    }, [])

    const updateChar = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onLoaded)
    }

    const onLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList < 9){
            ended = true
        }
        
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8 );
        setEnded(ended)
    }

    function renderItems(arr){
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader /> : null

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long" onClick={() => updateChar(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;