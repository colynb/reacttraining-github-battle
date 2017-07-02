import React from 'react'

import api from '../utils/api'
const ERROR_MESSAGE = 'Looks like there was an error. Check that all users exist on Github.'

function PlayerProfile (props) {
  const score = props.player.score
  const avatarUrl = props.player.profile.avatar_url
  const username = props.player.profile.login
  return (

    <div className='column'>
      <img className='avatar 'src={avatarUrl} alt={`Avatar for ${username}`} />
      {score}
    </div>
  )
}

class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      players: [],
      loading: true,
      error: null
    }
  }
  componentDidMount () {
    const usernames = this.props.match.params.players.split(':')
    api.battle(usernames).then(function (players) {
      this.setState(() => {
        return {players, loading: false, error: players === null ? ERROR_MESSAGE : null}
      })
    }.bind(this))
  }
  render () {
    const error = this.state.error
    const players = this.state.players
    const loading = this.state.loading

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>{error}</p>
    }

    return (
      <div className='row'>
        {players.map((player, i) => <PlayerProfile key={i} player={player} />)}
      </div>
    )
  }
}

export default Results
