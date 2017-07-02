import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img className='avatar 'src={props.avatar} alt={`Avatar for ${props.username}`} />
      </div>
      <h2 className='username'>@{props.username}</h2>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
            Reset
        </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  handleChange (event) {
    const value = event.target.value
    this.setState(() => {
      return {
        username: value
      }
    })
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(
        this.props.id,
        this.state.username
    )
  }
  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor='username'>{this.props.label}</label>
        <input
          type='text'
          id='username'
          placeholder='github username'
          autoComplete='off'
          onChange={this.handleChange.bind(this)} />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playerOne: {
        name: '',
        image: null
      },
      playerTwo: {
        name: '',
        image: null
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (id, username) {
    console.log(id, username)
    this.setState(() => {
      var newState = {}
      newState[id] = {
        name: username,
        image: `https://github.com/${username}.png?size=200`
      }
      return newState
    })
  }

  handleReset (id) {
    this.setState(() => {
      var newState = {}
      newState[id] = {
        name: '',
        image: null
      }
      return newState
    })
  }

  render () {
    const { playerOne, playerTwo } = this.state
    const match = this.props.match

    return (
      <div>
        <pre>{JSON.stringify(this.state, 2, null)}</pre>
        <div className='row'>
          {playerOne.name === '' &&
            <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}
            />}

          {playerOne.image !== null &&
            <PlayerPreview
              avatar={playerOne.image}
              id='playerOne'
              username={playerOne.name}
              onReset={this.handleReset.bind(this)}
            />}

          {playerTwo.name === '' &&
            <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}
          />}

          {playerTwo.image !== null &&
            <PlayerPreview
              avatar={playerTwo.image}
              id='playerTwo'
              username={playerTwo.name}
              onReset={this.handleReset.bind(this)}
            />}
        </div>

        {playerOne.image && playerTwo.image &&
        <Link className='button'
          to={{
            pathname: `${match.url}/results/${playerOne.name}:${playerTwo.name}`
          }}>Battle</Link>
        }

      </div>
    )
  }
}

export default Battle
