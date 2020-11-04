<template>
  <div>
    <v-app-bar dense src="../assets/1.jpg" dark>
      <v-img
        src="../assets/logo.png"
        contain
        max-height="40"
        max-width="40"
      ></v-img>
      iRestaurant
    </v-app-bar>
    <div class="maybe">
      <h2>Ajouter un restaurant :</h2>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nom"
          :rules="nameRules"
          label="Nom"
          placeholder="Nom du restaurant"
          required
          color="indigo"
        ></v-text-field>

        <v-text-field
          v-model="cuisine"
          :rules="cuisineRules"
          label="Cuisine"
          placeholder="Cuisine du restaurant"
          required
          color="indigo"
        ></v-text-field>
        <v-btn @click="ajouterRestaurant" dark>Ajouter</v-btn>
      </v-form>

      <v-text-field
        label="Rechercher un restaurant"
        type="text"
        placeholder="Nom du restaurant"
        v-model="nomRecherche"
      />
      <h1>Nombre de restaurants : {{ nbRestaurants }}</h1>
      <p>
        <v-slider
          label="Nb de restaurants par page :"
          thumb-label="use"
          min="5"
          max="100"
          step="1"
          v-model="pagesize"
          v-on:input="getDataFromServer()"
        />
      </p>
    </div>

    <template>
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="header">Nom</th>
              <th class="header">Cuisine</th>
              <th class="header">Quartier</th>
              <th class="header">Détail</th>
              <th>Map</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in restaurants" :key="index">
              <td>{{ r.name }}</td>
              <td>{{ r.cuisine }}</td>
              <td>{{ r.borough }}</td>
              <td>
                <v-flex>
                  <Popup :restaurant="r" />
                </v-flex>
              </td>
              <td>
                <v-btn color="green">
                  <v-img
                    src="../assets/icon_map.png"
                    max-height="40"
                    max-width="40"
                  ></v-img
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-footer dark>
        <v-card light
          ><v-btn @click="pagePrecedente()" :disabled="page == 0"
            >Précédent</v-btn
          ></v-card
        >
        <v-card light><v-btn @click="pageSuivante()">Suivant</v-btn></v-card>
        Page courante : {{ page }}
        <v-spacer></v-spacer>
        Raphaël Bolier - Corentin Garnier
      </v-footer>
    </template>
  </div>
</template>



<script>
import Popup from "./Popup";

export default {
  components: {
    Popup,
  },

  name: "Listedesrestaurants",

  props: {
    msg: String,
  },

  data: function () {
    return {
      restaurants: [],
      nbRestaurants: 0,
      nameRules: [(v) => !!v || "Name is required"],
      cuisineRules: [(v) => !!v || "Cuisine is required"],
      nom: "",
      cuisine: "",
      apiBaseURL: "http://localhost:8080/api/restaurants",
      page: 0,
      pagesize: 10,
      nomRecherche: "",
    };
  },

  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getDataFromServer();
  },

  methods: {
    // async obligatoire si utilisation de await, pas la peine sinon
    async getDataFromServer() {
      // On va chercher les données sur le serveur
      /*
                fetch(this.apiBaseURL)
                .then(responseEnJson => {
                    console.log("J'ai eu une réponse JSON du serveur ");
                    return responseEnJson.json();
                }).then(reponseJS => {
                    //console.log(reponseJS.data[0].name);
                    // on initialise le modele des restaurants
                    // avec les data reçues
                    this.restaurants = reponseJS.data;
                }).catch(err => {
                    console.log(err.msg);
                });
                */

      // Avec await
      let url =
        this.apiBaseURL +
        "?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      try {
        let reponseJSON = await fetch(url);
        let reponseJS = await reponseJSON.json();
        this.restaurants = reponseJS.data;
        this.nbRestaurants = reponseJS.count;
      } catch (err) {
        console.log("Erreur dans les fetchs GET " + err.msg);
      }
    },

    async detailRestaurant() {},

    async supprimerRestaurant(id) {
      try {
        console.log(id);
        let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
          method: "DELETE",
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant supprime : " + reponseJS.msg);
        this.getDataFromServer(); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs DELETE " + err.msg);
      }
    },

    async ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();
      this.$refs.form.validate();

      let donneesFormulaire = new FormData();
      donneesFormulaire.append("nom", this.nom);
      donneesFormulaire.append("cuisine", this.cuisine);

      let reponseJSON = await fetch(this.apiBaseURL, {
        method: "POST",
        body: donneesFormulaire,
      });

      let reponseJS = await reponseJSON.json();
      console.log(reponseJS.msg);

      this.nom = "";
      this.cuisine = "";
      this.emplacement = "";

      this.getDataFromServer(); // on rafraichit
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    pageSuivante() {
      console.log("page suivante");
      this.page++;
      this.getDataFromServer();
    },
    pagePrecedente() {
      console.log("page precedente");
      this.page--;
      this.getDataFromServer();
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>