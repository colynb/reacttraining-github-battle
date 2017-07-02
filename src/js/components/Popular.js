import React from 'react'
import PropTypes from 'prop-types'

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
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  updateLanguage (lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    })
  }
  render () {
    return (
      <SelectedLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect={this.updateLanguage} />
    )
  }
}

export default Popular
