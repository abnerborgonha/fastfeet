import * as Yup from 'yup';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'street_number',
            'complement',
            'state',
            'city',
            'neighborhood',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not exists' });
    }

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancelation',
      context: {
        deliveryman: deliveryman.name,
        product: order.product,
        name: recipient.name,
        state: recipient.state,
        city: recipient.city,
        neighborhood: recipient.neighborhood,
        street: recipient.street,
        street_number: recipient.street_number,
        complement: recipient.complement,
        zip_code: recipient.zip_code,
      },
    });

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova Entrega',
      text: 'Você tem uma nova Entrega',
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id, {
      attributes: ['id', 'recipient_id', 'deliveryman_id', 'product'],
    });

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const { id, recipient_id, deliveryman_id, product } = await order.update(
      req.body
    );

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    await order.destroy();

    return res.json();
  }
}

export default new OrderController();
