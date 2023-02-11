import React from "react";

class Battle extends React.Component {
    constructor() {
        super()
        this.state = {
            battle: {
                playerOne: null,
                playerTwo: null,
                isBattlebtn: 0
            },
            isWinner: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let { battle } = this.state
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => {
                if (e.target[0].id === 'one') {
                    battle.playerOne = data
                    battle.playerOne.score = data.followers * 20 + data.public_repos
                    battle.isBattlebtn++
                } else {
                    battle.playerTwo = data
                    battle.playerTwo.score = data.followers * 20 + data.public_repos
                    battle.isBattlebtn++
                }

                this.setState(battle)
            })

    }

    handleDel = (e) => {
        let { battle } = this.state
        if (e.target.id === 'one') {
            battle.playerOne = null
            battle.isBattlebtn--
        } else {
            battle.playerTwo = null
            battle.isBattlebtn--
        }
        this.setState(battle)
    }

    handleBattle = () => {
        let { playerOne, playerTwo } = this.state.battle
        if (playerOne.login === playerTwo.login) {
            return alert('Cannot perform battle of same user,Please try different user')
        }

        if (playerOne.score === playerTwo.score) {
            return alert(`Cannot perform battale both user have same score ${playerOne.score} `)
        }
        this.setState({ isWinner: true })
    }

    render() {
        let { playerOne, playerTwo, isBattlebtn } = this.state.battle
        let ar = []
        ar[0] = playerOne
        ar[1] = playerTwo
        return (
            <>
                {
                        this.state.isWinner ?
                            <>
                                <div >
                                    <div className="flex justify-center">
                                        <div className="flex justify-around width-80">

                                            {ar.sort((a, b) => b.score - a.score).map((player) => {
                                                if (player.score === Math.max(playerOne.score, playerTwo.score)) {
                                                    return <CardUI data={player} result={'Winner'} /> ? <CardUI data={player} result={'Winner'} /> : 'fetching'
                                                } else {
                                                    return <CardUI data={player} result={'Loser'} />
                                                }

                                            })
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-center btn pointer">
                                        < button onClick={() => this.setState({
                                            battle: {
                                                playerOne: null,
                                                playerTwo: null,
                                                isBattlebtn: 0
                                            },
                                            isWinner: false
                                        })}> Reset</button >
                                    </div>
                                </div>


                            </>
                            :
                            <div >
                                <div className="margin-8">
                                    <h2 className="center font-2 fWeight-300 marginB-2">Instruction</h2>
                                    <ol className="flex">
                                        <li>
                                            <h3>Enter two Github users</h3>
                                            <i className="fa-solid fa-user-group"></i>
                                        </li>
                                        <li>
                                            <h3>Battle</h3>
                                            <i className="fa-solid fa-jet-fighter"></i>
                                        </li>
                                        <li>
                                            <h3>Winner</h3>
                                            <i className="fa-solid fa-trophy"></i>
                                        </li>
                                    </ol>
                                </div>
                                {/* input */}
                                <div className="marginB-8">
                                    <h2 className="center font-2 fWeight-300 marginB-3">Players</h2>
                                    <div className="player-input">
                                        <div>
                                            <label>Player One</label>
                                            {!playerOne ? <InputUI listner={this.handleSubmit} playerNum={'one'} /> : <Profile info={playerOne} playerNum={'one'} handledel={this.handleDel} />}
                                        </div>

                                        <div>
                                            <label>Player Two</label>
                                            {!playerTwo ? <InputUI listner={this.handleSubmit} playerNum={'two'} /> : <Profile info={playerTwo} playerNum={'two'} handledel={this.handleDel} />}
                                        </div>
                                    </div>
                                    <div className="flex justify-center btn pointer">
                                        {isBattlebtn > 1 ? <button onClick={this.handleBattle} className='battle-btn pointer'>Battle</button> : ''}
                                    </div>
                                </div>

                            </div>

                }
            </>
        )
    }
}



// taking input from user for battle
function InputUI(props) {
    let { listner, playerNum } = props
    return (
        <>
            <form onSubmit={listner}>
                <input id={playerNum} type={'text'} placeholder="github username" />
                <button type="submit" className="pointer">submit</button>
            </form>
        </>
    )
}


function Profile(props) {
    let { info, playerNum, handledel } = props
    return (
        < div className="flex align-center justify-space profile">
            <div className="flex align-center">
                <figure>
                    <img src={info.avatar_url} alt="pic" />
                </figure>
                <a href={info.html_url}>{info.login}</a>
            </div>
            <p className="pointer" id={playerNum} onClick={handledel}>×</p>
        </div >
    )
}


function CardUI(props) {
    let { data, result } = props
    return (
        <div className="battle-card" key={data.score}>
            <div className="flex flex-column align-center">
                <h2>{result}</h2>
                <figure className="width-64">
                    <img src={data.avatar_url} alt="pic" />
                </figure>
                <p>Score: {data.score}</p>
                <a href={data.html_url}>{data.login}</a>
            </div>
            <ul>
                <li><i className="fa-solid fa-user"></i> {data.login} </li>
                <li><i className="fa-solid fa-compass"></i> {data.location || 'null'}</li>
                <li><i className="fa-solid fa-users"></i>{data.followers} followers</li>
                <li><i className="fa-regular fa-user-group"></i> {data.following} following</li>
                <li>
                    <i class="fa-solid fa-code"></i>
                    {data.public_repos} repositories
                </li>
            </ul>
        </div>
    )

}




export default Battle