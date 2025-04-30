import amqp, { Channel, ChannelModel, ConsumeMessage } from "amqplib";
import { ACTIVE_MERCHANTS, RABBITMQ_IP, MAILS_QUEUE, RABBITMQ_PORT, RABBITMQ_USERNAME, RABBITMQ_PASSWORD } from "../config";
import { InternalService } from "../services/internal-service";


export class RabbitMQ {
    private static instance: RabbitMQ;
    private connection!: ChannelModel;
    // private readonly url = RABBITMQ_IP || "amqp://localhost";
    private mailChannel: Channel | null = null;
    private activeMerchantsChannel: Channel | null = null;



    public static async getInstance(): Promise<RabbitMQ> {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
            await RabbitMQ.instance.init();
        }
        return RabbitMQ.instance;
    }


    private async init(): Promise<void> {
        try {
            // init connection and channels
            // this.connection = await amqp.connect(this.url);
            this.connection = await amqp.connect({
                protocol: 'amqps', // or 'amqps' if using SSL
                hostname: RABBITMQ_IP || 'localhost', // or the IP address of your RabbitMQ container
                port: Number(RABBITMQ_PORT) || 5672,
                username: RABBITMQ_USERNAME,
                password: RABBITMQ_PASSWORD,
                vhost: RABBITMQ_USERNAME,
                frameMax: 8192 // Ensure this is at least 8192
            });

            this.activeMerchantsChannel = await this.connection.createChannel();
            this.mailChannel = await this.connection.createChannel();

            // assert each queue to its channel
            await this.activeMerchantsChannel.assertQueue(ACTIVE_MERCHANTS!);
            await this.mailChannel.assertQueue(MAILS_QUEUE!)

            console.log('== RabbitMQ Connected ==');
        } catch (error) {
            console.error('RabbitMQ Connection Error:', error);
        }
    }

    public async sendMail(message: object) {
        await this.mailChannel?.sendToQueue(MAILS_QUEUE!, Buffer.from(JSON.stringify(message)))
    }

    public async consumeFromMerchantsQueue(){
        await this.activeMerchantsChannel?.consume(ACTIVE_MERCHANTS!, async (msg: ConsumeMessage | null) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString());
                const shouldAck = await InternalService.createActiveMerchant(data)
                shouldAck ? this.activeMerchantsChannel?.ack(msg) : this.activeMerchantsChannel?.nack(msg, false, false) ;
            }
        })
    };

}