// Quasar styles and extras
import { Quasar } from 'quasar'
import 'quasar/src/css/flex-addon.sass'
import 'quasar/src/css/index.sass'
import { createApp } from 'vue'

// Our CSS files
import App from './app.vue'

import '@/assets/fonts.css'
import '@/styles.scss'

/* ========================================================================== *
 * Initialize and mount app                                                   *
 * ========================================================================== */

// Create and initialize app
createApp(App).use(Quasar).mount('#app')
