<template>
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
                <div class="card box" style="border-radius: 1rem;">
                    <div class="row g-0">
                        <div class="col-md-6 col-lg-5 d-none d-md-block vl">
                            <div class="row g-0">
                                <div class="col-md-12 img-container">
                                    <img src="https://www.energie.cl/sites/default/files/2021-04/logo_fpc.png" alt="login form" class="img-fluid" style="margin-top: 5rem;max-width: 85% !important;" />
                                </div>
                                <div class="col-md-12 img-container">
                                    <img src="http://www.singular.cl/wp-content/uploads/15-logo-FPC.jpg" alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                            <div class="card-body p-4 p-lg-5 text-black">
                                <form>
                                    <h1 class="fw-bold mb-3 pb-3" style="letter-spacing: 1px;">Venta Interna de FPC</h1>
                                    <!-- <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5> -->
                
                                    <div class="form-outline mb-4">
                                        <label for="username" class="form-label">Ingrese su Rut</label>
                                        <input v-model="user.username" v-bind:readonly="isReadOnly" ref="username" type="text" class="form-control form-control-lg" :class="valid_input_rut" placeholder="12345678-9" name="username" />
                                        <small id="emailHelp" class="form-text" :class="valid_span_rut">{{validation_rut}}</small>
                                    </div>
                
                                    <div v-show='toggle' class="form-outline mb-4">
                                        <label for="pwd">Código Activación</label>
                                        <input v-model="user.password" ref="pwd" type="password" class="form-control form-control-lg" placeholder="123456" name="pwd" />
                                        <div class="bd-callout bd-callout-warning">
                                            <p>We <strong>highly recommend</strong> custom validation styles as native browser defaults are not announced to screen readers.</p>
                                        </div>
                                    </div>
                
                                    <div class="pt-1 mb-4">
                                        <button v-show='!toggle' type="button" class="btn btn-dark btn-lg btn-block" v-on:click="requestActivation">Activar mi ingreso</button>
                                        <button v-show='toggle' type="button" class="btn btn-success btn-lg btn-block" v-on:click="login">Validar mi ingreso</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { validateRUT } from 'validar-rut';

export default {
    data(){
        return{
            user:{
                username:"",
                password:""
            },
            toggle: false,
            isReadOnly: false,
            valid_input_rut: "",
            valid_span_rut: "",
        }
    },
    computed: {
        validation_rut: function () {
            if (this.user.username === ""){
                return;
            }
            
            const vRut = validateRUT(this.user.username);

            if(!vRut){
                this.valid_input_rut = "is-invalid";
                this.valid_span_rut = "invalid-feedback";
                return "Rut Invalido";
            } else {
                this.valid_input_rut = "is-valid";
                this.valid_span_rut = "valid-feedback";
                return "Rut Valido";
            }
        }
    },
    methods:{
        signup(){
            this.$router.push({ name: 'Register' });
        },
        requestActivation(){
            if(this.checkRut()){
                Swal.showLoading();
                axios.get(this.hostname + "/api/user/RequestActivation/"+this.user.username)
                    .then(response => {
                        if(response.data.userId > 0){
                            this.toggle = true;
                            this.isReadOnly = true;
                            Swal.hideLoading();
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            Swal.hideLoading();
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        login(){
            if(this.checkRut() && this.checkCode()){
                axios.get(this.hostname + "/api/user/signin/"+this.user.username+"/"+this.user.password)
                    .then(response => {
                        if(response.data.userId > 0){
                            localStorage.setItem('token', JSON.stringify(response.data.token));
                            response.data.token = "";
                            localStorage.setItem('user', JSON.stringify(response.data));
                            this.$router.push({name:"Dashboard"});
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        checkRut(){
            if(!this.user.username){
                this.$refs.username.focus();
                Swal.fire("Ingrese su rut para solicitar activación");
                return;
            } else {
                const vRut = validateRUT(this.user.username);

                if(!vRut){
                    this.$refs.username.focus();
                    Swal.fire("Rut Invalido");
                    return;
                }
            }
            return true;
        },
        checkCode(){
            if(!this.user.password){
                this.$refs.pwd.focus();
                Swal.fire("Ingrese su código de activación");
                return;
            }
            return true;
        }
    }
}
</script>

<style scoped>
    .img-container {
        min-height: 300px;  
    }

    .vl {
        border-right: 3px solid #212121de;
    }

    .box {
        border: 3px solid #212121de;
        -webkit-box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.75);
    }
</style>