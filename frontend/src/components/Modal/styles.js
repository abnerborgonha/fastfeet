import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px;
  text-align: left;
  position: relative;
  svg {
    margin-top: 6px;
  }
  position: relative;
`;

export const Badge = styled.button`
  border: none;
  background: none;
  position: relative;
`;

export const MoreList = styled.div`
  position: absolute;
  width: 120px;
  left: calc(50% - 60px);
  top: 100%;
  background: #ddd;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
  }
`;

export const More = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    border: 0;
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
    height: 100%;
    background: #ddd;
    padding: 5px 0;

    &:last-child {
      border-bottom: none;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
