<template>
        <v-sheet class="pa-12">
            <v-card class="mx-auto px-6 py-8 flex" max-width="344">
                <v-form validate-on="submit lazy" @submit.prevent="auth">
                    <h1 class="text-center text-2xl mb-4">Welcome Back!</h1>
                    <v-text-field v-model="phoneNumber" :rules="[rules.required]" type="text" label="Phone Number"/>

                    <v-text-field v-model="password" :rules="[rules.required]" type="password" label="Password"/>

                    <RouterLink to="/sign-up" class="text-blue-700 underline block">Don't have an account?</RouterLink>
                    <br>
                    <v-btn type="submit" color="primary" block>Sign in</v-btn>
                </v-form>
            </v-card>
        </v-sheet>
</template>
<script setup>
    import { ref} from 'vue';
    import rules from '@/utils/validation/rules';
    const phoneNumber = ref('')
    const password = ref('')

    const auth = async ()=>{
        const response = await fetch("http://localhost:5555/api/medhelp/sign-in", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            phoneNumber:phoneNumber.value, password:password.value
        })})
        console.log(response)
    }
</script>
<style>
    
</style>