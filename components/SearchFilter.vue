<template>
  
    <b-form inline 
            :class="'search-filter'" 
            @submit="doSearch($event)"
            >

        <b-input-group class="mb-2">
         
            <b-input-group-prepend>
          
                <b-button
                    disabled>
                    <b-icon icon="filter"></b-icon>
                </b-button>
                <b-modal 
                    id="modal-message-download" 
                    size="lg" 
                    title="Registry Search Content Download"
                    ok-only
                    centered
                    header-class="border-bottom-0"
                    footer-class="border-top-0"
                    >
                        Please contact the <a href="/send-us-a-message" target="_blank">DTIF Admin</a> if you wish to download Registry Search content in CSV file format.
                    </b-modal>
            </b-input-group-prepend>

            <b-form-input        
                placeholder="Filter by Digital Token Identifier"                              
                v-model="textDTI"
                id="text-search-filter"
                ref="input"
            ></b-form-input>            

            <b-form-select            
                :options="selectOptions.dtiType"                
                v-model="selectDTIType" 
                @change="doSearchOnDtiSelect"
            ></b-form-select>

             <b-form-input        
                placeholder="Filter by Short Name"                              
                v-model="textShortname"
                id="text-search-filter"
                ref="input"
            ></b-form-input>            

             <b-form-input        
                placeholder="Filter by Long Name"                              
                v-model="textLongname"
                id="text-search-filter"
                ref="input"
            ></b-form-input>            

              <b-form-input        
                placeholder="Filter by Auxiliary Digital Token"                              
                v-model="textAuxilliary"
                id="text-search-filter"
                ref="input"
            ></b-form-input>            

            <b-input-group-append>
                <b-button @click="resetForm($event)">
                    <b-icon icon="x"></b-icon>
                </b-button>
                <b-button type="submit">
                    <b-icon icon="search"></b-icon>
                </b-button>
            </b-input-group-append>

        </b-input-group>
                    
    </b-form>
   
</template>

<script lang="ts">

import Vue from 'vue'
import searchfilter from '@/mixins/searchfilter'

export default Vue.extend({
    name: "SearchFilter",
    mixins: [searchfilter]
})
</script>

<style lang="scss">

    .form-inline {
        &.search-filter {
            display: unset; 
            flex-flow: unset;

            & > div.input-group {
                box-shadow: 1px 1px 5px rgb(0 0 0 / 10%);
                border: none;
            }

            input, select, label.form-control {
                font-size: 14px;
            }

            input.form-control, select.custom-select {
                height: unset;
            }

            .input-group-prepend, .input-group-append {
                a.btn-secondary,button.btn-secondary {
                    background-color: #e9ecef;
                    border: 1px solid #ced4da;
                    color: #495057;
                }
            }

            .b-form-datepicker {
                height: 35px;
                label {
                    line-height: 28px;
                }
            }

            .dropdown {
                & button {
                    &.btn.dropdown-toggle {
                        height: 35px;                        
                        padding: 7px;
                        border: 1px solid #ced4da;
                        border-radius: 5px 0px 0px 5px;
                        border-right: none;
                        background-color: #fff;                        

                        &:empty::after {                            
                            margin-left: 0;
                            color: #B6A6B5;                            
                        }
                    }
                }
            }

            .button-tips {
                
                height: 35px;                        
                padding: 7px;
                font-size: 14px;
                border: 1px solid #ced4da;
                background-color: #fff;                        
                color: #B6A6B5;                

                &.end {
                    border-radius: 0px 5px 5px 0px;
                }

                &.mid {               
                    border-radius: 0;     
                    border-left: none;
                    border-right: none;
                }
                                
            }            
        }
    }

    .b-dropdown-form {
        label {
            font-size: 14px;
            text-align: left;
        }
    }

    ul.dropdown-menu {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }

    .modal-dialog {
        a {
            text-decoration: underline;
            color: #4C214D !important;
        }

        .btn {
            background-color: #4C214D;
            width: 100px;
        }
    }

    .filter-provisional {
        background-color: #fff;
        width: 150px;
        border: 1px solid #ced4da;
        border-left: none;
        border-right: none;

        &.disabled {
            background-color: unset !important;
        }

        label.custom-control-label {
            margin-top: 7px;
            font-size: 14px;

            &::before {
                left: -1.25rem !important;
                top: 0.15em !important;
            }

            &::after {
                top: calc(0.15rem + 2px) !important;
                left: calc(-1.25rem + 2px);
            }
        }
    }
    
</style>
