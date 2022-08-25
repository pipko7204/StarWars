<template>
  <div class="container">
    <ul>
      <li>
<!--      v-for="character in characters"-->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CharactersCard',
  props: {characters: {type: Array}},
}
</script>


<style lang="scss" scoped>
.cards_container {

  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  width: 80vmax;
}

.card {
  margin: 10px;
  background: red;
  width: 200px;
  height: 350px;
  z-index: 1;
}

</style>

