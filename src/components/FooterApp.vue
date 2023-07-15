<template lang="">
    <div class="text-center footer">
        <div class="d-block mx-auto position-relative">
            <img :src="importLogo()" height="120" alt="" class="">
        </div>
        <p>Tentang Kami</p>
    </div>
</template>
<script>

export default {
    name: "FooterApp",
    methods: {
        importLogo() {
            return require(`@/assets/logo.png`);
        }
    }
}
</script>
<style scoped>
    .footer {
        margin-top: 5%;
        background-color: #8D99AE;
        color: white;
        height: 28vh;
    }

    img{
        transform: translate(0px, -40px);
    }

    p {
        margin: 0;
        padding: 0;
    }
</style>