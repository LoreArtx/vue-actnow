<template>
    <v-card>
        <v-card-title>Make a payment</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="handleSubmit" validate-on="submit">

                <v-row>
                    <v-text-field
                        label="Your name"
                        v-model="form.name"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        label="Card Number"
                        v-model="form.cardNumber"
                        :rules="[rules.required, rules.cardNumber]"
                        maxlength="16"
                        required
                    ></v-text-field>
                </v-row>

                <v-row class="gap-10">
                    <v-text-field
                        label="Expiration Date (MM/YY)"
                        v-model="form.expirationDate"
                        :rules="[rules.required, rules.expirationDate]"
                        maxlength="5"
                        required
                    ></v-text-field>

                    <v-text-field
                        label="CVV"
                        v-model="form.cvv"
                        :rules="[rules.required, rules.cvv]"
                        maxlength="3"
                        type="password"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        label="Payment amount"
                        v-model="form.amount"
                        :rules="[rules.required, rules.amount]"
                        type="number"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-btn type="submit" variant="elevated" color="primary" block>Submit</v-btn>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import rules from "@/utils/validation/rules";
import { fetchData } from "@/utils/api";
import { useRoute } from "vue-router";

const route = useRoute();

const form = ref({
    cardNumber: "4114775288232231",
    expirationDate: "12/12",
    cvv: "123",
    amount: "",
    name: "Danylo",
});

async function handleSubmit() {
    if (!form.value.name || !form.value.cardNumber || !form.value.amount) {
        alert("Please fill out all required fields.");
        return;
    }

    if (
        form.value.cardNumber !== "4114775288232231" ||
        form.value.cvv !== "123" ||
        form.value.expirationDate !== "12/12"
    ) {
        alert("Invalid card details. Please check your information.");
        return;
    }

    try {
        const data = await fetchData(`requests/${route.params.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                collected: parseFloat(route.meta.request.collected + Number(form.value.amount)),
            }),
        });

        if (data.message) {
            alert(data.message);
            window.location.reload();
        } else {
            alert("Failed to process payment. Please try again.");
        }
    } catch (error) {
        console.error("Error updating request:", error);
        alert("An error occurred while processing the payment.");
    }
}
</script>
