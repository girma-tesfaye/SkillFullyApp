<script setup>
import AuthLogin from '@/components/auth/AuthLogin.vue';
</script>

<template>
  <v-row class="bg-containerBg relative" no-gutters>
    <!-- Login Part -->
    <v-col cols="12" lg="12" class="login-align-center">
      <v-container>
        <div class="login-wrapper">
          <v-row justify="center">
            <v-col cols="12" md="6" lg="4">
              <v-card elevation="0" variant="outlined" rounded="lg" class="login-box">
                <v-card-text class="login-container">
                  <div class="text-center">
                    <v-btn
                      color="grey"
                      block
                      class="social-login-button mb-4"
                      prepend-icon="mdi-google"
                    >
                      Sign in with Google
                    </v-btn>
                    <v-row>
                      <v-col cols="12" class="divider-center">
                        <v-divider />
                        <div class="or-button">OR</div>
                        <v-divider />
                      </v-col>
                    </v-row>
                  </div>
                  
                  <!-- Login Form -->
                  <AuthLogin />

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!-- Login Part -->
  </v-row>
</template>

<style lang="scss">

.login-box {
  max-width: 375px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

.login-container {
  padding: 20px;
  border-radius: 8px;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 148px);
}

.login-align-center {
  display: flex;
  align-items: center;
}

.social-login-button {
  background-color: #f5f5f5; 
  color: #757575; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 4px;
  text-transform: none; 
}

.social-login-button .v-btn__prepend {
  margin-right: 8px;
}

.divider-center {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.or-button {
  padding: 0 10px;
  position: relative;
  top: -10px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
}
</style>