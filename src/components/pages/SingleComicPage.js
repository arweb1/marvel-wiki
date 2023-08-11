import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelServices from '../../services/Services';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {loading, error, getComic, clearError} = useMarvelServices();
    const {comicId} = useParams()
    const [comic, setComic] = useState(null);
    
    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const spinner = loading ? <Loader/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <div className="single-comic">
           {spinner}
            {errorMessage}
            {content} 
        </div>
        
    )
}

const View = ({comic}) => {
    const {title, description, thumbnail, pageCount, price} = comic
    return(
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{price}</div>
                </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
            
    )
}

export default SingleComicPage;