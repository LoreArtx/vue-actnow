<template>
        <v-sheet class="pa-12">
            <v-card class="mx-auto px-6 py-8 flex" max-width="344">
                <v-form validate-on="submit lazy" @submit.prevent="auth">
                    <h1 class="text-center text-2xl mb-4">Welcome Back!</h1>
                    <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" type="text" label="Phone Number"/>

                    <v-text-field v-model="password" :rules="passwordRules" type="password" label="Password"/>

                    <RouterLink to="/sign-up" class="text-blue-700 underline block">Don't have an account?</RouterLink>
                    <br>
                    <v-btn type="submit" color="primary" block>Sign in</v-btn>
                </v-form>
            </v-card>
        </v-sheet>
</template>
<script setup>
    import { ref} from 'vue';
    import { phoneNumberRules, passwordRules } from '@/utils/validation/rules';
    const phoneNumber = ref('')
    const password = ref('')

    const auth = async ()=>{
        await checkForErrors()
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

    const checkForErrors = async ()=>{
        resetErrors()

        const phoneRegex = /^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/

        if(password.value.trim() === '')
            password.error = "Password can't be empty"

        if(phoneNumber.value.trim() === '')
            phoneNumber.error = "Phone number can't be empty"

        if(!phoneRegex.test(phoneNumber.value))
            phoneNumber.error = "Wrong number"
    }

    const resetErrors = ()=>{
        phoneNumber.error = ""
        password.error = ""
    }
</script>
<style>
    
</style>