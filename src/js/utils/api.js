import axios from 'axios'

const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const PARAMS = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username}${PARAMS}`)
    .then((user) => user.data)
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${PARAMS}&per_page=100`)
    .then((repos) => repos.data)
}

function getStarCount (repos) {
  return repos.reduce((count, repo) => repo.stargazers_count + count, 0)
}

function calculateScore (profile, repos) {
  let followers = profile.followers
  let totalStars = getStarCount(repos)

  return (followers * 3) + totalStars
}

function handleError (error) {
  console.log(error)
  return null
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    let profile = data[0]
    let repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort((a, b) => b.score - a.score)
}

export default {
  battle (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos (language) {
    const url = window.encodeURI(`
      https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories
    `.trim())

    return axios.get(url)
      .then(response => response.data.items)
  }
}
