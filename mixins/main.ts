import Vue from "vue"
import { TokenRecordsState } from "@/store/model.tokenrecordstate"

const PAGE_COUNT = 30
const FORK_DELIMITER = '|'

export default Vue.extend(
{
    data(){
  
        return {
          pageCount: PAGE_COUNT,
          currentTokenId: "000000000",      
          currentTokenReference: {
              tokenId: null,
              raw: {},
              normative:{},
              informative:{},
              forks: []
          },
          sidebarVisible: false,
          showDlt: false,
          showDisclaimer: true,
          
          tooltips:{
            ttDti: 'Digital Token Identifier: Unique identifier assigned by DTIF for each record',
            ttDtiType: 'Digital Token Identifier Type: Categorization of the digital token identifier within the registry',
            ttShortName: 'Digital Token Short Name: List of one or more short names or ticker symbols used to represent this digital token, as represented in alphanumeric basic Latin characters',
            ttLongName: 'Digital Token Long Name: String containing the full name of the digital token, as represented in alphanumeric basic Latin characters'
          },
    
          sortBy: 'rowIndex',
          sortDesc: false,
    
          selected: [],
    
          isLoadingMore: false,
    
          tableFields: [
            { 
              key: 'tokenIdentifier', 
              label: 'Token Identifier', 
              sortable: false,
              tooltip: 'ISO token identifier'
            },
            { 
              key: 'dtiType', 
              label: 'DTI Type', 
              sortable: true,
              tooltip: 'ISO digital token identifier type'
            },
            { 
              key: 'tokenShortName', 
              label: 'Token Short Name(s)',
              sortable: true,
              tooltip: 'ISO short name for this token'
            },
            { 
              key: 'tokenLongName', 
              label: 'Token Long Name', 
              sortable: true,
              tooltip: 'ISO long name for this token'
            },
            { 
              key: 'auxiliaryDigitalTokenMechanism', 
              label: 'Auxiliary Digital Token Mechanism', 
              sortable: true,
              tooltip: 'ISO Auxiliary Digital Token Mechanism'
            }
          ],
    
           attributeTypes: {
                normative:[
                  'dltType',
                  'genesisBlockHashAlgorithm',
                  'genesisBlockHash',
                  'genesisBlockUtcTimestamp',
                  'auxiliaryDigitalTokenMechanism',
                  'auxiliaryDigitalTokenDistributedLedger',
                  'auxiliaryDigitalTokenTechnicalReference',
                  'functionallyFungibleDtisList'
                ],
                informative:[
                  'longName',
                  'originalLanguageLongName',
                  'shortName',
                  'originalLanguageShortName',
                  'referenceImplementationUrl',
                  'unitMultiplier',
                  'publicDistributedLedgerIndicator',
                  'underlyingAssetExternalIdentifiers',
                  'digitalTokenExternalIdentifiers'
                ]
            }
        }
    },
    
    computed:{

        /**
         * Returns filtered token records for easy access
         *  
        */
        tokenRecordsFiltered(): Array<any> {
        
          const tokenResults = (this.$store.state.tokenrecords as TokenRecordsState).edges      
          return  (tokenResults).map((tok) => {
               return {
                  tokenIdentifier: tok.node.NativeBlockchain.tokenId,
                  dtiType: tok.node.NativeBlockchain.dtiType,
                  tokenShortName: tok.node.NativeBlockchain.shortName,
                  tokenLongName: tok.node.NativeBlockchain.longName,
                  fullTokenRecord: tok.node.NativeBlockchain,
                  auxiliaryDigitalTokenMechanism: tok.node.NativeBlockchain.auxiliaryDigitalTokenMechanism == 'N/A' ? '':tok.node.NativeBlockchain.auxiliaryDigitalTokenMechanism         
               }
          })
    
        },
    
        /**
         * For pagination/infinite scroll
         *  
        */
        pageInfo(): any {
          return (this.$store.state.tokenrecords as TokenRecordsState).pageInfo
        },
    
    },

    methods:{
        /**
         * Shows sidebar and sets currently selected token record
         *  
        */
        activateSelectedRow(record: any): void
        {
            try {
              this.resetSidebarValues()
              this.selected = record
              this.showSidebar(record[0].fullTokenRecord)
            } catch(e) {
              // Capture inherent bug when sorting columns while a row is selected
            }
        },
    
        /**
         * Shows sidebar, removes current selection 
         *  
        */
        showSidebar(tokenObject: any): void {
            this.sidebarVisible = true
            this.currentTokenId = tokenObject.tokenId
            this.currentTokenReference.tokenId = tokenObject.tokenId
            this.currentTokenReference.raw = tokenObject
    
            this.currentTokenReference.normative = this.setNormativeValues(tokenObject)
            this.currentTokenReference.informative = this.setInformativeValues(tokenObject)
    
            //this.currentTokenReference.forks = tokenObject.forks.split("|") ?? []
            this.currentTokenReference.forks = this.setForkEntries(tokenObject.forks)
        },
    
        /**
         * Distills and filters normative attribute types and stores them in an object
         *  
        */
        setNormativeValues(tokenObject: any): any{
            let that = this
            return  Object.fromEntries( 
              (Object.entries(tokenObject)).filter((pair: any) => {
                return (that.attributeTypes.normative).includes(pair[0]) && that.isValid(pair[1])
              })
            )
        },
    
        /**
         * Distills and filters informative attribute types and stores them in an object
         *  
        */
        setInformativeValues(tokenObject: any): any {
            let that = this 
            return  Object.fromEntries( 
              (Object.entries(tokenObject)).filter((pair: any) => {
                return (that.attributeTypes.informative).includes(pair[0]) && that.isValid(pair[1])
              })
            )
        },
    
        /**
         * Attempts to retrieve forks from string
         *  
        */
        setForkEntries(forkString: string): any {
            if(!this.isValid(forkString)){
                return []
            }
    
            if(!forkString.includes(FORK_DELIMITER)) {
              return [forkString]
            } else {
              return forkString.split(FORK_DELIMITER)
            }
        },
    
        /**
         * Hides sidebar, removes current selection 
         *  
        */
        hideSidebar(): void {
          this.resetSidebarValues()
        },
    
         /**
         * Resets all payload values
         *  
        */
        resetSidebarValues(): void {
          this.sidebarVisible = false;
          this.currentTokenId = "000000000"
          this.currentTokenReference.tokenId = null
          this.currentTokenReference.raw = {}
          this.currentTokenReference.forks = []
          this.currentTokenReference.normative = {}
          this.currentTokenReference.informative = {}
        },
    
        isValid(val: any): boolean {
          const illegal = [null, 'N/A', undefined]
          return !illegal.includes(val)
        },
    
        /**
         * Loads more results on scroll down of table
         *  
        */
        async scrollLoadMore(evt: Event): Promise<any>{
    
            evt.preventDefault()
    
            const pageInfo = this.pageInfo;
    
            if(!pageInfo.hasNextPage){  
                return
            }
            
            const scrollTop = (this.$refs.selectableTable as Vue).$el.scrollTop,
                  clientHeight = (this.$refs.selectableTable as Vue).$el.clientHeight,
                  scrollHeight = (this.$refs.selectableTable as Vue).$el.scrollHeight
    
            if(scrollTop + clientHeight >= scrollHeight){
               this.isLoadingMore = true
    
               this.pageCount += PAGE_COUNT
    
               // Check if scroll was triggered AFTER  search was done
               // or if it's just a simple scroll
              if(sessionStorage.getItem('filter_dtitype') == null){
                  await this.$store.dispatch('tokenrecords/getTokenRecords', {
                    first: pageInfo.before ? undefined : this.pageCount
                  })  
              } else {
                  await this.$store.dispatch('tokenrecords/searchTokenRecordsExact', {
                    first: pageInfo.before ? undefined : this.pageCount,
                    dtitype: sessionStorage.getItem('filter_dtitype')
                  })
              }
    
              this.isLoadingMore = false
            }
        },
    },

    /**
     * Reloads on route changes
     *  
     */
    watch: {
        async $route() {
          await this.$nuxt.refresh()
          window.scrollTo(0, 0)
        }
    },

    async asyncData({store, query}) {
        await store.dispatch('tokenrecords/getTokenRecords', {
            after: query.after,
            before: query.before,
            first: query.before ? undefined : PAGE_COUNT,
            last: query.before ? PAGE_COUNT : undefined
          })       
        
    },
})