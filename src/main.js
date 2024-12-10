import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//vuetify
import { createVuetify } from 'vuetify/lib/framework.mjs'
import 'vuetify/styles'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

// FontSource
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';

// Store
import useRequests from './stores/volunteer-requests'

import App from './App.vue'
import router from './router'
import { initAuth } from './plugins/auth'
const app = createApp(App)

initAuth()


const vuetify = createVuetify({
    components,
     directives,
      icons:{defaultSet:'mdi',aliases,sets:{mdi}},
      theme:{
        themes:{
            light:{
                colors:{
                    primary: colors.blue.darken4,
                    secondary:colors.yellow.base
                }
            }
        }
      }
})
app.use(createPinia())
app.use(vuetify)



const requestsStore = useRequests()
await requestsStore.initRequests()

app.use(router)

app.mount('#app')
