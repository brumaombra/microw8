import knexLib from 'knex';
import { handleError } from '~/server/utils/error.js';

const runtimeConfig = useRuntimeConfig(); // Get the runtime configuration
let knex; // Knex instance

// Check the required environment variables
const checkRequiredEnvVariables = () => {
    const requiredEnvVariables = ['mysqlIp', 'mysqlPort', 'mysqlUser', 'mysqlPassword', 'mysqlDatabase'];
    const missingEnvVariables = requiredEnvVariables.filter(variable => !runtimeConfig[variable]);
    if (missingEnvVariables.length) {
        const message = `Missing environment variables: ${missingEnvVariables.join(', ')}`;
        throw new Error(message);
    }
}

// Initialize the MySQL database
export const initMySqlDatabase = async () => {
    try {
        // Check the required environment variables
        checkRequiredEnvVariables();

        // Initialize the Knex library
        knex = knexLib({
            client: 'mysql2',
            connection: {
                host: runtimeConfig.mysqlIp,
                port: runtimeConfig.mysqlPort,
                user: runtimeConfig.mysqlUser,
                password: runtimeConfig.mysqlPassword,
                database: runtimeConfig.mysqlDatabase,
                typeCast: typeCast, // Format the values after reading them from the database
                timezone: 'Z' // UTC (Z represents UTC in ISO 8601)
            }, pool: {
                min: 0, // Minimum number of connections
                max: 7, // Maximum number of connections
                acquireTimeoutMillis: 60000, // Maximum time to acquire a connection
                createTimeoutMillis: 30000, // Maximum time to create a connection
                idleTimeoutMillis: 30000, // Maximum time a connection can be idle
                createRetryIntervalMillis: 200 // Time to wait before retrying to create a connection
            }
        });

        // Test the connection
        await knex.raw('SELECT 1');
        console.log('Successfully connected to the database!');
    } catch (error) {
        handleError({ error, message: 'Error while connecting to the database', throwError: true });
    }
};

// Format the values after reading them from the database
const typeCast = (field, next) => {
    // Convert TINYINT(1) to boolean
    if (field.type === 'TINY' && field.length === 1) {
        return field.string() === '1';
    }

    return next();
};

// Get the Knex object
export const getKnex = () => {
    if (!knex) {
        throw new Error('Database connection not initialized. Call initMySqlDatabase() first.');
    }

    return knex;
};