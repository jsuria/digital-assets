<template>
    <b-list-group
            flush 
            style="border-top: none; border-bottom: none"
          >     

        <b-list-group-item :class="'group-title'">
            <span>Informative Attributes</span>                      
        </b-list-group-item>            

        <b-list-group-item v-if="params.longName">
            <span>Long Name:</span>
            <span>{{ params.longName }}</span>
        </b-list-group-item>

        <b-list-group-item v-if="params.shortName">
            <span>Short Name:</span>
            <span>{{ params.shortName }}</span>
        </b-list-group-item>

        <b-list-group-item v-if="params.originalLanguageLongName">
            <span>Original Language Long Name:</span>
            <span>{{ params.originalLanguageLongName }}</span>
        </b-list-group-item>                  


        <b-list-group-item v-if="params.originalLanguageShortName">
            <span>Original Language Short Name:</span>
            <span>{{ params.originalLanguageShortName }}</span>
        </b-list-group-item>

        <b-list-group-item v-if="params.referenceImplementationUrl">
            <span>Token Reference URL:</span>
            <span>{{ params.referenceImplementationUrl }}</span>
        </b-list-group-item>            

        <b-list-group-item v-if="params.unitMultiplier">
            <span>Unit Multiplier:</span>
            <span>{{ params.unitMultiplier | delimitnumber }}</span>
        </b-list-group-item>         

        <b-list-group-item v-if="params.publicDistributedLedgerIndicator">
            <span>Public Distributed Ledger Indicator:</span>
            <span>{{ params.publicDistributedLedgerIndicator }}</span>
        </b-list-group-item>

        <b-list-group-item :class="'group-footer'">&nbsp;</b-list-group-item>
    </b-list-group>

</template>

<script lang="ts">
    import Vue from 'vue'
    import sidebar from '@/mixins/sidebar'

    export default Vue.extend({

        name:"InformativeAttributes",
        mixins: [sidebar],

        props:{
            params: {
                type: Object,
                default: () => { return {} }
            }
        }
    })
</script>