<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="2" class="py-6 px-4 text-center bg-primary">
          <h1 class="text-[40px] mt-4 font-weight-bold text-secondary">Why You Can Trust Us</h1>
          <p class="mt-2 text-secondary">
            Our platform is designed with care for you. Trust is the foundation of our relationships with users.
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="4">
        <v-card outlined class="bg-primary text-secondary">
          <v-card-title>
            <span>A Team of Professionals</span>
          </v-card-title>
          <v-card-text>
            Our team consists of experienced experts who are result-oriented and help achieve goals effectively.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined class="bg-primary text-secondary">
          <v-card-title>
            <span>Security and Privacy</span>
          </v-card-title>
          <v-card-text>
            We use modern encryption methods to protect your information and ensure confidentiality.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined class="bg-primary text-secondary">
          <v-card-title>
            <span>Social Responsibility</span>
          </v-card-title>
          <v-card-text>
            We support charitable initiatives and actively collaborate with volunteer organizations.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-[30px] text-center">What Our Users Say</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="py-4 bg-primary text-secondary" >
          <v-card-text>
            "This is the best service I have ever dealt with. Their support and quality of work are top-notch!"
          </v-card-text>
          <v-card-actions>
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1" />
            </v-avatar>
            <span class="ml-2">Alexander Ivanov</span>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="py-4 bg-primary text-secondary">
          <v-card-text>
            "The platform is very user-friendly, and the team is always ready to help. I recommend it to everyone!"
          </v-card-text>
          <v-card-actions>
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User 2" />
            </v-avatar>
            <span class="ml-2">Maria Petrova</span>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="py-4 bg-primary text-secondary">
          <v-card-text>
            "A complete sense of security and transparency. This is exactly what I need."
          </v-card-text>
          <v-card-actions>
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User 3" />
            </v-avatar>
            <span class="ml-2">Volodymyr Holovko</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-sheet class="pa-6 text-center" color="primary" dark>
          <h3 class="text-[30px] text-secondary">Ready to Work with Us?</h3>
          <p class="text-[20px] text-secondary">Join us today and see for yourself that we are worthy of your trust.</p>
          <v-btn color="secondary" class="mt-4" large>
            Learn More
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
