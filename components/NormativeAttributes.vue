<template>
      <b-list-group 
          flush 
          style="border-top: none; border-bottom: none"
          >     

          <b-list-group-item :class="'group-title'">
            <span>Normative Attributes</span>                      
          </b-list-group-item>            

          <b-list-group-item 
            v-if="params.dltType">
            <span>Technology:</span>
            <span>{{ params.dltType }}</span>
          </b-list-group-item>     

          <b-list-group-item v-if="params.genesisBlockHashAlgorithm">
            <span>Genesis Block Hash Algorithm:</span>
              <span>{{ params.genesisBlockHashAlgorithm }}</span>
          </b-list-group-item>            

          <b-list-group-item v-if="params.genesisBlockHash">
            <span>Genesis Block Hash:</span>
              <span>{{ params.genesisBlockHash }}</span>
          </b-list-group-item>            

          <b-list-group-item v-if="params.genesisBlockUtcTimestamp">
            <span>Genesis Block UTC Timestamp:</span>
              <span>{{ params.genesisBlockUtcTimestamp }}</span>
          </b-list-group-item>        

          <b-list-group-item v-if="params.auxiliaryDigitalTokenMechanism">
            <span>Auxiliary Digital Token Mechanism:</span>
              <span>{{ params.auxiliaryDigitalTokenMechanism }}</span>
          </b-list-group-item>            

            <b-list-group-item v-if="params.auxiliaryDigitalTokenDistributedLedger">
            <span>Auxiliary Digital Token Distributed Ledger:</span>
              <span>{{  params.auxiliaryDigitalTokenDistributedLedger }}</span>
          </b-list-group-item>

            <b-list-group-item v-if="params.auxiliaryDigitalTokenTechnicalReference">
            <span>Auxiliary Digital Token Technical Reference:</span>
              <span>{{  params.auxiliaryDigitalTokenTechnicalReference }}</span>
          </b-list-group-item>

          <b-list-group-item v-if="fungibleTokenList">
            <span>Functionally Fungible DTI List:</span>
              <span style="word-break: break-all">{{ fungibleTokenList }}</span>
          </b-list-group-item>

          <b-list-group-item :class="'group-footer'">&nbsp;</b-list-group-item>

    </b-list-group>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name:"NormativeAttributes",
        props:{
            params:{
                type: Object,
                default: () => {
                    return {}
                }
            },
            fungibleTokenList:{
                default: null
            }
        }
    })
</script>