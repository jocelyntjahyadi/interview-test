import env from ''

const config: ConnectionOptions = {
    'type' : 'postgres',
    'url' : process.env.DB_URL,
    'entities' : [process.env.ENTITY_PATH],
    'synchronize' : true,
}