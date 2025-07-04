// app.config.js
import 'dotenv/config';

export default {
    expo: {
        name: 'artFinder',
        slug: 'find-art',
        version: '1.0.0',
        extra: {
            apiUrl: process.env.SERVER_URL,
        },
    },
};