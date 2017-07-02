import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import PlayerPreview from './PlayerPreview'

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
        <div className='row'>
          {playerOne.name === '' &&
            <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}
            />}

          {playerOne.image !== null &&
            <PlayerPreview
              avatar={playerOne.image}
              id={0}
              username={playerOne.name}>
              <button
                className='reset'
                onClick={this.handleReset.bind(this, 'playerOne')}>
                    Reset
                </button>
            </PlayerPreview>
        }

          {playerTwo.name === '' &&
            <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}
          />}

          {playerTwo.image !== null &&
            <PlayerPreview
              avatar={playerTwo.image}
              id={1}
              username={playerTwo.name}>
              <button
                className='reset'
                onClick={this.handleReset.bind(this, 'playerTwo')}>
                    Reset
                </button>
            </PlayerPreview>
            }
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
