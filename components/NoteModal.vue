<template>
    <div>
        <b-modal 
            ok-only
            centered
            id="modal-message-intro" 
            size="lg" 
            header-class="border-bottom-0"
            footer-class="border-top-0"
            @ok="agreeToNote"
            :visible="!hasAgreed"
            title="DTIF Token Registry">{{ message }} <a href="/#home_register_interest" target="_blank"> 
                DTIF to Register your interest.</a>
            </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend(
    {
        data(){
            return {
                message: `DTIF is currently on soft-launch. Token data are in provisional status but the DTI IDs are already permanent. Other functionalities, such as user registration, token registration submission and request for edit, will be available in October go-live. We are continuously enhancing data in this table; if you wish to follow the DTIF progress please consider subscribing to`,
                hasAgreed: false
            }
        },

        methods:{
            agreeToNote(){
                this.hasAgreed = !this.hasAgreed
                sessionStorage.setItem('dtif_registrysearch_agreed', this.hasAgreed)
            }
        },

        mounted(){
            if(sessionStorage.getItem('dtif_registrysearch_agreed', this.hasAgreed)){
                this.hasAgreed = false
            }
        }
        
    });

</script>

<style lang="scss"></style>