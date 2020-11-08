<template>
  <div class="image">
    <h1>Voici l'emplacement de votre restaurant : {{ restaurant.name }}</h1>
    <div class="map">
      <v-container>
        <v-row>
          <v-col>
            <l-map
              style="height: 500px; width: 500px"
              :zoom="zoom"
              :center="center"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
              @update:bounds="boundsUpdated"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="LMarker"></l-marker>
            </l-map>
          </v-col>
          <v-col>
            <br><br>
            Voici les notes attribuées a ce restaurant : <br />
            <ul v-for="grade in restaurant.grades" :key="grade">
              <li>{{ grade.score }}, {{ grade.grade }}</li>
            </ul></v-col
          >
        </v-row>
      </v-container>
    </div>
    <router-link :to="{ name: 'Acceuil' }" tag="button"> Retour </router-link>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Detail",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {},
  data: function () {
    return {
      restaurant: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

      center: latLng(65.41322, -1.219482),
      bounds: null,
      zoom: 14,
      LMarker: latLng(65.41322, -1.219482),
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
        this.center = latLng(
          this.restaurant.address.coord[1],
          this.restaurant.address.coord[0]
        );
        this.LMarker = this.center;
      });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>

<style scoped>
.image {
  background-image: url("../assets/1.jpg");
  height: 100%;
  width: 100%;
  color: aliceblue;
  text-align: center;
}
</style>