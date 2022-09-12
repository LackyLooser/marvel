import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';
class RandomChar extends Component {
    state = {
        char: {}
    }
    marvelService = new MarvelService()
    componentDidMount(){
        this.updateChar()
    }

    updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService.getCharacter(id).then(char => this.setState({char}))
    }
    render(){
        const {char:{name,decoration,thumbnail,homepage,wiki}} = this.state
        const noneImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const styleImg = !noneImg ? 'cover' : 'contain'
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img style={{objectFit: styleImg}} src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                        {decoration}
                        </p>
                        <div className="randomchar__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;