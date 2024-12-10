<template>
    <v-card>
        <v-card-title>Make a payment</v-card-title>
        <v-card-text>
          <v-form validate-on="submit">

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
              <v-textarea
              label="Message"
              v-model="form.comment"
              rows="3"
            ></v-textarea>
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

  const form = ref({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    amount: "",
    name: "",
    comment: "",
  });

</script>