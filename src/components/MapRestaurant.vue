<template>
<div> OUI </div>
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