import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/Services';
import setContent from '../utils/setContent';

import './charInfo.scss'

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { getCharacter, clearError, process, setProcess } = useMarvelServices()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onLoaded)
            .then(() => setProcess('confirmed'))

    }
    const onLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}
const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
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
            {
                comics.length > 0 ? (
                    <ul className="char__comics-list">
                        {
                            comics.slice(0, 10).map((item, i) => {
                                return <li key={i} className='char__comics-item'>
                                    {item.name}
                                </li>
                            })
                        }
                    </ul>
                ) : (
                    <div>No comicses here</div>
                )
            }
        </>
    )
}

export default CharInfo