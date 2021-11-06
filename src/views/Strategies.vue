<template>
  <div>
    <b-container>
      <b-row>
        Nombre de strategies en cours : {{strategies.length}}
      </b-row>
      <b-row v-for="strategy in strategies" :key="strategy.id">
        <b-container>
          <b-row>
            <b-col>
              {{strategy.id}}
            </b-col>
            <b-col>
              {{strategy.symbol}}
            </b-col>
            <b-col>
              {{strategy.strategy_type}}
            </b-col>
            <b-col>
              {{strategy.n_currencies}}
            </b-col>
            <b-col>
              <b-button class="danger" @click="unregister_strategy(strategy)">Supprimer</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
      <b-row class="text-center">
        <b-button v-b-modal.modal-1 class="btn-success">
          Ajouter une strategie
        </b-button>
        <b-modal id="modal-1" ref="modal-1" title="Ajouter une stratégie">
        <b-container fluid>
          <b-row class="my-1" key="symbol">
            <b-col sm="4">
              <label for="symbol">Symbole :</label>
            </b-col>
            <b-col sm="8">
              <b-form-input id="symbol" v-model="new_strategy.symbol" type="text"></b-form-input>
            </b-col>
          </b-row>
           <b-row class="my-1" key="n_currencies">
            <b-col sm="4">
              <label for="n_currencies">Quantité (€) :</label>
            </b-col>
            <b-col sm="8">
              <b-form-input id="n_currencies" v-model="new_strategy.n_currencies" type="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" key="strategy_type">
            <b-col sm="4">
              <label for="strategy_type">Type de strategie (€) :</label>
            </b-col>
            <b-col sm="8">
              <b-form-input id="strategy_type" v-model="new_strategy.strategy_type" type="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" key="optimize">
            <b-col sm="4">
              <label for="optimize">Optimiser :</label>
            </b-col>
            <b-col sm="8">
              <b-form-checkbox id="optimize" v-model="new_strategy.optimize"></b-form-checkbox>
            </b-col>
          </b-row>
        </b-container>
         <template #modal-footer="{ ok, cancel }">
            <b-button class="btn-success" @click="register_strategy">Ajouter</b-button>
            <b-button size="sm" variant="danger" @click="cancel()">Annuler</b-button>
          </template>
        </b-modal>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import backend from "../api/backend";

export default {
  name: 'Strategies',
  components: {

  },
  methods:{
    unregister_strategy: function( strategy )
    {
      backend.unregister_strategy_by_id( strategy ).then(
          this.strategies.forEach( (strategyIter, index) => {
            if ( strategyIter.id == strategy.id)
            {
              return index;
            }
          })).then( index => {
            this.strategies.splice(index,1)
          })
    },
    register_strategy: function( )
    {
      backend.register_strategy( this.new_strategy )
          .then( strategy => {
            console.log( strategy)
            this.new_strategy.id = strategy.id
          })
          .then(() => {
            this.strategies.push( this.new_strategy)
            this.$refs['modal-1'].hide()
          })
    }
  },
  async created() {
    this.strategies = await backend.get_strategies()
    console.log( this.strategies)
  },
  data(){
    return {
      strategies:[],
      new_strategy:{
        symbol:'BITCOIN',
        n_currencies: 100,
        strategy_type: 'moving_average',
        id: '',
        optimize: false
      }
    }
  }
}
</script>
