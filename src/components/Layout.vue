<template>
    <button v-on:click="logout" style="margin-bottom:4px;">Logout</button>
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

<style scoped></style>
