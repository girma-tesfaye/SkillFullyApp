<script setup lang="ts">

</script>

<template>
    <v-app>
      
      <v-parallax
        src="/download.jpeg"
        height="600"
      >
        <div class="bg-black position-absolute w-100 h-100" style="opacity: 0.4;"></div>
        <v-container class="text-center position-relative" style="z-index: 1; padding-top: 180px;">
          <h1 class="text-h1 font-weight-bold text-white mb-4">SKILLFULLY</h1>
          <div class="text-subtitle-1 text-white mb-8">TRAINING | DEVELOPMENT | SUCCESS</div>
          <div class="d-flex justify-center">
            <v-btn variant="outlined" color="white" class="mx-2">Get started</v-btn>
          </div>
        </v-container>
      </v-parallax>
  
    
   
      <v-container class="py-12 text-center">
        <h2 class="text-h4 mb-6">We Provide digital Training Syatem.</h2>
        <div class="mx-auto mb-6 bg-dark" style="width: 50px; height: 2px;"></div>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 text-medium-emphasis mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </v-col>
        </v-row>
  
       
        <v-row class="mt-8 justify-center text-center">
          <v-col cols="12" sm="6" md="3">
            <v-icon size="x-large" class="mb-4">mdi-school</v-icon>
            <div class="text-uppercase font-weight-medium">Training</div>
            <div class="mx-auto mt-4 bg-dark" style="width: 30px; height: 1px;"></div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-icon size="x-large" class="mb-4">mdi-cogs</v-icon>
            <div class="text-uppercase font-weight-medium">Development</div>
            <div class="mx-auto mt-4 bg-dark" style="width: 30px; height: 1px;"></div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-icon size="x-large" class="mb-4">mdi-trophy</v-icon>
            <div class="text-uppercase font-weight-medium">Success</div>
            <div class="mx-auto mt-4 bg-dark" style="width: 30px; height: 1px;"></div>
          </v-col>
        </v-row>
      </v-container>
  
    
      <v-sheet color="#1E1E2D" class="py-12">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <h3 class="text-h5 text-white mb-4">
                Lorem ipsum dolor sit amet onsectetur
              </h3>
              <p class="text-body-2 text-white">
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
              <p class="text-body-2  text-white mt-4">
                Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
                consequat.
              </p>
              <v-btn variant="outlined" color="white" class="mt-4">LEARN MORE</v-btn>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col v-for="i in 6" :key="i" cols="6" md="4" class="text-center">
                  <v-sheet
                    color="transparent"
                    class="d-flex align-center justify-center"
                    height="100"
                    style="opacity: 0.8; transition: opacity 0.3s ease;"
                    @mouseenter="e => e.target.style.opacity = 1"
                    @mouseleave="e => e.target.style.opacity = 0.8"
                  >
                    <v-img
                      :src="`/placeholder.svg?height=60&width=120`"
                      max-width="120"
                      style="filter: brightness(0) invert(1);"
                    ></v-img>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-app>
  </template>
