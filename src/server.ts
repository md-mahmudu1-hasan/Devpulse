import config from './config'
import app from './app'
import { initDB } from './db'

const main = async () => {
    initDB();

    app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`)
    })
}

main()