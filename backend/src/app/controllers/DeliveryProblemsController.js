import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblemsController {
  async index(req, res) {
    const problems = await Order.findAll({
      include: [
        {
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

    const order = await Order.findByPk(problem.order_id);

    const canceled_at = new Date();

    await order.update({ canceled_at });

    return res.json();
  }
}

export default new DeliveryProblemsController();
