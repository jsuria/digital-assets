<template>        
    <b-card
      :class="'card-main'"
      no-body        
    >
      <template #header>
        <h4 class="mb-0">{{ tokenId }}</h4>
      </template>            

      <b-list-group 
        flush
        style="background-color: rgba(0, 0, 0, 0.03)"
        >                  

        <b-list-group-item v-if="tokenReference.raw.dtiType"> 
            <span>Token Type:</span>
            <span>{{ tokenReference.raw.dtiType }}</span>
        </b-list-group-item>

        <b-list-group-item :class="'group-footer'">&nbsp;</b-list-group-item>       

      </b-list-group>

      <LazyNormativeAttributes
        v-if="!isEmptyObject(normativeAttributes)"
        :params="normativeAttributes"
        :fungible-token-list="fungibleTokens"
      >
      </LazyNormativeAttributes>
      
      <LazyInformativeAttributes
        v-if="!isEmptyObject(informativeAttributes)"
        :params="informativeAttributes"
      ></LazyInformativeAttributes>

   
      <b-list-group
          v-if="underlyingIdentifiers"
          flush 
          style="border-top: none; border-bottom: none"
        >     
        <b-list-group-item :class="'group-title'">
          <span>Underlying Asset External Identifiers</span>
        </b-list-group-item>

        <b-list-group-item :class="'group-footer'">
          <span>{{ underlyingIdentifiers[0] }}:</span>
          <span>{{ underlyingIdentifiers[1] }}</span>
        </b-list-group-item>           
      </b-list-group> 
      
      <b-list-group
          v-if="digitalIdentifiers"
          flush 
          style="border-top: none; border-bottom: none"
        >
        <b-list-group-item :class="'group-title'">
          <span>Digital Token External Identifiers</span>
        </b-list-group-item>

        <b-list-group-item :class="'group-footer'">
          <span>{{ digitalIdentifiers[0] }}:</span>
          <span>{{ digitalIdentifiers[1] }}</span>
        </b-list-group-item>

      </b-list-group>
        
      <!-- FORK ATTRIBUTES -->
      
      <LazyForks
        v-if="forkTokens.length > 0"
        :params="forkTokens"
      ></LazyForks>
        
      <LazyLinkedTokenAttributes
          v-if="linkedInformativeAttributes.length > 0"
          :linked-token-records="linkedInformativeAttributes"
      ></LazyLinkedTokenAttributes>

      
    </b-card>
</template>

<script lang="ts">

import Vue from 'vue'
import sidebar from '@/mixins/sidebar'

export default Vue.extend(
{
    name: "Sidebar",
    mixins: [sidebar]
})

</script>


<style lang="scss">

.card.card-main {

    height: 80vh;
    overflow-y: scroll;

    .card-header {
        border-bottom: none;
    }

    .list-group-item {
        font-size: 14px;         
        background-color: transparent;
        border-bottom: none;
        padding: 3px 20px 3px 20px;

        &.group-title {
          border-top: none;
          border-left:none;
          border-right: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 1);
          margin-left: 15px;
          padding-left: 4px;
          margin-right: 20px;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        &.group-footer {          
          margin-bottom: 10px;
        }

        & > span {
          font-weight: 600;
        }

        & > span + span {
          font-weight: 400;
        }    
    }
}
</style>