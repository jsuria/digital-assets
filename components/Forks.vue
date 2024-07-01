<template>
    <div>
        <b-list-group 
            flush
            :class="'list-group-sub'"  
            >
            <b-list-group-item :class="'group-title'">
                    <h4>Fork Attributes</h4>                      
            </b-list-group-item>
        </b-list-group> 

         <div class="accordion" role="tablist" style="background-color: rgba(0,0,0,.03)">
            <b-card 
                no-body 
                class="mb-1 card-sub"
                v-for="(fork, index) in params" 
                :key="index"
            >
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block 
                        v-b-toggle="`accordion-${index}`" 
                        variant="white">Hash Ending: ****{{ fork.blockHash.value | truncatestring }}</b-button>
                </b-card-header>
                <b-collapse 
                    :id="`accordion-${index}`" 
                    accordion="my-accordion" 
                    :visible="index == 0"      
                    role="tabpanel">
                    <b-list-group>
                         <b-list-group-item>
                            <span>{{ fork.referenceBase.label }}:</span>
                            <span>{{ fork.referenceBase.value }}</span>
                        </b-list-group-item>            

                        <b-list-group-item>
                            <span>{{ fork.blockHeight.label }}:</span>
                            <span>{{ fork.blockHeight.value | displayfloat }}</span>
                        </b-list-group-item>  

                        <b-list-group-item>
                            <span>{{ fork.utcTimestamp.label }}:</span>
                            <span>{{ fork.utcTimestamp.value }}</span>
                        </b-list-group-item>
                        <b-list-group-item>
                            <span>{{ fork.blockHash.label }}:</span>
                            <span style="word-break: break-all">{{ fork.blockHash.value }}</span>
                        </b-list-group-item>    
                            <b-list-group-item>
                            <span>{{ fork.hashAlgorithm.label }}:</span>
                            <span>{{ fork.hashAlgorithm.value }}</span>
                        </b-list-group-item>    
                        <b-list-group-item>
                            <span>{{ fork.consensusResponse.label }}:</span>
                            <span>{{ fork.consensusResponse.value }}</span>
                        </b-list-group-item>     
                        <b-list-group-item :class="'group-footer'">
                            <span>{{ fork.digitalResponse.label }}:</span>
                            <span>{{ fork.digitalResponse.value }}</span>
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
            params: {
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