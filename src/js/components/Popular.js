import React from 'react'
import PropTypes from 'prop-types'

import api from '../utils/api'

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, i) => {
        return (
          <li key={i} className='popular-item'>
            <div className='popular-rank'>#{i + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`} />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propsTypes = {
  repos: PropTypes.array.isRequired
}
/**
  Stateless Functional Component
 */
function SelectedLanguage (props) {
  const languages = [
    'All',
    'JavaScript',
    'Ruby',
    'Java',
    'CSS',
    'Python'
  ]

  return (
    <ul className='languages'>
      {languages.map((lang, i) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            key={i}
            onClick={props.onSelect.bind(null, lang)}
              >
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  updateLanguage (lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })

    api.fetchPopularRepos(lang)
      .then(repos => {
        this.setState(() => {
          return { repos }
        })
      })
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  render () {
    return (

      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />

        { !this.state.repos
          ? <p>Loading...</p>
          : <RepoGrid repos={this.state.repos} />}

      </div>
    )
  }
}

export default Popular
