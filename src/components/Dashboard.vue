<template>
    <Layout title="Dashboard"></Layout>
    <br />
    <div class="container">
        <button v-on:click="addStudent" class="my-button" style="margin:10px 0 10px 0;">Add New Student</button>
        <table class="basic-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="std in students" :key="std.studentId">
                    <td>{{std.name}}</td>
                    <td>{{std.roll}}</td>
                    <td>
                        <button v-on:click="editStudent(std.studentId)" class="my-button" style="float:left;">Edit</button>
                        <button v-on:click="deleteStudent(std.studentId)" class="my-button" style="float:left;margin-right:5px;">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Layout from './Layout.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default ({
    data(){
        return{
            students:[]
        }
    },
    components:{
        Layout
    },
    async created(){
        await this.getStudents();
    },
    setup() {
        
    },
    methods:{
        addStudent(){
            this.$router.push({name:"Student", params: { id: 0}});
        },
        editStudent(studentId){
            this.$router.push({name:"Student", params: { id: studentId}});
        },
        deleteStudent(studentId){
            axios.delete(this.hostname + "/api/student/delete/"+studentId, this.getTokenConfig())
                .then(response => {
                    Swal.fire(response.data);
                    var removeIndex = this.students.findIndex(x => x.studentId === studentId);
                    ~removeIndex && this.students.splice(removeIndex, 1);
                })
                .catch(error => {
                    if (error.response) {
                        Swal.fire(error.response.data);
                    }
                });
        },
        getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        async getStudents(){
            await axios.get(this.hostname + "/api/student/gets1/", this.getTokenConfig())
            .then(response => {
                this.students = response.data;
            })
            .catch(error => {
                if (error.response) {
                    Swal.fire(error.response.data);
                }
            });
        },
    }
})
</script>

<style scoped>
    .basic-table {
        width:100%;
        border: solid 1px #DDEEEE;
        border-collapse: collapse;
        border-spacing: 0;
        font: normal 13px Arial, sans-serif;
        margin-bottom: 4px;
    }
    .basic-table thead th {
        background-color: #DDEFEF;
        border: solid 1px #DDEEEE;
        color: #336B6B;
        padding: 10px;
        text-align: left;
        text-shadow: 1px 1px 1px #fff;
    }
    .basic-table tbody td {
        border: solid 1px #DDEEEE;
        color: #333;
        padding: 10px;
        text-shadow: 1px 1px 1px #fff;
    }
    .my-button {
        background: #3D94F6;
        background-image: -o-linear-gradient(top, #3D94F6, #1E62D0);
        background-image: -webkit-gradient(to bottom, #3D94F6, #1E62D0);
        border-radius: 20px;
        color: #FFFFFF;
        font-family: Arial;
        box-shadow: 1px 1px 20px 0 #000000;
        text-shadow: 1px 1px 20px #000000;
        border: solid #337FED 1px;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        margin-right: 5px;
    }

    .my-button:hover {
        border: solid #337FED 1px;
        background: #1E62D0;
        background-image: -webkit-linear-gradient(top, #1E62D0, #3D94F6);
        background-image: -moz-linear-gradient(top, #1E62D0, #3D94F6);
        background-image: -ms-linear-gradient(top, #1E62D0, #3D94F6);
        background-image: -o-linear-gradient(top, #1E62D0, #3D94F6);
        background-image: -webkit-gradient(to bottom, #1E62D0, #3D94F6);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        text-decoration: none;
    }
</style>