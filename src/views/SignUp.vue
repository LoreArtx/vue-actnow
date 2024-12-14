<template>
    <v-sheet class="pa-8">
        <v-card class="mx-auto px-6 py-8 flex" max-width="344">
            <h1 class="text-center mb-8 text-2xl">
               Welcome 
            </h1>
            <v-form @submit.prevent="signUp" validate-on="submit lazy">
                <v-row class="gap-4">
                    <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name"/>

                    <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name"/>
                </v-row>

                <v-row>
                    <v-text-field v-model="phoneNumber" :rules="[rules.required]" label="Phone Number"/> 
                </v-row>

                <v-row>
                    <v-text-field v-model="password" :rules="[rules.required]" type="password" label="Password"/>
                </v-row>

                <v-row>
                    <v-text-field v-model="confirmPassword" :rules="[rules.required]" type="password" label="Confirm Password"/>
                </v-row>

                <RouterLink to="/sign-in" class="text-blue-700 underline block">Already have an account</RouterLink>
                <br>
                <v-row>
                    <v-btn type="submit" color="primary" block>Sign up</v-btn>
                </v-row>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
    import {ref} from "vue"
    import rules from "@/utils/validation/rules";
    import { setToken } from "@/plugins/auth";
    import { useRouter } from "vue-router";
import { fetchData } from "@/utils/api";

    const router = useRouter();
    
    const firstName = ref('')
    const lastName = ref('')
    const phoneNumber = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const signUp = async ()=>{
        const data = await fetchData("sign-up",
            {
                method:"POST",
                body:JSON.stringify({firstName:firstName.value,lastName:lastName.value,phoneNumber:phoneNumber.value,password:password.value})
            }
        )
        
        if(data.token)
        {
            setToken(data.token)
            router.push("/")
        }else{
            alert(data.error)
        }
    }

</script>

<style scoped>

</style>