import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, inputRef, fieldName]);

  return (
    <>
      <Container>
        <input ref={inputRef} {...rest} />
        {error && <span>{error}</span>}
      </Container>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
