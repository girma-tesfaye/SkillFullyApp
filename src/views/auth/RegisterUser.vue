<script setup lang="ts">
import { ref } from 'vue';
import { SIGNUP } from '@/graphql';
import { useMutation } from '@vue/apollo-composable';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const authStore = useAuthStore();

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const orgId = ref("679357431636486d6512f534");



// Handle form submission
const { mutate, loading, error } = useMutation(SIGNUP);

const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
        const response = await mutate({
            signupInput: {
                firstName: firstname.value,
                lastName: lastname.value,
                email: email.value,
                password: password.value,
                orgId: orgId.value,
            }
        });
        if (response && response.data) {
            authStore.setToken(response.data.signUp.access_token);
            router.push('/');
        }
    } catch (err) {
        console.error('GraphQL Error:', err);
    }
};
</script>

<template>
<div class="container">
    <div class="header">
        <h3>Register</h3>
        <router-link to="/login" class="login-link">Already have an account?</router-link>
    </div>
    <form class="form" @submit="handleSubmit">
        <div class="form-group">
            <v-label>First Name</v-label>
            <v-text-field
                aria-label="first name"
                v-model="firstname"
                type="text"
                required
                class="input"
                density="comfortable"
                hide-details="auto"
                variant="outlined"
                color="primary"
            ></v-text-field>
        </div>
        <div class="form-group">
            <v-label>Last Name</v-label>
            <v-text-field
                aria-label="last name"
                v-model="lastname"
                type="text"
                required
                class="input"
                density="comfortable"
                hide-details="auto"
                variant="outlined"
                color="primary"
            ></v-text-field>
        </div>
        <div class="form-group">
            <v-label>Email Address</v-label>
            <v-text-field
                aria-label="email address"
                v-model="email"
                type="email"
                required
                class="input"
                density="comfortable"
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
                type="password"
                required
                class="input"
                density="comfortable"
                hide-details="auto"
                variant="outlined"
                color="primary"
            ></v-text-field>
        </div>
        <v-btn
            type="submit"
            color="primary"
            class="submit-btn"
            :loading="loading"
        >
            Register
        </v-btn>
    </form>
</div>
</template>

<style scoped>
.container {
    width: 100%;
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.header {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.header h3 {
    text-align: center;
    margin-bottom: 0;
}

.login-link {
    color: var(--v-primary-base);
    text-decoration: none;
}

.form {
    margin-top: 1.75rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.input {
    margin-top: 0.5rem;
}

.submit-btn {
    width: 100%;
}
</style>
