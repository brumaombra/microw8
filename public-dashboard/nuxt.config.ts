import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    ssr: true,

    runtimeConfig: {
        // Database connection
        mysqlIp: process.env.MYSQL_IP || '',
        mysqlPort: process.env.MYSQL_PORT || '',
        mysqlUser: process.env.MYSQL_USER || '',
        mysqlPassword: process.env.MYSQL_PASSWORD || '',
        mysqlDatabase: process.env.MYSQL_DATABASE || '',

        // Public runtime config
        public: {
            nuxtEnvironment: process.env.NUXT_ENVIRONMENT || 'development', // Nuxt environment (development, production, etc.)
            inferenceServerUrl: process.env.INFERENCE_SERVER_URL || 'http://localhost:3002', // URL of the inference server
            pollingInterval: parseInt(process.env.POLLING_INTERVAL || '60'), // Polling interval for getting queue data, in seconds
            cameras: JSON.parse(process.env.CAMERAS || '[]') // Cameras configuration array
        }
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            }
        }
    },

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss()
        ]
    },

    modules: [
        // Nuxt modules
    ],

    devtools: {
        enabled: false
    },

    nitro: {
        prerender: {
            routes: [
                '/'
            ]
        }
    },

    compatibilityDate: '2025-09-24'
});