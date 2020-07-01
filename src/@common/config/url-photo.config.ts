import { registerAs } from "@nestjs/config"

export default registerAs('urlPhoto', () => {
    const url = `${process.env.APP_HOST}${process.env.PORT ? ":"+process.env.PORT : null}/${process.env.PREFIX}/i`
    return { url }
})