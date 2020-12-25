import amqp from 'amqplib';

export const connectRabbitmq = async () => {
  try {
    const amqpServer = process.env.RABBITMQ_SERVER;
    return amqp.connect(amqpServer);
  } catch (err) {
    await connectRabbitmq();
  }
};

export const consumer = async ({ queueName }) => {
  try {
    const connection = await connectRabbitmq();

    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    await channel.prefetch(1);

    return channel;
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const publisher = async ({ queueName, message }) => {
  try {
    const connection = await connectRabbitmq();

    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    return {
      error: false,
      message: 'Job sent successfully to queue',
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
