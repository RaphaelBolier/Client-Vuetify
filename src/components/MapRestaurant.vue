<template>
<div class="image"> <h1> Voici la carte centrée sur le restaurant : {{ restaurant.name }} </h1> </div>
</template>

<script>
export default {

  
  name: "Detail",

  props: {},
  data: function () {
    return {
      restaurant: null,
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
      });
  },
};
</script>

<style scoped>
.image{
  background-image: url('../assets/1.jpg');
  height: 100%;
  width: 100%;
  color: aliceblue;
  text-align: center;
}
</style>