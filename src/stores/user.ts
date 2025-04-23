import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const setUser = (data: User) => {
    user.value = data;
  };

  return {
    user,
    loading,
    error,
    setUser,
  };
}, {
  persist: {
    storage: localStorage,
  },
});
