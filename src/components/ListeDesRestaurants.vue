<template>
  <div>
    <form v-on:submit="ajouterRestaurant">
      <label> Nom : <input type="text" required v-model="nom" /> </label>
      <label>
        Cuisine : <input type="text" required v-model="cuisine" />
      </label>
      <button>Ajouter</button>
    </form>
    <h2>
      <label
        >Recherche par nom:
        <input
          type="text"
          v-model="nomRecherche"
          @input="getDataFromServer()"
        />
      </label>
    </h2>
    <h1>Nombre de restaurants : {{ nbRestaurants }}</h1>
    <p>Page courante : {{ page }}</p>
    <p>
      Nb de restaurants par page :
      <input
        type="range"
        min="5"
        max="100"
        step="1"
        v-model="pagesize"
        v-on:input="getDataFromServer()"
      />
      {{ pagesize }}
    </p>
    <button @click="pagePrecedente()" :disabled="page == 0">Précédent</button>
    <button @click="pageSuivante()">Suivant</button>

    <template>
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Cuisine</th>
              <th>Quartier</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in restaurants" :key="index"
                @click="supprimerRestaurant( item )">
              <td>{{ r.name }}</td>
              <td>{{ r.cuisine }}</td>
              <td>{{ r.borough }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </div>
</template>



<script>
export default {
  name: "Listedesrestaurants",
  props: {
    msg: String,
  },
  data: function () {
    return {
      restaurants: [],
      nbRestaurants: 0,
      nom: "",
      cuisine: "",
      apiBaseURL: "http://localhost:8080/api/restaurants",
      page: 0,
      pagesize: 100,
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
    async supprimerRestaurant(id) {
      try {
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