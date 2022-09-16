<template>
    <Layout title="Student"></Layout>
    <br />
    <label for="upload-pic" style="cursor:pointer;height:200px;weight:200px;margin-bottom:50px;">
        <img class="rounded-circle mt-5 imgTag" style="width:100%;height:100%;" :src="fileSrc" />
        <input id="upload-pic" @change="uploadImage($event)" class="upload-pic" type="file" accept="image/*" name="photo" style="display:none;">
    </label>
    <br />
    <input v-model="student.name" ref="name" type="text" placeholder="Student Name" />
    <br />
    <input v-model="student.roll" ref="roll" type="text" placeholder="Roll" />
    <br />
    <button class="btn btn-primary" v-on:click="save">Save</button>
</template>

<script>
import Layout from './Layout.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default ({
    data(){
        return{
            student:{
                file:"",
                fileSrc:require('@/assets/defaultImage.png'),
                studentId:0,
                name:'',
                roll:''
            }
        }
    },
    components:{
        Layout
    },
    async created(){
        if(this.$route.params.id > 0) await this.getStudent();
    },
    setup() {
        
    },
    methods:{
        getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        async getStudent(){
            var studentId = this.$route.params.id;
            await axios.get(this.hostname + "/api/student/GetByStudentId/"+studentId, this.getTokenConfig())
                    .then(response => {
                        console.log(response.data);
                        this.student = response.data;

                        if(this.student.imgByte != null && this.student.imgByte.length > 0){
                            this.fileSrc='data:image/jpeg;base64,'+this.student.imgByte;
                            this.file = 'data:image/jpeg;base64,'+this.student.imgByte;
                        }

                    })
                    .catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
        },
        save(){
            if(this.checkValidation()){
            var formData = new FormData();
            for(var key in this.student){
                formData.append(key, this.student[key]);
            }
            formData.append("Files", this.file);

            axios.post(this.hostname + "/api/student/save", formData, this.getTokenConfig())
                .then(response => {
                    if (response.data.studentId > 0) {
                        Swal.fire("Successfully saved")
                        this.$router.push({name:"Dashboard"});
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
        uploadImage(e){
            this.file = e.target.files[0];
            this.fileSrc = window.URL.createObjectURL(this.file);
        },
        checkValidation(){
            if(!this.student.name){
                this.$refs.name.focus();
                Swal.fire("Give name !");
                return;
            }
            if(!this.student.roll){
                this.$refs.roll.focus();
                Swal.fire("Give roll !");
                return;
            }
            return true;
        },
    }
})
</script>

<style scoped>
button,input{
    margin-top:4px;
}
</style>
