import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

import api from '../utils/api'
import PlayerPreview from './PlayerPreview'

const ERROR_MESSAGE = 'Looks like there was an error. Check that all users exist on Github.'

function Profile (props) {
  var info = props.info

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
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
      return <Loading />
    }

    if (error) {
      return <p>{error}</p>
    }

    return (
      <div className='row'>
        {players.map((player, i) => {
          return (
            <Player
              key={i}
              label={'#' + (i + 1)}
              score={player.score}
              profile={player.profile}
            />
          )
        })}
      </div>
    )
  }
}

export default Results
