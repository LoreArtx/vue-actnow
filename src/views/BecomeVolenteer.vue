<template>
    <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
        <v-container class="mx-auto h-full">
                <h1 class="mb-10 text-[30px]">Become a volunteer</h1>
            <v-row class="h-full">
                <v-col class="relative">
                    <Map
                        class="min-w-[300px]"
                        :center="{ lat: 49.0384, lng: 31.4513 }"
                        :zoom="6"
                        empty="true"
                        @click="handleGetLocation"
                        :show="{ location }"
                    ></Map>
                    <div class="absolute -top-2">
                        <span class="mr-4">Lat: {{ location.coordinates.lat }}</span>
                        <span>Lng: {{ location.coordinates.lng }}</span>
                    </div>
                </v-col>

                <v-col>
                    <v-text-field
                        label="Organization name"
                        v-model="organizationTitle"
                        :rules="[rules.required]"
                    />
                    <v-btn
                        type="submit"
                        color="secondary"
                        block
                    >
                        Submit
                    </v-btn>
                </v-col>

                <v-dialog v-model="verificationDialog" max-width="500">
                    <VerificationNumberForm
                        v-if="!isVerified"
                        @verification-success="handleVerificationSuccess"
                    />
                </v-dialog>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Map from '@/components/GoogleMaps/Map.vue';
import VerificationNumberForm from '@/components/VerificationNumberForm.vue';
import { setToken, userToken } from '@/plugins/auth';
import { jwtDecode } from 'jwt-decode';
import { fetchData } from '@/utils/api';
import { useRouter } from 'vue-router';
import rules from '@/utils/validation/rules';

const user = jwtDecode(userToken.value).user;
const router = useRouter();
const organizationTitle = ref('');
const verificationDialog = ref(false);
const isVerified = ref(false);
const location = reactive({
    streetName: '',
    coordinates: {
        lat: 0,
        lng: 0,
    },
});

function handleSubmit() {
    if (!location.coordinates.lat && !location.coordinates.lng) {
        alert('Choose the location');
        return;
    }

    if (!organizationTitle.value) {
        alert('Enter the organization name');
        return;
    }

    if (!isVerified.value) {
        verificationDialog.value = true;
    } else {
        handleVerificationSuccess();
    }
}

async function handleVerificationSuccess() {
    isVerified.value = true;
    try {
        if (!location.coordinates.lat) {
            alert('Choose the location of your organization on the map!');
            return;
        }

        const data = await fetchData(`user/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                role: 'volunteer',
                location: location,
                organization: organizationTitle.value,
            }),
        });

        if (data.token) {
            alert('Role updated successfully!');
            setToken(data.token);
            router.push('/');
        } else {
            alert('Token update failed');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        verificationDialog.value = false;
    }
}

function handleGetLocation(e) {
    location.coordinates.lat = e.latLng.lat();
    location.coordinates.lng = e.latLng.lng();
}
</script>

<style scoped>
</style>
