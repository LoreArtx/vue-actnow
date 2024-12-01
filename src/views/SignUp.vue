<template>
    <div class="flex justify-center">
        <form @submit.prevent="signUp" class="bg-gray-200 w-1/3 p-5 flex flex-col">
            <h1 class="text-center text-2xl">Welcome</h1>
            <Input name="firstName" :formVar="firstName" type="text" label="First Name" required/>

            <Input name="lastName" :formVar="lastName" type="text" label="Last Name" required/>

            <Input name="phoneNumber" :formVar="phoneNumber" type="text" label="Phone Number" @input="(event)=>validatePhoneNumber(event)" required/> 

            <Input name="password" :formVar="password" type="password" label="Password" required/>

            <Input name="confirmPassword" :formVar="confirmPassword" type="password" label="Confirm Password" required/>

            <RouterLink to="/sign-in" class="text-blue-700 underline mb-3">Already have an account</RouterLink>

            <v-btn class="border border-black">Sign up</v-btn>
        </form>
    </div>
</template>

<script setup>
    import {reactive} from "vue"
    import Input from "@/components/UI/Input.vue";
    const firstName = reactive({value:"", error:""})
    const lastName = reactive({value:"", error:""})
    const phoneNumber = reactive({value:"", error:""})
    const password = reactive({value:"", error:""})
    const confirmPassword = reactive({value:"", error:""})

    const signUp = async ()=>{

        await checkForErrors()

        if(firstName.error || lastName.error || phoneNumber.error || password.error)
            return


        const response = await fetch("http://localhost:5555/api/medhelp/sign-up",
            {
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({firstName:firstName.value,lastName:lastName.value,phoneNumber:phoneNumber.value,password:password.value})
            }
        )

        console.log(response)
    }

    const checkForErrors = async ()=>{
        resetErrors()

        const phoneRegex = /^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/

        if(password.value !== confirmPassword.value )
            password.error = "Passwords must match"

        if(phoneNumber.value.trim() === '')
            phoneNumber.error = "Phone number can't be empty"

        if(!phoneRegex.test(phoneNumber.value))
            phoneNumber.error = "Wrong number"

        if(firstName.value.trim() === "")
            firstName.error = "First name can't be empty"

        if(lastName.value.trim() === "")
            lastName.error = "Last name can't be empty"


        const userExists = await fetch("http://localhost:5555/api/medhelp/checkNumber?"+ new URLSearchParams({phoneNumber:phoneNumber.value}).toString(),
            {
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                
            }
        )

        if(userExists.status === 409)
            phoneNumber.error = "Such phone number is already used"
    }

    const resetErrors = ()=>{
        firstName.error = ""
        lastName.error = ""
        phoneNumber.error = ""
        password.error = ""
        confirmPassword.error = ""
    }

    const validatePhoneNumber = (event)=>{
        phoneNumber.value = event.target.value.replace(/\D+/g, '')
        phoneNumber.value=phoneNumber.value.slice(0,12);
    }
</script>

<style scoped>

</style>