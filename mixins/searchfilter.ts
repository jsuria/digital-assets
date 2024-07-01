import Vue from 'vue'

const RESET_PAGE_COUNT = 30
const PAGE_COUNT = RESET_PAGE_COUNT

export default Vue.extend(
{
    props: {
        pageInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    data(){
        return {
            pageCount: PAGE_COUNT,
            showDlt: false,
            showDTIStatus: false,

            textDTI: "",
            textShortname: "",
            textLongname: "",
            textAuxilliary: "",

            selectDTIType: null,
            dateRange: null,

            selectOptions: {
                dtiType: [
                    { text: 'DTI Type', value: null }, 
                    { text: 'Auxiliary digital token', value: "auxiliary digital token" }, 
                    { text: 'Native digital token', value: "native digital token" }, 
                    { text: 'Distributed ledger without a native digital token', value: "distributed ledger without a native digital token" }, 
                    { text: 'Functionally fungible group of digital tokens', value: "functionally fungible group of digital tokens" },                         
                ],
                dtiStatus:[
                    { text: 'DTI Status',  value: null },
                    { text: 'Provisional', value: 'provisional' }
                ]                   
            }
        }
    },

    mounted(){
        sessionStorage.removeItem('filter_dtitype')
    },

    methods: {

        /**
        * Resets form to default state
        *  @returns void 
        */
        async resetForm(evt: Event): Promise<any> {                                

            evt.preventDefault()

            this.textDTI = ""
            this.textShortname = ""
            this.textLongname = ""
            this.textAuxilliary = ""

            this.selectDTIType = null

            const store = this.$store

            sessionStorage.removeItem('filter_dtitype')
            
            await store.dispatch('tokenrecords/getTokenRecords', {
                 first: RESET_PAGE_COUNT
            }); 
        },

        /**
        * Performs search on selection change
        *  @returns void
        */
        async doSearchOnDtiSelect(): Promise<void>{
            const store = this.$store;
            
            if(this.selectDTIType != null){

                // selectDTIType could possibly be null...
                sessionStorage.setItem('filter_dtitype', this.selectDTIType!)

                let _payload:Payload = {
                    dtitype: null,
                    tokenid: null,
                    shortname: null,
                    longname: null,
                    auxiliarymechanism: null,
                    first: RESET_PAGE_COUNT,
                    last: null
                }

                _payload['dtitype'] = this.selectDTIType

                if(this.textDTI != ''){
                    _payload['tokenid'] = this.textDTI
                }

                if(this.textShortname != ''){
                    _payload['shortname'] = this.textShortname
                }

                if(this.textLongname != ''){
                    _payload['longname'] = this.textLongname
                }

                if(this.textAuxilliary != ''){
                    _payload['auxiliarymechanism'] = this.textAuxilliary
                }

                await store.dispatch('tokenrecords/searchTokenRecordsExact', _payload);
            
            } else {
                sessionStorage.removeItem('filter_dtitype')
                const store = this.$store
            
                await store.dispatch('tokenrecords/getTokenRecords', {
                    first: RESET_PAGE_COUNT
                }); 
            }
        }, 
        /**/
        
        /**
        * Sets actual download URL depending on environment
        *  @returns Array 
        */
        async doSearch(evt: Event): Promise<any> {
        
            evt.preventDefault();

            const store = this.$store;

            let _payload:Payload = {
                dtitype: null,
                tokenid: null,
                shortname: null,
                longname: null,
                auxiliarymechanism: null,
                first: null,
                last: null
            }

            if(this.textDTI != ''){
                _payload['tokenid'] = this.textDTI
            }

            if(this.textShortname != ''){
                _payload['shortname'] = this.textShortname
            }

            if(this.textLongname != ''){
                _payload['longname'] = this.textLongname
            }

            if(this.textAuxilliary != ''){
                _payload['auxiliarymechanism'] = this.textAuxilliary
            }

            if(this.selectDTIType){
                _payload['dtitype'] = this.selectDTIType
                sessionStorage.setItem('filter_dtitype', this.selectDTIType!)
            } else {
                _payload['dtitype'] = undefined
            }

            _payload['first'] =  this.$props.pageInfo.before ? undefined : this.pageCount
            _payload['last'] = this.$props.pageInfo.before ? this.pageCount : undefined

            if(this.selectDTIType){
                await store.dispatch('tokenrecords/searchTokenRecordsExact', _payload);
            } else {
                await store.dispatch('tokenrecords/searchTokenRecords', _payload);
            }
        } 
    }
})