import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/reset.css'
import './styles/tokens.css'
import './styles/typography.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/animations.css'

createApp(App).use(router).mount('#app')