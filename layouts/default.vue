<template>
  <div>
  <!--   <navbar-native></navbar-native> -->
    <div class="mb-5 h-100">&nbsp;</div>
    <div v-show="renderApp">
      <Nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'DTIF Registry Search',
        iframeHost: `https://${document.location.hostname}/token-registry-search/`,
        renderApp: false
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'DTIF Registry Search web application'
          }
        ]
      }
    },

    methods:{
        /**
         * Prevent direct access, always use iframe in Wordpress page
         *  
        */
        forceRedirectToIframe(){
            if ( window.location === window.parent.location ) {	  
              // The page is not in an iframe	
              window.location.href = this.iframeHost
            } else {
              this.renderApp = true
            }
        }
    },

    /**
     * Do forced redirect when attempting to access 
     * app directly.
     * Do check before DOM is mounted
     *  
    */
    beforeMount(){
        this.forceRedirectToIframe()
    }
    
  }
</script>

<style>
  html {
    font-family: 'Titillium Web', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  body {
    background-color: #e7e9ec;
  }  

* {
    font-family: 'Titillium Web';
  }

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

</style>
