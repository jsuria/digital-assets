<template>
 <b-navbar 
    sticky
    toggleable="lg" type="dark" 
    variant="dark" :class="'bg-purple'">
    <b-navbar-brand href="/">
        <img src="~/assets/dtif_logo_mobile.png" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mr-5">

        <b-nav-item-dropdown
            ref="linkRegistry"
            text="Registry" 
            class="mx-2">
          <b-dropdown-item href="/registry-search">Registry Search</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="/latest-news-and-blog" class="mx-2">News and Media</b-nav-item>
        
        <b-nav-item-dropdown
            ref="linkAbout" 
            text="About Us" 
            right 
            class="mx-2">
          <b-dropdown-item
              href="/who-are-we">About DTI Foundation</b-dropdown-item>
          <b-dropdown-item href="/product-advisory-committee">PAC</b-dropdown-item>
          <b-dropdown-item href="/task-force">Task Force</b-dropdown-item>
          <b-dropdown-item href="/send-us-a-message">Contact Us</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
 </b-navbar>
</template>

<script>

export default {

  methods:{
    triggerRegistryMenuClick(){
        this.$refs.linkRegistrySearch.click()
    },

    triggerAboutClick(){
        this.$refs.linkAbout.click()
    },
  }
}
</script>

<style lang="scss">
    .bg-purple {
        background-color: #4C214D !important;
        height: 79px;

        & .nav-link {
            color: #fff !important;
            font-weight: 600;
            text-transform: uppercase;

            /* &:hover {
              color: yellow !important;
            } */
        }

        .nav-item:hover .dropdown-menu {
          display: block;
        }

        .nav-item:hover .nav-link { color: yellow !important;  }
                
        .dropdown-toggle::after {
          display: none;
        }

        ul.dropdown-menu {
         
          background-color: #000;
          top: 56px;

          & li a {
            color: #fff;
            text-transform: uppercase;
            font-size: 13px;

            &:hover {
              background-color: transparent !important;
              color: yellow;
            }
          }

          &:hover {
            display: block;
          }
        }


    }

    /** 
    .navbar-collapse.collapse.show {
       ul.navbar-nav {
          // Mobile dropdown menu
          background-color: #000;
          margin-top: 9px;
          width: 100%;
          box-shadow: 1px 1px 5px #000;
       }
    }
    
    */
</style>