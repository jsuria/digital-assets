import { ActionContext } from 'vuex'
import ApolloClient, { gql } from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { Queries } from '@/store/queries'
import { TokenRecordsState } from '@/store/model.tokenrecordstate'

const getDomain = () => {
    // Localhost
    if(document.location.hostname == 'localhost'){
      return ''
    } else {
      return ''
    }
}

// Apollo Client
const client = new ApolloClient({
  uri: `${getDomain()}/graphql`,
  fetch
})

// Defining the state
export function state(): TokenRecordsState {
  return {    
    edges:[],
    linkedtokenrecords:[],

    pageInfo: {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
    },
    
    tokenrecord: {
      node: {
        NativeBlockchain: {
            tokenId: '',
            dltType: '',
            dtiType: '',
            fieldGroupName:'',
            genesisBlockHash:'',
            genesisBlockHashAlgorithm:'',
            genesisBlockUtcTimestamp:'',
            longName:'',
            originalLanguageLongName:'',
            originalLanguageShortName:'',
            publicDistributedLedgerIndicator:'',
            referenceImplementationUrl:'',
            shortName:'',
            unitMultiplier:'', 
            underlyingAssetExternalIdentifiers: '',
            digitalTokenExternalIdentifiers: '',
            auxiliaryDigitalTokenDistributedLedger: '',
            auxiliaryDigitalTokenMechanism: '',
            auxiliaryDigitalTokenTechnicalReference: '',
            functionallyFungibleDtisList: '',
            forks: '',
            dtiStatus:''
        },
        slug: '',
        id: ''
      }
    }
  }
}

// Mutations (methods that will fetch our data)
export const mutations = {
  /**
    * Adds edges/results to store
    */
  setTokenRecords(state: TokenRecordsState, tokenrecords: any[]) {    
    state.edges = tokenrecords
  },

  /**
    * Add pagination info to store
    */
  setPageInfo(state: TokenRecordsState, pageInfo: any) {
    state.pageInfo = pageInfo
  },    

  /**
  * Set aside a different store for linked records
  */
  setLinkedRecords(state: TokenRecordsState, tokenrecords: any[]){
    state.linkedtokenrecords = tokenrecords 
  },
  
  
  /** 
  * Need to reset the linked token store since only some token records apply to this
  */
  resetLinkedRecords(state: TokenRecordsState){
    state.linkedtokenrecords = []
  }
}

/*
 We have two actions: getting the list of posts and the other for getting an individual post. Both use our GQL queries and the Apollo client to make requests to our WordPress site for data, and then they commit the data to the state by calling the mutations. Now we have our store, the last piece we need is to wire it up to our views.
 */
 
const tokenRecordSearchQuery = Queries.tokenRecordSearch
const tokenRecordsQuery = Queries.tokenRecordsList
const tokenRecordsSearchExactQuery = Queries.tokenRecordSearchEqualTo
const tokenRecordsInformativeAttributesQuery = Queries.tokenRecordsInformativeAttributes

export const actions = {
  /** 
    * Queries graphql for listing
    */
  async getTokenRecords(
    { commit }: ActionContext<TokenRecordsState, TokenRecordsState>,
    variables: any    
  ) {
    const result = await client.query({
      query: tokenRecordsQuery,
      variables,      
    })
    
    const {edges, pageInfo } = result.data?.tokenRecords
    
    commit('setTokenRecords', edges)
    commit('setPageInfo', pageInfo)
  },

  /** 
    * Queries graphql for linked records
    */
  async searchTokenRecordsInformativeAttributes(
    { commit }: ActionContext<TokenRecordsState, TokenRecordsState>,
    variables: any    
  ){
    const result = await client.query({
      query: tokenRecordsInformativeAttributesQuery,
      variables      
    })

    const { edges, pageInfo } = result.data?.tokenRecords
    
    commit('setLinkedRecords', edges)    
    commit('setPageInfo', pageInfo)
  },

  /** 
    *  Clears the linked records store
    */
  clearRecentLinkedRecords(
    { commit }: ActionContext<TokenRecordsState, TokenRecordsState>
  ){
    commit('resetLinkedRecords')
  },

  /** 
    * Queries for for token records using exact values
    */
  async searchTokenRecordsExact(
    { commit }: ActionContext<TokenRecordsState, TokenRecordsState>,
    variables: any    
  ){
    const result = await client.query({
      query: tokenRecordsSearchExactQuery,
      variables      
    })

    const { edges, pageInfo } = result.data?.tokenRecords
    
    commit('setTokenRecords', edges)    
    commit('setPageInfo', pageInfo)
  },
  
  /** 
    * Queries for general search
    */
  async searchTokenRecords(
    { commit }: ActionContext<TokenRecordsState, TokenRecordsState>,
    variables: any    
  ){
    const result = await client.query({
      query: tokenRecordSearchQuery,
      variables      
    })

    const { edges, pageInfo } = result.data?.tokenRecords
    
    commit('setTokenRecords', edges)    
    commit('setPageInfo', pageInfo)
  },
}