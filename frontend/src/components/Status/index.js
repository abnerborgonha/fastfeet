import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';

export default function Status({ status }) {
  const [colors, setColors] = useState({
    primary: '',
    secundary: '',
  });

  useEffect(() => {
    switch (status) {
      case 'RETIRADA': {
        setColors({
          primary: '#4D85EE',
          secundary: '#BAD2FF',
        });
        break;
      }
      case 'CANCELADA': {
        setColors({
          primary: '#DE3B3B',
          secundary: '#FAB0B0',
        });
        break;
      }
      case 'ENTREGUE': {
        setColors({
          primary: '#2CA42B',
          secundary: '#DFF0DF',
        });
        break;
      }
      case 'PENDENTE':
        setColors({
          primary: '#C1BC35',
          secundary: '#F0F0DF',
        });
        break;
      default:
    }
  }, [status]);

  return (
    <Content primary={colors.primary} secundary={colors.secundary}>
      <div />
      <span>{status}</span>
    </Content>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
