<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <label for="username"><b>Username</b></label>
                <input v-model="user.username" ref="username" type="text" placeholder="Enter Username" name="username" />
                
                <label for="email"><b>Email</b></label>
                <input v-model="user.email" ref="email" type="email" placeholder="Enter Email" name="email" />

                <label for="psw"><b>Password</b></label>
                <input v-model="user.password" ref="psw" type="password" placeholder="Enter Password" name="psw" />

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input v-model="user.repeatPassword" type="password" placeholder="Repeat Password" name="psw-repeat" />
                
                <label>
                    <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px" /> Remember me
                </label>
                
                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

                <div class="clearfix">
                    <button type="button" class="cancelbtn" v-on:click="back">Cancel</button>
                    <button type="submit" class="signupbtn" v-on:click="signup">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default({
    data(){
        return{
            user:{
                userId:0,
                username:"",
                email:"",
                password:"",
                repeatPassword:""
            },
        }
    },
    setup() {
        
    },
    methods:{
        back(){
            this.$router.push({ name: 'Login' });
        },
        signup(){
            if(this.checkValidation()){
            axios.post(this.hostname + "/api/user/registration", this.user)
                .then(response => {
                    if (response.data.userId > 0) {
                        Swal.fire("Successfully registered")
                        .then(() => {
                            this.back();
                        });
                    }else{
                        Swal.fire("Error : Something went wrong.");
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
            if(!this.user.username){
                this.$refs.username.focus();
                Swal.fire("Give username !");
                return;
            }
            if(!this.user.email){
                this.$refs.email.focus();
                Swal.fire("Give email !");
                return;
            }
            if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(this.user.email)){
                this.$refs.email.focus();
                Swal.fire("Invalid email !");
                return;
            }
            if(!this.user.password){
                this.$refs.psw.focus();
                Swal.fire("Give password !");
                return;
            }
            if(this.user.password != this.user.repeatPassword){
                this.$refs.psw.focus();
                Swal.fire("Password and repeat password mismatched !");
                return;
            }
            return true;
        },
    }
})
</script>

<style scoped>
    .container{
        width: 40%;
        padding: 16px;
    }
    input[type=text], input[type=password], input[type=email] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }
    input[type=text]:focus, input[type=password]:focus, input[type=email]:focus {
        background-color: #ddd;
        outline: none;
    }
    hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
    }
    button {
        background-color: #04AA6D;
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
    .cancelbtn {
        padding: 14px 20px;
        background-color: #f44336;
    }
    .cancelbtn, .signupbtn {
        float: left;
        width: 50%;
    }
    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>
