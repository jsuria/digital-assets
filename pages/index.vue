<template>
  <div class="container pb-5 pt-1 mw-100">

    <!--    <div class="row app-title">          
          <div class="col-12">
              <h4 class="text-center my-2">Registry Search</h4>
          </div>
        </div> -->

        <div class="row justify-content-center">          

          <div :class="[sidebarVisible ? 'col-10 col-md-8' : 'col-11']">

            <transition name="fade">
              <b-card   
                  v-show="showDisclaimer"     
                  bg-variant="lessmasculine" 
                  text-variant="dark"                         
                  header-tag="header"                      
                  :class="[showDisclaimer ? 'disclaimer fade-in' : 'disclaimer fade-out']">
                  <template #header>
                    <span class="d-inline-block">
                      <h6 class="mb-0 ml-2">Notice</h6>
                    </span>
                    <span class="d-inline-block float-right mr-2">
                      <a @click="showDisclaimer = !showDisclaimer">[Dismiss]</a>
                    </span>
                  </template>
                  <b-card-text>
                    <p class="message mx-2">
                        These DTIs have been assigned based on the draft of the <u>DTI ISO 24165 Standard</u>, which is scheduled for publication in the third quarter of 2021. All data in the registry is subject to further verification and potential updates in the standard. We are continuously adding and verifying the normative and informative data.
                    </p>
                    <p class="message mx-2">
                        If you would like us to assign an identifier or have any other question, please send us a message, or register your interest to receive updates from DTIF.
                    </p>

                    <p class="message mx-2">
                      
                        <a class="mr-5" href="/#home_register_interest" target="_blank">Register your interest</a>
                        <a class="mr-5" href="/send-us-a-message" target="_blank">Send us a message</a>
                      
                    </p>
                  </b-card-text>
              </b-card>
            </transition>

            <!-- -->   
              <LazySearchFilter
                  :pageInfo="pageInfo" 
                  :pageCount="pageCount"
              /> <!-- -->

              <b-table
                  v-if="tokenRecordsFiltered.length > 0"
                  sticky-header
                  selectable
                  ref="selectableTable"
                  :id="'registry-search-table'"
                  @row-selected="activateSelectedRow"
                  :items="tokenRecordsFiltered" 
                  :fields="tableFields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :class="'table registry-search table-hover mx-auto bg-white'"
                  :select-mode="'single'"
                  @scroll.native="scrollLoadMore($event)"
                  @sort-changed="hideSidebar" 
                >
                  <template #cell(selected)="{ rowSelected }">
                      <template v-if="rowSelected">
                        <span aria-hidden="true">&check;</span>
                        <span class="sr-only">Selected</span>
                      </template>
                      <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                        <span class="sr-only">Not selected</span>
                      </template>
                  </template>

                  <template v-slot:head()="data">                     
                    <span v-b-tooltip.hover.top='data.field.tooltip'>
                      {{ data.label }}           
                    </span>                   
                  </template>

                </b-table>
                
                <b-alert 
                    v-else 
                    show variant="warning">No matches found.</b-alert>

                <div class="position-absolute load-more" v-show="isLoadingMore">
                      Loading...
                </div>

               <!--  <note-modal /> -->

          </div>    
          <div class="col-4" v-show="sidebarVisible">

              <div class="display-block">
            
                <sidebar
                    :tokenId="currentTokenId"
                    :tokenReference="currentTokenReference"
                />
              </div>

              <br/>

              <div class="display-block close-icon">
                  <a @click="hideSidebar">[CLOSE]</a>
              </div> 
            
          </div>                

        </div>


  </div>
  
</template>

<script lang="ts">

import Vue from 'vue'
import main from '@/mixins/main'

export default Vue.extend(
{
    name: "Main",
    mixins: [main]
})
</script>

<style lang="scss">

  * {
    font-family: 'Titillium Web';
  }

  body {
    background-color: #e7e9ec;
  }  
  
  a {
    &.pagination {
        background-color: #B6A6B5;
        padding: 2px 15px;
        color: #fff;
        font-weight: 600;

        &:hover {
            color: yellow;
        }    

        &.pagination-next {          
          border-radius: 0px 20px 20px 0px;    
        }

        &.pagination-prev {          
          border-radius: 20px 0px 0px 20px;    
        }
    }    
  }
  

  .row {
     &.app-title {
        background-color: #B6A6B5;
     
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 20px;

        & h4 {
          color: #fff;
          font-weight: 300;
        }
     }
  } 

  .bg-lessmasculine {
    background-color: #F8EFF7 !important;
  }

  .card.disclaimer {
    height: auto;
    width: 100%;
    overflow-y: hidden;
    margin-bottom: 10px;

    .card-header {
      a {
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
      }

      h6 {
        font-weight: 600;
      }      
    }

    .card-text {
        p.message {
            font-size: 14px;

            a {
              color: unset;
              text-decoration: underline;
            }
        }
    }

    .btn {
      float: right;
      width: 100px;
      height: 30px;
      line-height: 15px;
      background-color: #4C214D;
      font-size: 14px;
    }
  }

  .table.registry-search {

      max-height: 75vh !important;

      & thead th, & tbody td, & tbody tr th {
        font-size: 14px;         
        padding-top: 8px;
        padding-bottom: 8px;
        text-align: center;
      }

      & thead th {
        font-weight: 600;
        a {
          color: #000;
        }
      }

      & tbody tr th {
        font-weight: 400;
      }

  }


  .close-icon {
    left: 270px;
    top: 14px;

    a {
      cursor: pointer;
      text-transform: none;
      color: unset;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .position-absolute.load-more {
    bottom: 16px;
    left: 15px;
    background-color: #b47fae;
    padding: 10px;
    width: 96.3%;
    opacity: 0.8;
    color: #fff;
    text-align: center;
  }

  .fade-in {
	  -webkit-animation: fade-in 300ms ease-in both;
	          animation: fade-in 300ms ease-in both;
  }

  .fade-out {
    -webkit-animation: fade-out 300ms ease-out both;
            animation: fade-out 300ms ease-out both;
  }

  /* ----------------------------------------------
  * Generated by Animista on 2021-6-17 11:19:59
  * Licensed under FreeBSD License.
  * See http://animista.net/license for more info. 
  * w: http://animista.net, t: @cssanimista
  * ---------------------------------------------- */

  /**
  * ----------------------------------------
  * animation fade-in
  * ----------------------------------------
  */
  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

/**
 * ----------------------------------------
 * animation fade-out
 * ----------------------------------------
 */
@-webkit-keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }


</style>
