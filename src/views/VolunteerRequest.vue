<template>
    <v-row class="flex gap-5">
        <v-col>
            <Map :center="$route.meta.request.location.coordinates" :zoom="15" :single="true"/>
        </v-col>
        
        <v-col cols="6">
                    <v-container class="flex flex-col gap-6">
            <v-row class="flex flex-col relative">
                <div>{{$route.meta.request.title}}</div>
                <div class="text-gray-500">from: {{$route.meta.request.author}}</div>
                <div class="absolute right-0 px-4" :class="$route.meta.request.category">Category: {{$route.meta.request.category}}</div>
            </v-row>
            <v-row><div>{{$route.meta.request.description}}</div></v-row>
            <v-row class="gap-4">
                <v-col class="shadow p-4">
                    <div class="text-center">
                        <h2 class="text-lg font-semibold">Donate Goal</h2>
                        <div class="text-2xl font-bold text-primary">
                            ${{ $route.meta.request.goal }}
                        </div>

                        <v-progress-circular
                            v-model="calculatedPercentage"
                            color="success"
                            size="100"
                            width="10"
                            class="mt-4"
                        >
                            {{ calculatedPercentage }}%
                        </v-progress-circular>

                        <div class="text-sm text-gray-600 mt-2">
                            Collected: ${{ $route.meta.request.collected }} of ${{ $route.meta.request.goal }}
                        </div>
                    </div>
                </v-col>

                            <v-col class="shadow p-4 rounded-lg">
                <div class="text-center text-lg font-semibold mb-4 text-primary">
                    We Require:
                </div>
                <v-list dense>
                    <v-list-item
                        v-for="need in $route.meta.request.needs"
                        :key="need.title"
                        class="mb-2 p-2 rounded-md hover:bg-gray-100"
                    >
                        <v-list-item-content>
                            <div class="text-base font-medium">
                                {{ need.title }}
                            </div>
                            <div class="text-sm text-gray-600">
                                Quantity: {{ need.count }}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
            </v-row>

            <v-row v-if="!$route.meta.request.closed" class="flex-auto items-end">
                <v-col>
                    <v-btn color="primary" block @click="paymentDialog=true">Donate</v-btn>
                </v-col>
                <v-col>
                    <v-btn color="secondary" block @click="verificationDialog=true">Offer help</v-btn>
                </v-col>
            </v-row>
        </v-container>
        </v-col>

        <v-col>
            <AdminPanelRequest/>
        </v-col>

        <v-dialog v-model="paymentDialog" max-width="400">
            <PaymentForm/>
        </v-dialog>

        <v-dialog v-model="verificationDialog" max-width="500">
            <VerificationNumberForm/>
        </v-dialog>

        <v-dialog v-model="chatDialog">
            <div>CHAT</div>
        </v-dialog>
    </v-row>

</template>
<script setup>
    import Map from '@/components/GoogleMaps/Map.vue';
    import PaymentForm from '@/components/PaymentForm.vue';
    import AdminPanelRequest from '@/components/AdminPanelRequest.vue';
    import VerificationNumberForm from '@/components/VerificationNumberForm.vue';
    import {ref, computed} from 'vue'
    import { useRoute } from 'vue-router';

    const paymentDialog = ref(false)
    const verificationDialog = ref(false)
    const chatDialog = ref(false)

    const route = useRoute()
    const calculatedPercentage = computed(() => {
    const { collected, goal } = route.meta.request;
    if (!goal || goal <= 0) return 0;
            return Math.min(Math.round((collected / goal) * 100), 100);
        });
    
</script>