<template>
    <header class="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top">
        <nav class="container-xxl bd-gutter flex-wrap flex-lg-nowrap" aria-label="Main navigation">
            <!-- <a class="navbar-brand p-0 me-0 me-lg-2" href="/" aria-label="Bootstrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" class="d-block my-1" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
            </a> -->
            <a class="navbar-brand p-0 me-0 me-lg-2" href="/" aria-label="Venta Interna FPC">
                <img src="../assets/logo_footer.png"/>
            </a>
            <!-- offcanvas-sm offcanvas-end flex-grow-1 -->
            <div class="offcanvas-sm offcanvas-end flex-grow-1" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel" data-bs-scroll="true">
                <div class="offcanvas-body p-4 pt-0 p-lg-0">
                    <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li class="nav-item dropdown">
                            <button type="button" class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                Jorge Gutiérrez
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><h6 class="dropdown-header">Opciones</h6></li>
                                <li>
                                <button class="dropdown-item current" aria-current="true" v-on:click="logout">Cerrar Sesión</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default({
        data(){
            return{
                
            }
        },
        created() {
            document.title = this.$props.title;
        },
        props: {
            title: String
        },
        methods:{
            logout(){
                window.localStorage.clear();
                this.$router.push({ name: 'Login' });
            },
        }
    })
</script>

<style scoped>
    .bd-navbar {
        min-height: 4rem;
        /* background-color: #563d7c; */
        background-color: #83ae48;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.05),inset 0 -1px 0 rgba(0,0,0,.1);
    }
</style>
