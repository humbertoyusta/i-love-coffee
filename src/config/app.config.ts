import * as Joi from "joi"

export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
})

export const JoiValidateDatabaseInfo = Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().default('postgres'),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().default('postgres'),
})