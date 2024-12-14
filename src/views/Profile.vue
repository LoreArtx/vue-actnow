<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="12" md="4">
              <v-avatar size="100">
                <img src="https://via.placeholder.com/150" alt="User avatar" />
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <h1 class="text-h4 font-weight-bold">{{ user.first_name }} {{ user.last_name }}</h1>
              <p class="text-body-1">{{ user.description || "No description provided." }}</p>
              <v-btn color="primary" class="mt-2 mr-2" @click="handleEditProfile">Edit Profile</v-btn>
              <v-btn @click="deleteUser" class="mt-2" color="error" large> Delete user </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="blue" class="mr-2">mdi-phone</v-icon>
            <span>Contact Information</span>
          </v-card-title>
          <v-card-text>
            <p>Phone: {{ user.phone_number }}</p>
            <p>Email: <i>Not available</i></p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="purple" class="mr-2">mdi-account</v-icon>
            <span>Account Details</span>
          </v-card-title>
          <v-card-text>
            <p>Role: {{ user.role }}</p>
            <p>ID: {{ user._id }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col v-if="user.role === 'user'" cols="12">
        <v-btn @click="router.push('/become-volunteer')" color="warning" large block>
          Become a volunteer
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn @click="handleSignOut" color="error" large block>
          Sign out
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { clearAuth } from '@/plugins/auth';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { userToken } from '@/plugins/auth';
import { jwtDecode } from 'jwt-decode';
import { fetchData } from '@/utils/api';

const router = useRouter();

const user = reactive(jwtDecode(userToken.value).user)

function handleSignOut() {
  clearAuth();
  router.go();
}

function handleEditProfile() {
  alert("Edit profile functionality coming soon!");
}


async function deleteUser() {
    try {
        const response = await fetchData(`user/${user._id}`, {
            method: "DELETE",
        });

        if (response.message === "User deleted successfully") {
            alert("User was successfully deleted.");
            window.location.reload();
            clearAuth();
        } else {
            alert("Failed to delete user. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}
</script>
