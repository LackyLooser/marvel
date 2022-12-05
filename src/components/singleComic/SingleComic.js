import './singleComic.scss';


const SingleComic = ({data}) => {
const {title,description,pageCount,language,price,thumbnail} = data
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">Price: {price}</div>
            </div>
        </>
    )
}

export default SingleComic;