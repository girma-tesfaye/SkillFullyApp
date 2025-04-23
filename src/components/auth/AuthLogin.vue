<script setup lang="ts">
import { ref } from 'vue';
import { LOGIN } from '@/graphql';
import { useMutation } from '@vue/apollo-composable';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const checkbox = ref(true);
const show1 = ref(false);
const password = ref('Test123!');
const email = ref('example@org.com');

const { mutate, loading, error } = useMutation(LOGIN);
const { setToken } = useAuthStore();
const { setUser }= useUserStore()

const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
        const response = await mutate({
            input:{ 
                email: email.value,
                password: password.value
            }
        });
        if (response && response.data) {
            setToken(response.data.login.access_token);
            setUser(response.data.login.user)
            router.push({ path: '/' }); 
        }
    } catch (err) {
        console.error('GraphQL Error:', err);
    }
};
</script>

<template>
    <div class="header">
        <h3 class="title">Login</h3>
        <router-link to="/auth/register" class="register-link">
             Don't Have an account?
        </router-link>
    </div>
    <form class="login-form" @submit="handleSubmit">
        <div class="form-group">
            <v-label>Email Address</v-label>
            <v-text-field
                aria-label="email address"
                v-model="email"
                class="input-field"
                density="comfortable"
                required
                hide-details="auto"
                variant="outlined"
                color="primary"
            ></v-text-field>
        </div>
        <div class="form-group">
            <v-label>Password</v-label>
            <v-text-field
                aria-label="password"
                v-model="password"
                required
                variant="outlined"
                density="comfortable"
                color="primary"
                hide-details="auto"
                :type="show1 ? 'text' : 'password'"
                class="input-field"
            >
            
            </v-text-field>
        </div>

        <div class="form-group checkbox-group">
            <v-checkbox
                v-model="checkbox"
                label="Keep me sign in"
                required
                color="primary"
                class="checkbox"
                hide-details
            ></v-checkbox>
            <div class="forgot-password">
                <router-link to="/forgot-pwd1" class="forgot-password-link">Forgot Password?</router-link>
            </div>
        </div>
        <div>
            <v-alert
                v-if="error"
                type="error"
                class="alert"
            >
                {{ error.message }}
            </v-alert>
        </div>
        <v-btn
            color="primary"
            block
            class="submit-button"
            variant="flat"
            size="large"
            rounded="md"
            type="submit"
            :loading="loading"
        >
            Login
        </v-btn>

    </form>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.title {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0;
}

.register-link {
    color: var(--v-primary-base);
    text-decoration: none;
}

.login-form {
    margin-top: 1.75rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.input-field {
    margin-top: 0.5rem;
}

.checkbox-group {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1.75rem;
}

.checkbox {
    margin-left: -0.5rem;
}

.forgot-password {
    margin-left: auto;
}

.forgot-password-link {
    color: var(--v-darkText-base);
    text-decoration: underline;
}

.alert {
    margin-top: 1rem;
}

.submit-button {
    margin-top: 1.25rem;
}
</style>
