<template>
    
    <div>
        <b-list-group 
            :class="'list-group-sub'"  
        > 
           <b-list-group-item :class="'group-title'">
              <h4>Linked Tokens Informative Attributes</h4>                      
          </b-list-group-item>            
        </b-list-group>
        <div class="accordion" role="tablist" style="background-color: rgba(0,0,0,.03)">
            <b-card 
                no-body 
                class="mb-1 card-sub"
                v-for="(linkedRecord, index) in linkedTokenRecords" 
                :key="linkedRecord.tokenId"
                :title="linkedRecord.tokenId" 
            >
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block 
                        v-b-toggle="`accordion-${linkedRecord.tokenId}`" 
                        variant="white">{{ linkedRecord.tokenId }}</b-button>
                </b-card-header>
                <b-collapse 
                    :id="`accordion-${linkedRecord.tokenId}`" 
                    accordion="my-accordion" 
                    :visible="index == 0"      
                    role="tabpanel">
                    <b-list-group>
                        <b-list-group-item v-if="isValueAvailable(linkedRecord.shortName)">
                            <span>Short Name:</span>
                            <span>{{ linkedRecord.shortName }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.longName)">
                            <span>Long Name:</span>
                            <span>{{ linkedRecord.longName }}</span>
                        </b-list-group-item>     

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.origLangShortName)">
                            <span>Original Language Short Name:</span>
                            <span>{{ linkedRecord.origLangShortName }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.origLangLongName)">
                            <span>Original Language Long Name:</span>
                            <span>{{ linkedRecord.origLangLongName }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.pubDistLedgerIndicator)">
                            <span>Public Distributed Ledger Indicator:</span>
                            <span>{{ linkedRecord.pubDistLedgerIndicator }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.refImplementationUrl)">
                            <span>Reference Implemenentation URL:</span>
                            <span>{{ linkedRecord.refImplementationUrl }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.unitMultiplier)">
                            <span>Unit Multiplier:</span>
                            <span>{{ linkedRecord.unitMultiplier | delimitnumber }}</span>
                        </b-list-group-item>

                        <b-list-group-item v-if="isValueAvailable(linkedRecord.digTokenExtIdentifiers)">
                            <span>Digital Token External Identifiers:</span>
                            <span>{{ linkedRecord.digTokenExtIdentifiers }}</span>
                        </b-list-group-item>

                        <b-list-group-item 
                            v-if="isValueAvailable(linkedRecord.undAssetExtIdentifiers)" 
                            :class="'group-footer'">
                            <span>Underlying Asset External Identifiers:</span>
                            <span>{{ linkedRecord.undAssetExtIdentifiers }}</span>
                        </b-list-group-item>

                    </b-list-group>
                </b-collapse>
            </b-card>

        </div>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue'
    import sidebar from '@/mixins/sidebar'

    export default Vue.extend({

        name:"Forks",
        mixins: [sidebar],

        props:{
            linkedTokenRecords: {
                type: Array,
                default: () => { return [] }
            }
        }
    })
</script>

<style lang="scss">

  .list-group.list-group-sub {
        border-top: none; 
        border-bottom: none; 
        background-color: rgba(0, 0, 0, 0.03);

        .list-group-item {
            border-bottom: none !important;
            
            h4 {
                font-size: 18px;
            }
        }
    }
    .card.card-sub {
        border-left: none;
        border-right: none;
        background-color: transparent;
        border-radius: 0;

        .list-group-item {
            font-size: 14px;         
            background-color: transparent;
            border: none;
            padding: 3px 20px 3px 20px;

            &.group-title {
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

        button {
            text-align: left;
            padding: 0 12px 0 12px;
            border-radius: 0;
            width: 100%;
            font-size: 14px;
            
            &:focus {
                outline: none;
            }
        }
    }
</style>