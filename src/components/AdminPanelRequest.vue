<template>
    <v-list lines="1">
        <RouterLink :to="{name:'request-for-voluenteering-settings'}">
            <v-list-item value="Update" title="Update"></v-list-item>
        </RouterLink>
        
        <v-list-item @click="handleToggleClosedRequest" :title="route.meta.request.closed ? 'Open the request':'Close the request'"></v-list-item>

        <v-list-item @click="deleteRequest" title="Delete request"></v-list-item>
    </v-list>
</template>

<script setup>
import { fetchData } from '@/utils/api';
import { RouterLink } from 'vue-router';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
async function handleToggleClosedRequest()  {
  try {
    const data = await fetchData(`requests/${route.meta.request._id}`, {
      method: "PATCH",
      body: JSON.stringify({ closed: !route.meta.request.closed })
    });

    alert(data.message)

    router.go();
  } catch (error) {
    console.error("Error closing request:", error);
  }
};

async function deleteRequest() {
  if (!route.meta.request._id) {
    throw new Error("Request ID is required");
  }

  try {
    const data = await fetchData(`requests/${route.meta.request._id}`, {
      method: "DELETE",
    });

    alert(data.message);
    router.push("/")
  } catch (error) {
    console.error(`Failed to delete request ${route.meta.request._id}:`, error);
    throw error;
  }
}


</script>