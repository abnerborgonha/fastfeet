import * as Yup from 'yup';
import { format } from 'date-fns';
import { Op } from 'sequelize';
import { pt } from 'date-fns/locale';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import Mail from '../../lib/Mail';

class DeliveryProblemsController {
  async index(req, res) {
    const problems = await Order.findAll({
      include: [
        {
          where: { [Op.not]: { description: null } },
          attributes: ['id', 'description'],
          association: 'problems',
        },
      ],
    });

    return res.json(problems);
  }

  async indexProblem(req, res) {
    const order = await Order.findAll({
      where: { id: req.params.id },
      include: [
        {
          attributes: ['id', 'description'],
          association: 'problems',
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const orderExists = await Order.findByPk(id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const { description } = req.body;

    const problem = await DeliveryProblem.create({ description, order_id: id });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const order = await Order.findByPk(problem.order_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
        date: format(order.start_date, "'dia' dd 'de' MMMM, 'às' HH:mm'h'", {
          locale: pt,
        }),
      },
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemsController();
