<template>
        <v-sheet class="pa-12">
            <v-card class="mx-auto px-6 py-8 flex" max-width="344">
                <h1 class="text-center text-2xl mb-4">Welcome Back!</h1>
                <v-form validate-on="submit lazy" @submit.prevent="auth">
                    <v-text-field name="phoneNumber" v-model="phoneNumber" :rules="[rules.required]" type="text" label="Phone Number"/>

                    <v-text-field name="password" v-model="password" :rules="[rules.required]" type="password" label="Password"/>

                    <RouterLink to="/sign-up" class="text-blue-700 underline block">Don't have an account?</RouterLink>
                    <br>
                    <v-btn type="submit" color="primary" block>Sign in</v-btn>
                </v-form>
            </v-card>
        </v-sheet>
</template>
<script setup>
    import { ref} from 'vue';
    import { setToken } from '@/plugins/auth';
    import { useRouter } from 'vue-router';
    import rules from '@/utils/validation/rules';
import { fetchData } from '@/utils/api';
    
    const router = useRouter()
    
    const phoneNumber = ref('')
    const password = ref('')

    const auth = async ()=>{
        const data = await fetchData("sign-in", {
            method:"POST",
            credentials:'include',
            body:JSON.stringify({
            phoneNumber:phoneNumber.value, password:password.value
        })})
                
        if(data.token)
        {
            setToken(data.token)
            router.push("/")
        }else{
            alert(data.error)
        }
    }
</script>
<style>
    
</style>