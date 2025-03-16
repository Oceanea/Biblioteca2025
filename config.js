config.js
import{CreateConnection, Createpool} from 'mysql2'

Constconfig = Createpool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Apokemon7',
    database: 'biblioteca2025',
    port: 3306,
    enableKeepAlive:true,
    KeepAliveinitialdelay: true})
    export{config}