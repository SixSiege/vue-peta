<template lang="">
    <div class="success d-block mx-auto p-2">
        <h2>Login Success</h2>
        <div class="btn btn-primary" @click="logoffUser">Logoff</div>
    </div>
</template>
<script>
export default {
    name: 'AuthSuccess',
    methods: {
        logoffUser() {
            this.$session.remove('username')
            this.$emit('disableForm')
            this.$emit("changeMsg", "Logged off successfully");
            this.$router.push('/laporan')
        }
    }
}
</script>
<style scoped>
    .success {
        width: 300px;
        height: 300px;
    }
</style>