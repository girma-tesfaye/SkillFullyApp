import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  orgId: string;
}


export const useAuthStore = defineStore(
  'auth',
  () => {

    const access_token = ref<string | null>(null);
    const user = ref<User | null>(null);

    const router = useRouter();


    const setToken = (token: string) => {
      access_token.value = token;
    }

    const setUser = (userData: User) => {
      user.value = userData;
    }
    const logout = () => {
      access_token.value = null;
      user.value = null;
      router.push('/')
    }

    const isAuthenticated = computed(() => {
      return !!access_token.value;
    })

    return {
      access_token,
      user,
      setToken,
      setUser,
      logout,
      isAuthenticated,
    };
  },
  {

    persist: {
      storage: localStorage,
    },

  }
);