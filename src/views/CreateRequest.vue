<template>
    <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
        <v-container class="mx-auto h-full">
            <v-row class="h-full">
                <v-col class="h-full">
                    <v-text-field 
                        outlined
                        label="Title"
                        class="mb-4"
                        v-model="newRequest.title"
                        :rules="[rules.required]"
                    />

                    <v-select 
                        label="Category"
                        v-model="newRequest.category"
                        :items="['military', 'medical', 'vehicle', 'energy', 'other']"
                        :rules="[rules.required]"
                    />

                    <v-textarea 
                        outlined
                        label="Description"
                        v-model="newRequest.description"
                        rows="4"
                        class="mt-4"
                        :rules="[rules.required]"
                    />

                    <div>
                        <v-text-field 
                            outlined
                            label="Donate Goal"
                            type="number"
                            v-model="newRequest.goal"
                        />
                    </div>
                </v-col>

                <v-col class="h-full d-flex flex-column">
                    <v-card>
                        <v-sheet class="p-2">
                            <div class="flex flex-row gap-4 mb-4">
                                <v-text-field outlined label="Need" v-model="newNeed.title"/>
                                <v-text-field outlined label="Count" type="number" v-model="newNeed.count"/>
                            </div>
                            <v-btn @click="AddNewNeed" color="secondary" block>Add</v-btn>
                        </v-sheet>
                    </v-card>

                    <v-card class="mt-4 flex-grow overflow-auto">
                        <v-card-title>List of needs</v-card-title>
                        <v-list>
                            <v-list-item v-for="(need, index) in newRequest.needs" :key="index">
                                <div class="flex justify-between">
                                    <div>
                                        <div class="text-sm">
                                            <template v-if="need.isEditing">
                                                <div class="flex gap-4">
                                                    <v-text-field 
                                                    v-model="need.title" 
                                                    label="Edit Title" 
                                                    outlined
                                                    class="w-1/2"
                                                />
                                                <v-text-field 
                                                    v-model="need.count" 
                                                    label="Edit Count" 
                                                    type="number" 
                                                    outlined
                                                    class="w-1/2"
                                                />
                                                </div>
                                            </template>
                                            <template v-else>
                                                {{ need.title }}
                                                <div>Count: {{ need.count }}</div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex gap-4">
                                        <v-btn v-if="!need.isEditing" color="warning" @click="toggleEditMode(index)">
                                            Edit
                                        </v-btn>
                                        <v-btn v-if="!need.isEditing" color="error" @click="RemoveNeed(index)">X</v-btn>
                                        <v-btn 
                                            v-if="need.isEditing" 
                                            color="primary" 
                                            @click="UpdateNeed(index)"
                                        >
                                            Submit
                                        </v-btn>
                                    </div>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
                
                <v-btn type="submit" block color="primary">
                    Apply changes
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup>
import rules from '@/utils/validation/rules';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userToken } from '@/plugins/auth';
import { jwtDecode } from "jwt-decode";
import { fetchData } from '@/utils/api';

const router = useRouter()
const user = jwtDecode(userToken.value).user

const newRequest = reactive({
  title: '',
  category: '',
  description: '',
  goal: 0,
  collected: 0,
  needs: [],
  location:user.location,
  author:`${user.organization}`,
})

const newNeed = reactive({
    title: '',
    count: 0,
    completed: false
})

function AddNewNeed() {
    if (!newRequest.needs.some(need => need.title === newNeed.title)) {
        newRequest.needs.push({
            title: newNeed.title,
            count: newNeed.count,
            completed: newNeed.completed,
            isEditing: false
        })
    } else {
        alert("Need with such title already exists")
    }
}

function RemoveNeed(index) {
    needs.value.splice(index, 1)
}

function toggleEditMode(index) {
    const need = newRequest.needs[index]
    need.isEditing = !need.isEditing
}

function UpdateNeed(index) {
    const need = newRequest.needs[index]
    need.isEditing = false
}

async function handleSubmit() {
    if (!newRequest.goal && newRequest.needs.length === 0) {
        alert("You can't create a request with no goal and needs")
        return
    }

    const data = await fetchData("requests",{
        method:"POST",
        body:JSON.stringify({
            ...newRequest, goal:Number(newRequest.goal)
        })
    })
    if(data.message === "This organization already has an existing request.")
    {
        alert(data.message)
        return
    }

    if(data.message)
    {
        alert(data.message)
        router.push(`/request-for-volunteering/${data.id}`)
    }
}


</script>
