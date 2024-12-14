<template>
  <v-container>
    
    <v-row>
      <v-col cols="12">
        <v-subheader class="text-h5">Users</v-subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="user in users" :key="user._id" cols="12" md="6" lg="4">
        <v-card v-if="user.role !== 'admin'">
          <v-card-title>
            <span>{{ user.first_name }} {{ user.last_name }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="editUser(user)">Edit</v-btn>
            <v-btn 
              :color="user.role === 'volunteer' ? 'error' : 'success'" 
              @click="toggleVolunteerStatus(user)">
              {{ user.role === 'volunteer' ? 'Remove Volunteer' : 'Make Volunteer' }}
            </v-btn>
            <v-btn color="error" @click="deleteUser(user)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-6 border-black border-8"/>

    <v-row>
      <v-col cols="12">
        <v-subheader class="text-h5">Requests</v-subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="request in requests" :key="request._id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>
            <span>{{ request.title }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" :to="'/request-for-volunteering/'+request._id+'/settings'">Edit</v-btn>
            <v-btn color="error" @click="deleteRequest(request)">Delete</v-btn>
            <v-btn color="warning" @click="toggleCloseRequest(request)">
              {{ request.closed ? "Open" : "Close" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchData } from '@/utils/api';
import useRequests from '@/stores/volunteer-requests';
import { storeToRefs } from 'pinia';

const users = ref([]);
const { requests } = storeToRefs(useRequests()); 

onMounted(async () => {
    try {
        const data = await fetchData("users");
        users.value = data.users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

function editUser(user) {
  alert(`Editing ${user.first_name} ${user.last_name}`);
}

async function toggleVolunteerStatus(user) {
  try {
    const newRole = user.role === 'volunteer' ? 'user' : 'volunteer';
    const data = await fetchData(`user/${user._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ role: newRole }),
    });

    if (data.token) {
      alert('Role updated successfully!');
      user.role = newRole;
    } else {
      alert('Token update failed');
    }
  } catch (error) {
    alert(error.message);
  }
}

async function deleteUser(user) {
  try {
    const response = await fetchData(`user/${user._id}`, {
      method: 'DELETE',
    });
    if (response.message === 'User deleted successfully') {
      alert('User deleted');
      users.value = users.value.filter(u => u._id !== user._id);
    } else {
      alert('Failed to delete user');
    }
  } catch (error) {
    alert('An error occurred while deleting user');
    console.error(error);
  }
}

async function deleteRequest(request) {
  try {
    const data = await fetchData(`requests/${request._id}`, {
      method: 'DELETE',
    });
    if (data.message === 'Request deleted successfully') {
      alert('Request deleted');
      requests.value = requests.value.filter(r => r._id !== request._id);
    } else {
      alert('Failed to delete request');
    }
  } catch (error) {
    alert('An error occurred while deleting request');
    console.error(error);
  }
}

async function toggleCloseRequest(request) {
  try {
    const data = await fetchData(`requests/${request._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ closed: !request.closed }),
    });

      alert(data.message);
      request.closed = !request.closed;
  } catch (error) {
    alert('An error occurred while toggling request status');
    console.error(error);
  }
}
</script>

<style scoped>
.v-row {
  margin-top: 20px;
}
</style>
