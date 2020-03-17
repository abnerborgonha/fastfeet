import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.senddMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
        date: format(
          parseISO(order.start_date),
          "'dia' dd 'de' MMMM, 'às' HH:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
