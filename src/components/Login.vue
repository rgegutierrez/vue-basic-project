<template>
    <div class="col-md-12">
        <div class="container">
            <h3 class="e-shop-font">Login Page</h3>
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label for="username">{{user.test}}</label>
                        <input v-model="user.username" ref="username" type="text" class="form-control" placeholder="Enter username" name="username" />
                        <span>{{validation_rut}}</span>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input v-model="user.password" ref="psw" type="password" class="form-control" placeholder="Enter password" name="pwd" />
                    </div>
                    <div class="form-group form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" name="remember"> Remember me
                        </label>
                    </div>
                    <div class="clearfix">
                        <button type="button" class="signin" v-on:click="login">Sign in</button>
                        <button type="button" class="signup" v-on:click="signup">Sing up</button>
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
                password:"",
                test:"test"
            }
        }
    },
    computed: {
        validation_rut: function () {
            console.log(this.user.username);
            if (this.user.username === ""){
                return;
            }
            
            const vRut = validateRUT(this.user.username);

            if(!vRut){
                return "Rut Invalido";
            } else {
                return "Rut Valido";
            }
        }
    },
    methods:{
        signup(){
            this.$router.push({ name: 'Register' });
        },
        login(){
            if(this.checkValidation()){
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
        checkValidation(){
            this.user.test=this.user.username;

            if(!this.user.username){
                this.$refs.username.focus();
                Swal.fire("Give Username");
                return;
            } else {
                const vRut = validateRUT(this.user.username);

                if(!vRut){
                    this.$refs.username.focus();
                    Swal.fire("Rut Invalido");
                    return;
                }
            }
            if(!this.user.password){
                this.$refs.password.focus();
                Swal.fire("Give password");
                return;
            }
            return true;
        }
    }
}
</script>

<style scoped>
    .container{
        max-width: 360px;
    }
    button {
        background-color: red;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
    }
    button:hover {
        opacity:1;
    }
    .signin {
        padding: 14px 20px;
        background-color: #0069D9;
    }
    .signin, .signup {
        float: left;
        width: 50%;
    }
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>