<template>
    <v-card>
        <v-card-title>Please verify your phone number</v-card-title>
        <div v-if="step === 'phone'">
            <v-text-field v-model="phoneNumber"></v-text-field>
            <v-btn
                @click="handleVerification"
                color="secondary"
                block
                :loading="loading"
            >
                Verificate
            </v-btn>
        </div>

        <div v-if="step === 'code'">
            <v-otp-input length="6" v-model="code"></v-otp-input>
            <v-btn @click="handleCheck" color="secondary" block>Submit</v-btn>
        </div>
    </v-card>
</template>

<script setup>
import { fetchData } from '@/utils/api';
import { ref } from 'vue';

const step = ref('phone');
const phoneNumber = ref('+380678078342');
const code = ref('');
const loading = ref(false);

const emit = defineEmits(['verification-success']);

const handleVerification = async () => {
    loading.value = true;

    try {
        // const response = await fetchData(
        //     'sms-verify',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             phoneNumber: phoneNumber.value,
        //         }),
        //     }
        // );

        // if (response.status === 'pending') {
        //     step.value = 'code';
        // } else {
        //     alert('Failed to send verification code. Please try again.');
        // }

        emit('verification-success');
    } catch (error) {
        console.error('Error during phone verification:', error);
    } finally {
        loading.value = false;
    }
};

const handleCheck = async () => {
    loading.value = true;
    try {
        // const response = await fetchData(
        //     'code-check',
        //     {
        //         method: 'POST',

        //         body: JSON.stringify({
        //             code: code.value,
        //             phoneNumber: phoneNumber.value,
        //         }),
        //     }
        // );

        // if (response.status === 'approved') {
        //     emit('verification-success');
        // } else {
        //     alert('Invalid code. Please try again.');
        // }
        emit('verification-success');
    } catch (error) {
        console.error('Error during code check:', error);
    } finally {
        loading.value = false;
    }
};
</script>
