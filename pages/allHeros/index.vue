<template>
  <div class="container" >
    <header>
      <h1>Chose your favorite characters</h1>
    </header>

    <div class="header-panel">
        <input type="text"
               class="input-text"
               placeholder="search your favorite character"
               v-model="search"
        >
      <div class="genders_container">
        <div
          class="gender"
          v-for="charGender in Object.values(CHARACTER_GENDER)"
        >
          <label>
            <div class="gender_container"
                 v-bind:class="{active: charGender === gender}"

            >
              {{charGender}}
              <input type="radio"
                     class="button"
                     name="gender"
                     :id="charGender"
                     :value="charGender"
                     v-model="gender"
              >
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="page_container">
      <div
        v-for="pageNumber in pageCount"

      >
        <label>
          <div class="pageNumber_container"
               v-bind:class="{active: pageNumber === currentPage}"

          >
            {{pageNumber}}
            <input type="radio"
                   name="page"
                   class="button"
                   :id="pageNumber"
                   :value="pageNumber"
                   v-model="currentPage"

            >
          </div>
        </label>
      </div>

    </div>
    <div class="cards_container">
      <div class="cards_container-card"
            v-for="char in displayCharecters"
      >
        <img
          :src="getImg( char.id )" />
        <div class="cards_container-description">
          <h3>{{char.name}}</h3>

          <div class="heart "
            v-on:click="changeLikeStatus(char.id)"
            :class="{active: char.isLiked}"
          >

          </div>

        </div>
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
      CHARACTER_GENDER,
      search: '',
    }
  },
  async created() {
    await this.fetchCharacters()
  },
  methods: {
    ...mapActions({
      fetchCharacters: "characters/fetchCharacters",
      changeLikeStatus: "characters/changeLikeStatus",
    }),
    getImg( id ) {
      const i = id < 17 ? id : id + 1;
      return `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`;
    },

  },
  computed: {
    ...mapGetters ({
      characters: "characters/getCharacters",

    }),
    pageCount() {
      return Math.ceil(this.filteredCharacters.length/PAGE_LIMIT)
    },
    filteredByLike() {
      return this.characters.filter((char) => {
        return char.isLiked === true
      })
    },
    displayCharecters() {
      const offset = (this.currentPage - 1) * PAGE_LIMIT
      return this.filteredCharacters.slice(offset, offset + PAGE_LIMIT)
    },
    filteredBySearch() {
      return  this.characters.filter((char) => {
        return  char.name.toLowerCase().includes(this.search.toLowerCase());
      })
    },
    filteredCharacters() {
      if (this.gender === CHARACTER_GENDER.ALL) {
        return this.filteredBySearch
      }

      return this.filteredBySearch.filter((char) => {
        return char.gender === this.gender
      })

    },



  },
  watch: {
    gender: {
      handler() {
        this.currentPage = 1
      }
    },
  }
}

</script>

<style scoped lang="scss" >


.heart {
  width: 15px;
  height: 26px;
  background-color: gray;
  box-shadow: -1px 0px 2px #444;
  border-radius: 50px 50px 0 0;
  transform: rotate(315deg);

  &:before {
    position: absolute;
    width: 26px;
    height: 15px;
    left: 0;
    bottom: 0;
    content: "";
    background-color: gray;
    box-shadow: 0px 3px 3px #444444;
    border-radius: 0 50px 50px 0;

  }
  &.active {
    background: gold;
    &:before {
      background: gold;
    }
  }
}
.heart:hover:before, .heart:hover{
  box-shadow:none;
}


.input-text {
  padding-left: 15px;
  width: 300px;
  height: 25px;
  border: 2px solid gold;
  border-radius: 10px;
  z-index: 3;
  outline: none;
  background: black;
  color: gold;
  &:focus {
    border-color: bisque;
    &::placeholder {
      opacity: 50%;
    }
  }
  &::placeholder {
    color: gold;

    }
}

.header-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90em;
}

.active {
  background: bisque;
  color: black;
}

.pageNumber_container, .gender_container {
  z-index: 3;
  border: 2px solid gold;
  border-radius: 5px;
  margin: 5px;
  width: 25px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0px;
  padding-left:10px;
  &:hover {
    background: gold;
    cursor: pointer;
    color: black;
  }
}
.gender_container {
  width: auto;
  height: 25px;
}

.page_container, .genders_container {
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
}

.button {
  width: 0px;
  height: 0px;
}

.gender {
  z-index: 2;
}



.cards_container {
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 15px 50px;
  opacity: 50;
  margin-left: 70px;

  border-radius-bottom-left: 10px;
  border-radius-bottom-right: 10px;
}

.cards_container-card {
  margin: 20px;
  color: gold;
  display: flex;
  flex-direction: column;
  max-width: 250px;
}

.cards_container-description {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  padding: 0px 20px 0px 5px;
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
  color: gold;
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



