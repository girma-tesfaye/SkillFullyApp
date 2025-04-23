<script setup lang="ts">
import { ref, watchEffect } from "vue"
import UserDetail from "@/components/user/UserDetail.vue";
import { useUserStore } from "@/stores/user";
import { useQuery } from "@vue/apollo-composable";
import { GET_USER_BY_ID } from "@/graphql";

const userStore = useUserStore()
console.log("user", userStore.user)


const user = ref()
const { result } = useQuery(GET_USER_BY_ID, { userId: userStore.user?.id })


watchEffect(() => {
    if (result.value){
        user.value = result.value.getUserById
    }
})



</script>

<template>
    <div class="mt-8 ml-4">
        <UserDetail :user="user"/>
    </div>
</template>