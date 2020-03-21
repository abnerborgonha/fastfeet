import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdVisibility,
} from 'react-icons/md';

import Modal from '~/components/Modal';
import { Container, Content } from './styles';

import api from '~/services/api';

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');

      setOrders(response.data);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>

      <header>
        <div>
          <MdSearch size={22} color="#ccc" />
          <input type="text" placeholder="Buscar por encomendas" />
        </div>
        <button type="button">
          <div>
            <MdAdd size={22} />
            <span>CADASTRAR</span>
          </div>
        </button>
      </header>

      <Content>
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
              <td>{order.deliveryman.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>
                {order.canceled_at
                  ? 'CANCELADO'
                  : order.end_date
                  ? 'ENTREGUE'
                  : 'PENDENTE'}
              </td>
              <td>
                <Modal>
                  <button type="button">
                    <MdVisibility color="#7159c1" size={12} />
                    Visualizar
                  </button>
                  <button type="button">
                    <MdEdit color="#4D85EE" size={12} />
                    Editar
                  </button>
                  <button type="button">
                    <MdDelete color="#DE3B3B" size={12} />
                    Excluir
                  </button>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Content>
    </Container>
  );
}
