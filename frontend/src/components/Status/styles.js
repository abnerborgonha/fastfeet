import styled from 'styled-components';

export const Content = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${props => props.secundary};

  div {
    height: 7px;
    width: 7px;
    border-radius: 5px;
    background: ${props => props.primary};
  }

  span {
    font-weight: bold;
    color: ${props => props.primary};
    margin-left: 6px;
  }
`;
