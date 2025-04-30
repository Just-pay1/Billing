import { app } from "./app";
import { dbConnection } from "./db/config";
import { externalDbConnection } from "./db/external";
import { RabbitMQ } from "./utilities/rabbitmq";

const port = app.get("port");

async function startApp() {
    await dbConnection();
    await externalDbConnection();
    const rabbitMQ = await RabbitMQ.getInstance();
    // await rabbitMQ.consumeFromMerchantsQueue();
}

const server = app.listen(port, () => {
    console.log(`Listening on ${port}`);
    startApp();
})