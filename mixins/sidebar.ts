import Vue from 'vue'
import { TokenRecordsState } from '@/store/model.tokenrecordstate'

const AUXILIARY_DIGITAL_TOKEN = 'Auxiliary Digital Token'
const FUNCTIONALLY_FUNGIBLE_TOKEN = 'Functionally Fungible Group of Digital Tokens'
const PAGE_COUNT = 30

export default Vue.extend(
{
      props:{
          tokenId: {
            type: String,
            default: "000000000"
          },
    
          tokenReference: {
            type: Object,
            default: () => {
                return {
                  tokenId: null,
                  raw: {},
                  forks:[],
                  normative:{},
                  informative:{}
                }                    
            }
          },

          pageInfo: {
            type: Object,
            default: () => {
                return {}
            }
          }
      },

      data(){
          return {
            pageCount: PAGE_COUNT
          }
      },
    
      watch:{
        tokenId(currentValue, previousValue){
            if(currentValue != previousValue) this.fetchLinkedRecords()
        }
      },
    
      methods:{
        isEmptyObject(obj: any): boolean {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        },

        isValueAvailable(str: string): boolean {
            return !["N/A","", null].includes(str) 
        },
    
        async fetchLinkedRecords(): Promise<any>{
    
            const store = this.$store

            if(this.tokenReference.raw.dtiType == AUXILIARY_DIGITAL_TOKEN || this.tokenReference.raw.dtiType == FUNCTIONALLY_FUNGIBLE_TOKEN){
                    
                // List of tokens are comma-delimited
                const tokens = this.tokenReference.raw.dtiType == AUXILIARY_DIGITAL_TOKEN ? 
                                this.normativeAttributes.auxiliaryDigitalTokenDistributedLedger : this.fungibleTokens      
                 console.log("Tokens: ", tokens)
    
                await store.dispatch('tokenrecords/searchTokenRecordsInformativeAttributes', {
                  tokenid: tokens,
                  first:  this.$props.pageInfo.before ? undefined : this.pageCount
                })
            } else {
                await store.dispatch('tokenrecords/clearRecentLinkedRecords')
            }
        }
      },
    
      computed:{
    
        /**
        * Returns normative attributes
        *  @returns object 
        */
        normativeAttributes(): any {
            try {
                return this.$props.tokenReference.normative
                
            } catch(e) {
                return false
            }
        },
    
        /**
        * Returns informative attributes
        *  @returns object
        */
        informativeAttributes(): any {
            try {
                return this.$props.tokenReference.informative 
            } catch(e) {
                return false
            }
        },
    
        /**
        * Returns asset identifier
        *  @returns Array 
        */
        underlyingIdentifiers(): any {
            try {
                let chunks = (this.$props.tokenReference.raw.underlyingAssetExternalIdentifiers).split(":")
    
                if(chunks[0] == "N/A"){
                    return false
                }
    
                return chunks
    
            } catch(e) {
                return false
            }
        },
    
        /**
        * Returns digital token identifier
        *  @returns Array 
        */
        digitalIdentifiers(): any {
            try {
                let chunks = (this.$props.tokenReference.raw.digitalTokenExternalIdentifiers).split(":")
    
                if(chunks[0] == "N/A"){
                    return false
                }
    
                return chunks
            } catch(e) {
                return false
            }
        },
        
        /**
        * Returns list of forks
        *  @returns Array 
        */
        forkTokens(): Array<any> {
            try {
              return (this.$props.tokenReference.forks).map((fork: any, forkIndex: number) => {
                  const _att = fork.split(";")
    
                  // Parse UTC Timestamp
                  let utcString = _att[2].replace("Fork Block UTC Timestamp:",'')
    
                  return {
    
                    index: forkIndex,
                  
                    referenceBase: {
                        label:  (_att[0]).split(':')[0],
                        value:  (_att[0]).split(':')[1]
                    },
                    blockHeight:   {
                        label:  (_att[1]).split(':')[0],
                        value:  (_att[1]).split(':')[1]
                    },
                    utcTimestamp:  {
                        label:  (_att[2]).split(':')[0],
                        value:  utcString
                    },
                    blockHash:     {
                        label:  (_att[3]).split(':')[0],
                        value:  (_att[3]).split(':')[1]
                    },
                    hashAlgorithm: {
                        label:  (_att[4]).split(':')[0],
                        value:  (_att[4]).split(':')[1]
                    },
                    consensusResponse: {
                        label:  (_att[5]).split(':')[0],
                        value:  (_att[5]).split(':')[1]
                    },
                    digitalResponse:   {
                        label:  (_att[6]).split(':')[0],
                        value:  (_att[6]).split(':')[1]
                    }
                  }
              })
            } catch(e) {
              return []
            }
    
        },
        /**
        * Returns list of fungible tokens
        *  @returns String 
        */
        fungibleTokens(): any {
            try {
                 return (this.$props.tokenReference.normative.functionallyFungibleDtisList).replace(/;/g,",")
            } catch(e) {
                return false
            }
        },
    
           /**
         * Returns filtered token records for easy access
         *  
        */
        linkedInformativeAttributes(): Array<any> {    
          const tokenResults = (this.$store.state.tokenrecords as TokenRecordsState).linkedtokenrecords      
          return  (tokenResults).map((tok) => {
               return {             
                  tokenId: tok.node.NativeBlockchain.tokenId,              
                  shortName: tok.node.NativeBlockchain.shortName,
                  longName: tok.node.NativeBlockchain.longName, 
                  origLangLongName: tok.node.NativeBlockchain.originalLanguageLongName,
                  origLangShortName: tok.node.NativeBlockchain.originalLanguageShortName,
                  pubDistLedgerIndicator: tok.node.NativeBlockchain.publicDistributedLedgerIndicator,
                  refImplementationUrl: tok.node.NativeBlockchain.referenceImplementationUrl,
                  unitMultiplier: tok.node.NativeBlockchain.unitMultiplier,
                  digTokenExtIdentifiers: tok.node.NativeBlockchain.digitalTokenExternalIdentifiers,
                  undAssetExtIdentifiers: tok.node.NativeBlockchain.underlyingAssetExternalIdentifiers
               }
          })
        }
      },
    
      filters: {    
        displayfloat: function(floatString: string){
          return parseFloat(floatString)
        },
    
        delimitnumber: function(numString: string){
          if(numString == "N/A") return numString
          return new Intl.NumberFormat('en-UK', { maximumSignificantDigits: 3 }).format(parseInt(numString))
        },

        truncatestring: function(str: string) {
            return str.slice(-8)
        }
      }
    })