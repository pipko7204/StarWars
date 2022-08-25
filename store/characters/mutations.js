export default {
  updateCharacters(state, responcedCharacters) {
    state.characters.push(...responcedCharacters)
    console.log(state)
  },
}
