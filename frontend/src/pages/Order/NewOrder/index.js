import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import AsyncSelectInput from '~/components/Form/AsyncSelectInput';
import Input from '~/components/Form/Input';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Field } from './styles';

export default function NewOrder() {
  const formRef = useRef(null);

  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      const data = response.data.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }

    async function loadDeliverymans() {
      const response = await api.get('deliverymans');

      const data = response.data.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      setDeliverymans(data);
    }

    loadRecipients();
    loadDeliverymans();
  }, []);

  async function handleSubmit({ recipient_id, deliveryman_id, product }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
        product: Yup.string().required('O produto é obrigatório'),
      });

      await schema.validate(
        { recipient_id, deliveryman_id, product },
        { abortEarly: false }
      );

      await api.post('orders', {
        recipient_id,
        deliveryman_id,
        product,
      });
      toast.success('A encomenda foi criada com sucesso');
      history.push('/order');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};

        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });

        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de encomendas</strong>
          <div>
            <button type="button" onClick={() => history.push('/order')}>
              <div>
                <MdChevronLeft size={22} />
                <span>VOLTAR</span>
              </div>
            </button>
            <button type="submit">
              <div>
                <MdCheck size={22} />
                <span>SALVAR</span>
              </div>
            </button>
          </div>
        </header>

        <Content>
          <div>
            <Field>
              <strong>Destinatário</strong>
              <AsyncSelectInput
                name="recipient_id"
                placeholder="Destinatários"
                defaultOptions={recipients}
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              />
            </Field>
            <Field>
              <strong>Entregador</strong>
              <AsyncSelectInput
                name="deliveryman_id"
                placeholder="Entregador"
                defaultOptions={deliverymans}
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
              />
            </Field>
          </div>
          <Field>
            <strong>Nome do produto</strong>
            <Input name="product" placeholder="Nome do produto" />
          </Field>
        </Content>
      </Form>
    </Container>
  );
}
