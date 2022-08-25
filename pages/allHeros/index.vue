<template>
  <div class="container" >
    <header>
      <h1>Chose your favorite characters</h1>
    </header>
    <div class="page_container">
      <span>page</span>
      <div
           v-for="pageNumber in pageNumbers">
        <div>
          {{pageNumber.page}}
          <input type="radio"
                 name="page"
                 :checked="pageNumber.checked"
                 :id="pageNumber.page"
                 v-on:click="logID(pageNumber.page)"
          >
          <div></div>
        </div>

      </div>
    </div>

    <div class="cards_container">
      <div class="card"
            v-for="{name, id, page} in characters"
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
export default {
  components: {},

  data() {
    return {
      request: null,
      pageNumbers: [
        {page: 1,
          checked: 'checked',
      }, {page: 2,
      }, {page: 3,
      }, {page: 4,
      }, {page: 5,
      }, {page: 6,
      }, {page: 7,
      }, {page: 8,
      }, {page: 9,
      }]

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
    logID(id) {
      console.log(id)
    },

  },
  computed: {
    ...mapGetters ({
      characters: "characters/getCharacters",
    })
  }

}

</script>

<style scoped lang="scss" >

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



