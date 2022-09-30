import state from "~/store/characters/state";

export default {
  async fetchCharacters({commit, getters}) {
    let count = 0;
    let i = 1;
    do{const requestCharacters = await this.$axios.$get(`https://swapi.dev/api/people/?page=${i}`)
      const responcedCharacters = requestCharacters.results
      count = requestCharacters.count
      for (let j = 1; j <= responcedCharacters.length; j++) {
        responcedCharacters[j - 1].id = j !== 10 ? Number(`${i-1}` + `${j}`) : Number(`${i}` + '0')
        responcedCharacters[j - 1].isLiked = false
      }
      commit('updateCharacters', {responcedCharacters, count: requestCharacters.count})
      i += 1
    } while (getters.getCharacters.length < count)

  },
  changeLikeStatus({ commit }, id) {
    commit('setCharacterLike', id);
  },

}
