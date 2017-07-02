import axios from 'axios'

export default {
  fetchPopularRepos (language) {
    const url = window.encodeURI(`
      https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order-desc&type=Repositories
    `.trim())
    console.log(url)

    return axios.get(url)
      .then(response => response.data.items)
  }
}
