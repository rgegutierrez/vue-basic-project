<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand p-0 me-0 me-lg-2" href="/" aria-label="Venta Interna FPC">
                <img src="../assets/logo_footer.png"/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :class="[$route.name === 'Dashboard' ? 'active' : '']" aria-current="page" to="/dashboard">Carro de Compras</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :class="[$route.name === 'Register' ? 'active' : '']" aria-current="page" to="/register">Historial de Compras</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li class="nav-item dropdown">
                            <button type="button" class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                {{this.user.name}}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><h6 class="dropdown-header">Opciones</h6></li>
                                <li>
                                <button class="dropdown-item current" aria-current="true" v-on:click="logout">Cerrar Sesión</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
    export default({
        data(){
            return{
            user:{
                name: "",
            }
        }
        },
        created() {
            document.title = this.$props.title;
            this.user.name = localStorage.getItem('name');
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
