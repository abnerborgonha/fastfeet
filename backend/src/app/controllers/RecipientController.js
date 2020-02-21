import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      neighborhood: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = req.body;

    const {
      id,
      name,
      street,
      street_number,
      complement,
      state,
      city,
      neighborhood,
      zip_code,
    } = await Recipient.create(recipient);

    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      state,
      city,
      neighborhood,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      street_number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      neighborhood: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found.' });
    }

    const {
      name,
      street,
      street_number,
      complement,
      state,
      city,
      neighborhood,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      state,
      city,
      neighborhood,
      zip_code,
    });
  }
}

export default new RecipientController();
