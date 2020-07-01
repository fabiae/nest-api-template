import { registerAs } from "@nestjs/config"

export default registerAs('sendgrid', () => ({
    apiKey: process.env.SENDGRID_KEY,
    fromEmail: process.env.FROM_EMAIL
}))