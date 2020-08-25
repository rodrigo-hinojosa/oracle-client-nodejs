const oracledb = require('oracledb');
const config = require('./dbConfig.js');

async function runDemoConnection() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        const result = await conn.execute(
            'select id, name from docker_demo'
        );
        console.log('result ->', result);
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

runDemoConnection();