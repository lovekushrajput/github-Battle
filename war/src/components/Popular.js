import React from "react";
let button = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]

class Popular extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            language: 'All',
            loader: true
        }

    }

    componentDidMount() {
        this.dataFetch()
    }

    dataFetch = () => {
        fetch(
            `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.language}&sort=stars&order=desc&type=Repositories`
        )
            .then((res) => res.json())
            .then((data) => this.setState({ data: data.items.sort((a, b) => b.stargazers_count - a.stargazers_count), loader: false }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.language !== this.state.language) {
            this.dataFetch()
        }
    }

    handleClick = (e) => {
        this.setState({ language: e.target.innerText, loader: true })
    }

    render() {


        return (
            <>
                <div className="flex justify-center ">
                    {/* displaying all languages btn */}
                    <div className="width-34 flex justify-space">
                        {
                            button.map((btn, i) => {
                                return (<a href="#" key={i} className={this.state.language === btn ? 'active' : ''} onClick={this.handleClick}>{btn}</a>)
                            })
                        }
                    </div>
                </div>


                <CardsUI data={this.state.data} loader={this.state.loader} />

            </>

        )
    }
}



function CardsUI(props) {
    if (!props.data) {
        return <div className="center fetch">Fetching Repositories...</div>
    } else {
        return props.loader ?
            <div className="center fetch">Fetching Repositories...</div> :
            < div className="cards flex  justify-around wrap">
                {
                    props.data.map((d, i) => <Card info={d} key={i} index={i} />)
                }
            </div >

    }
}


function Card(props) {
    let { info, index } = props
    return (
        <div key={index} className='card'>
            <div className="flex flex-column align-center">
                <p>#{index + 1}</p>
                <figure className="width-64">
                    <img src={info.owner.avatar_url} alt="pic" />
                </figure>
                <a href={info.html_url} className='active'>{info.owner.login}</a>
            </div>
            <ul className="flex flex-column">
                <li className="fWeight-600">
                    <i className="fa-solid fa-user"></i>
                    {info.owner.login}
                </li>

                <li>
                    <i className="fa-solid fa-star"></i>
                    {info.stargazers_count} stars
                </li>

                <li>
                    <i className="fa-solid fa-code-fork"></i>
                    {info.forks} forks
                </li>

                <li>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    {info.open_issues_count} open issues


                </li>




            </ul>
        </div>
    )
}

export default Popular;
