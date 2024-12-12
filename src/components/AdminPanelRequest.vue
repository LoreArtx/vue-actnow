<template>
    <v-list lines="1">
        <RouterLink :to="{name:'request-for-voluenteering-settings'}">
            <v-list-item value="Update" title="Update"></v-list-item>
        </RouterLink>
        
        <v-list-item @click="handleToggleClosedRequest" :title="route.meta.request.closed ? 'Open the request':'Close the request'"></v-list-item>
    </v-list>
</template>

<script setup>
import { fetchData } from '@/utils/api';
import { RouterLink } from 'vue-router';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const handleToggleClosedRequest = async () => {
  try {
    const response = await fetchData(`http://localhost:5555/api/actnow/requests/${route.meta.request._id}`, {
      method: "PATCH",
      body: JSON.stringify({ closed: !route.meta.request.closed })
    });

    if (!response.ok) {
      throw new Error(`Failed to update request: ${response.statusText}`);
    }

    router.push("/");
  } catch (error) {
    console.error("Error closing request:", error);
  }
};

</script>