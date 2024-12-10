<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="2" class="py-6 px-4 text-center bg-primary text-secondary">
          <h1 class="text-[40px] mt-4 font-weight-bold">About Us</h1>
          <p class="text-[15px] mt-2">
            Learn more about our mission, values, and how we work to achieve our goals.
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card outlined class="py-4 bg-primary text-secondary">
          <v-card-title>
            <span>Our Mission</span>
          </v-card-title>
          <v-card-text>
            <p>
              Our mission is to unite people's efforts to create a better future. We aim to change the approach to solving
              the most important issues by using innovative technologies, transparency, and collaboration.
            </p>
            <p>
              We believe that every person has the right to a safe, healthy, and dignified life. Our team focuses on supporting
              those who need it most, particularly in the fields of healthcare, energy, education, and social equality.
            </p>
            <v-divider class="my-4"></v-divider>
            <p>
              We work to provide people with the tools, resources, and support they need to achieve their goals. Through
              collaboration with communities, charitable organizations, and government agencies, we create projects that have
              a long-term impact.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-[30px] text-center">Our Values</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="py-4 bg-primary text-secondary">
          <v-card-title>
            <span>Transparency</span>
          </v-card-title>
          <v-card-text>
            We work openly and honestly, ensuring transparency in all aspects of our operations.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="py-4 bg-primary text-secondary">
          <v-card-title>
            <span>Sustainable Development</span>
          </v-card-title>
          <v-card-text>
            We support environmental initiatives and strive to minimize our impact on the planet.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-sheet class="pa-6 text-center text-secondary" color="primary" dark>
          <h3 class="text-[30px]">Join Us</h3>
          <p class="text-body-1">
            Together, we can make the world a better place for everyone. Support our initiative today.
          </p>
          <v-btn color="secondary" class="mt-4" large>
            Join Us
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
