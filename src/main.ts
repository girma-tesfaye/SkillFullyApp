import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './plugins/apollo'
import './style.css'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import pinia from './plugins/pinia';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
    return () => h(App)
  }
})

app.use(pinia)
   .use(router)
   .use(vuetify)

app.mount('#app')
