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

import useRequests from './stores/volunteer-requests'

import App from './App.vue'
import router from './router'
const app = createApp(App)
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
