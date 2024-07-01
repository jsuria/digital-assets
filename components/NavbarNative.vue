<template>
    
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-purple">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                 <img src="~/assets/dtif_logo_mobile.png" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"  aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="main_nav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle nav-link dropdown-toggle text-white font-weight-bold my-3 mx-2" href="#" data-bs-toggle="dropdown">REGISTRY</a>
                        <ul class="dropdown-menu bg-dark rounded-0">
                            <li><a class="dropdown-item text-white text-uppercase" href="/registry-search">Registry Search</a></li>                            
                        </ul>
                    </li>
                    
                    <li class="nav-item"><a class="nav-link nav-link text-white font-weight-bold my-3 mx-2" href="/latest-news-and-blog"> NEWS AND MEDIA </a></li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle nav-link dropdown-toggle text-white font-weight-bold my-3 mx-2" href="#" data-bs-toggle="dropdown">ABOUT US</a>
                        <ul class="dropdown-menu rightmost bg-dark rounded-0">
                            <li><a class="dropdown-item text-white text-uppercase" href="/who-are-we">About DTI Foundation</a></li>
                            <li><a class="dropdown-item text-white text-uppercase" href="/product-advisory-committee">PAC </a></li>
                            <li><a class="dropdown-item text-white text-uppercase" href="/task-force">Task Force </a></li>
                            <li><a class="dropdown-item text-white text-uppercase" href="/send-us-a-message">Contact Us </a></li>
                        </ul>
                    </li>
                </ul>
            </div> <!-- navbar-collapse.// -->
        </div> <!-- container-fluid.// -->

    </nav>
</template>

<style lang="scss">
    .bg-purple {
        background-color: #4C214D !important;
        height: 79px;

        .nav-link:hover {
            color: yellow !important;
        }

        .dropdown-toggle::after {
          display: none;
        }

        .dropdown-menu.rightmost {
            right: 0;
            left: auto;
        }

        .dropdown-item {
            font-size: 14px !important;
        }

        .dropdown-menu.bg-dark {
            background-color: #000 !important;
        }

        .dropdown-item:hover, .dropdown-item:focus {
            color: yellow !important;
            background-color: transparent;
        }
    }

    @media all and (min-width: 992px) {
        .navbar .nav-item .dropdown-menu{ display: none; }
        .navbar .nav-item:hover .nav-link{ color: yellow;  }
        .navbar .nav-item:hover .dropdown-menu{ display: block; }
        .navbar .nav-item .dropdown-menu{ margin-top:0; }
    }	
</style>