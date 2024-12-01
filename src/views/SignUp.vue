<template>
    <v-sheet class="pa-8">
        <v-card class="mx-auto px-6 py-8 flex" max-width="344">
            <v-form @submit.prevent="signUp" validate-on="submit lazy">
                <h1 class="text-center text-2xl mb-2">Welcome</h1>
                <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name"/>

                <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name"/>

                <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone Number"/> 

                <v-text-field v-model="password" :rules="passwordRules" type="password" label="Password"/>

                <v-text-field v-model="confirmPassword" :rules="passwordRules" type="password" label="Confirm Password"/>


                <br/>
                <v-btn type="submit" color="primary" block>Sign up</v-btn>
                <RouterLink to="/sign-in" class="text-blue-700 underline mb-3">Already have an account</RouterLink>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
    import {ref} from "vue"
    import { firstNameRules, lastNameRules, phoneNumberRules, passwordRules } from "@/utils/validation/rules";
    const firstName = ref('')
    const lastName = ref('')
    const phoneNumber = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const signUp = async ()=>{

        console.log(12)
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

</script>

<style scoped>

</style>