import {cleanEnv, port, str} from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),

    // PRIMARY DATABASE
    MONGO_HOST: str(),
    MONGO_PORT: str(),
    MONGO_DATABASE: str(),

    //RESOURCE DATABASE
    // RDS_HOST: str(),
    // RDS_USER: str(),
    // RDS_PASSWORD: str(),
    // RDS_DATABASE: str(),
    // RDS_PORT: num(),

    ACCESS_TOKEN_SECRET: str(),
    // SMS_PROVIDER_API_KEY: str(),
    // MOBILE_VERIFICATION_PRIVATE_KEY: str(),
  })
}

export default validateEnv
