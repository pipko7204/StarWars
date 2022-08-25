import state from "~/store/characters/state";

export default {
  getCharacters: (state) => state.characters,
  getPageCount: (state) => state.pageCount,
}
