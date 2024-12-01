<template>
    <div class="flex justify-center">
        <form @submit.prevent="auth" class="bg-gray-200 w-1/3 p-5 flex flex-col gap-5">
            <h1 class="text-center text-2xl">Welcome Back!</h1>

            <Input name="phoneNumber" :formVar="phoneNumber" type="text" label="Phone Number"  @input="(event)=>validatePhoneNumber(event)" required/>

            <Input name="password" :formVar="password" type="password" label="Password" required/>

            <RouterLink to="/sign-up" class="text-blue-700 underline">Don't have an account?</RouterLink>
            <v-btn class="border border-black">Sign in</v-btn>
        </form>
    </div>
</template>
<script setup>
    import { reactive } from 'vue';
    import Input from '@/components/UI/Input.vue';
    const phoneNumber = reactive({value:"", error:""})
    const password = reactive({value:"", error:""})

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

    const validatePhoneNumber = (event)=>{
        phoneNumber.value = event.target.value.replace(/\D+/g, '')
        phoneNumber.value=phoneNumber.value.slice(0,12);
    }

    const clearError = (formVar)=>{
        formVar.error = ""
    }
</script>
<style>
    
</style>