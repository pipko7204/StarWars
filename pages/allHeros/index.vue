<template>
  <div class="container" >
    <header>
      <h1>Chose your favorite characters</h1>
    </header>
    <div class="page_container">
      <span>page</span>
      <div
           v-for="pageNumber in pageCount">
        <div>
          {{pageNumber}}
          <input type="radio"
                 name="page"
                 :id="pageNumber"
                 :value="pageNumber"
                 v-model="currentPage"
          >

        </div>

      </div>
      {{currentPage}}
    </div>
      <div
        class="gender"
      v-for="charGender in Object.values(CHARACTER_GENDER)"

      >
        {{charGender}}
        <input type="radio"
               name="gender"
               :id="charGender"
               :value="charGender"
               v-model="gender"
        >

      </div>
    <div class="cards_container">
      <div class="card"
            v-for="{name, id, page} in displayCharecters"
      >
        <img
          :src="getImg( id )" />
        {{name}} {{id}} page: {{page}}
      </div>
    </div>

      <div class="stars"></div>
      <div class="twinkling"></div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {CHARACTER_GENDER, PAGE_LIMIT} from "~/utils/consts";

export default {
  components: {},

  data() {
    return {
      currentPage: 1,
      gender: CHARACTER_GENDER.ALL,
      CHARACTER_GENDER

    }
  },
  async created() {
    await this.fetchCharacters()
  },
  methods: {
    ...mapActions({
      fetchCharacters: "characters/fetchCharacters",
    }),
    getImg( id ) {
      const i = id < 17 ? id : id + 1;
      return `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`;
    },
  },
  computed: {
    ...mapGetters ({
      characters: "characters/getCharacters",
      /* pageCount: "characters/getPageCount" */
    }),
    pageCount() {
      return Math.ceil(this.filteredCharacters.length/PAGE_LIMIT)
    },
    displayCharecters() {
      const offset = (this.currentPage - 1) * PAGE_LIMIT
      return this.filteredCharacters.slice(offset, offset + PAGE_LIMIT)
    },
    filteredCharacters() {

      if (this.gender === CHARACTER_GENDER.ALL) {
        return this.characters
      }
      return this.characters.filter((char) => {
        return char.gender === this.gender
      })

    }
  },
  watch: {
    gender: {
      handler() {
        this.currentPage = 1
      }
    }
  }

}

</script>

<style scoped lang="scss" >
.gender {
  z-index: 2;
}

.page_container {
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.cards_container {
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 100px;
  opacity: 50;
  margin-left: 70px;
}

.card {
  margin: 20px;
  color: gold;
  display: flex;
  flex-direction: column;
  max-width: 250px;
}

header {
  z-index: 1;
  margin: 50px 50px;
  h1 {
    color: gold;
  }
}



.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: bisque;
}




.stars, .twinkling {
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
}

.stars {
  background:#000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
  z-index:0;
}

.twinkling {
  background-image: url(https://i.postimg.cc/CLpNr4PF/twinkling.png);
  animation: 3s twinkle infinite;
  animation-timing-function: linear;
}

@keyframes twinkle {
  from {backrgound-position: 0}
  to {background-position: -100px 0}
}
</style>



