<template>
  <h1>All characters {{page}}</h1>
<!--  <div class="container" >
    <header>
      <h1>Chose your favorite characters</h1>
    </header>
    <CardsSpace/>
    <div class="cards_container">
      <div class="card"
           v-for="{name, id} in characters"
      >
        <img
          :src="getImg( id )" />
        {{name}} {{id}}
      </div>
    </div>

    <div class="stars"></div>
    <div class="twinkling"></div>
  </div>-->
</template>

<script>
export default {
  computed: {
    page () {
      return this.$route.params.page
    }
  }
}

</script>

<style>

</style>


