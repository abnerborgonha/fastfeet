import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdVisibility,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Modal from '~/components/Modal';
import history from '~/services/history';

import MenuModal from '~/components/MenuModal';
import Table from '~/components/Table';
import Status from '~/components/Status';

import { Container, RecipientInfo, DateInfo, Signature } from './styles';

import api from '~/services/api';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState('');

  async function loadOrders(productName) {
    const response = await api.get(`/orders?q=${productName}`);

    const data = response.data.map(order => ({
      ...order,
      start_date_formatted: order.start_date
        ? format(parseISO(order.start_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
      end_date_formatted: order.end_date
        ? format(parseISO(order.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
    }));

    setOrders(data);
  }

  useEffect(() => {
    loadOrders(product);
  }, [product]);

  function handleNew() {
    history.push('/order/new');
  }

  function handleEdit(order) {
    history.push({
      pathname: '/order/edit',
      state: { order },
    });
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);
      loadOrders(product);
      toast.warn('Encomenda deletada com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>

      <header>
        <div>
          <MdSearch size={22} color="#ccc" />
          <input
            type="text"
            placeholder="Buscar por encomendas"
            onChange={e => setProduct(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleNew}>
          <div>
            <MdAdd size={22} />
            <span>CADASTRAR</span>
          </div>
        </button>
      </header>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td>#{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>
                <main>
                  <img
                    src={
                      order.deliveryman.avatar
                        ? order.deliveryman.avatar.url
                        : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
                    }
                    alt={order.deliveryman.name}
                  />
                  {order.deliveryman.name}
                </main>
              </td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>
                <Status status={order.status} />
              </td>
              <td>
                <MenuModal>
                  <Modal
                    trigger={
                      <button type="button">
                        <MdVisibility color="#7159c1" size={12} />
                        Visualizar
                      </button>
                    }
                  >
                    <RecipientInfo>
                      <strong>Informações da encomenda</strong>
                      <span>
                        {`${order.recipient.street},
                          ${order.recipient.street_number}`}
                      </span>
                      <span>{`${order.recipient.city} - ${order.recipient.state}`}</span>
                    </RecipientInfo>
                    <DateInfo>
                      <strong>Datas</strong>
                      <span>
                        <strong>Retirada:</strong>
                        {order.start_date_formatted || 'PENDENTE'}
                      </span>
                      <span>
                        <strong>Entrega:</strong>
                        {order.end_date_formatted || 'PENDENTE'}
                      </span>
                    </DateInfo>
                    <Signature>
                      <strong>Assinatura do destinatário</strong>
                      {order.signature && (
                        <img
                          src={order.signature.url}
                          alt="assinatura do destinatário"
                        />
                      )}
                    </Signature>
                  </Modal>
                  <button type="button" onClick={() => handleEdit(order)}>
                    <MdEdit color="#4D85EE" size={12} />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Você tem certeza que deseja deletar essa encomenda?'
                        )
                      )
                        handleDelete(order.id);
                    }}
                  >
                    <MdDelete color="#DE3B3B" size={12} />
                    Excluir
                  </button>
                </MenuModal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
