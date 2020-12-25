import sendMail from '../utils/sendEmail';
import { consumer } from './rabbitmq';

const emailConsumer = async () => {
  try {
    const queueName = 'email';

    const channel = await consumer({
      queueName,
    });

    // consume job from queue
    channel.consume(queueName, async (message) => {
      const content = JSON.parse(message.content.toString());

      if (content) {
        const emailResponse = await sendMail(content);

        if (!emailResponse?.error) {
          channel.ack(message);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default emailConsumer;
