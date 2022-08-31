import {PAGE_LIMIT} from "~/utils/consts";

export default {
  updateCharacters(state, {responcedCharacters, count}) {
    state.characters.push(...responcedCharacters)
    state.pageCount = Math.ceil(count/PAGE_LIMIT)

    console.log(state)
  },
  setCharacterLike(state, id) {
    const card = state.characters.find((char) => char.id === id);
    if (card) {
      card.isLiked = !card.isLiked
    }
  }
}
