<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#1761a0" dark v-bind="attrs" v-on="on"> Details </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Détail du restaurant : {{ restaurant.name }}
        </v-card-title>

        <v-card-text>
          Voici les differentes notes pour ce restaurant :
          <li v-for="grade in restaurant.grades" :key="grade" class="centered">
            {{ grade.score }}, {{ grade.grade }}
          </li>
          Voici l'adresse exacte du restaurant : {{ restaurant.address.building }}, {{ restaurant.address.street }} , {{ restaurant.borough }} {{ restaurant.address.zipcode }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Retour </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["restaurant"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>