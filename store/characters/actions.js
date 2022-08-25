export default {
  async fetchCharacters({commit}) {
    for(let i = 1; i <= 9; i++) {
      const requestCharacters = await this.$axios.$get(`https://swapi.dev/api/people/?page=${i}`)
      const responcedCharacters = await requestCharacters.results
      for (let j = 1; j <= responcedCharacters.length; j++) {
        responcedCharacters[j - 1].id = j !== 10 ? Number(`${i-1}` + `${j}`) : Number(`${i}` + '0')
        responcedCharacters[j - 1].page = i
      }
      commit('updateCharacters', responcedCharacters)
    }
  },
}
