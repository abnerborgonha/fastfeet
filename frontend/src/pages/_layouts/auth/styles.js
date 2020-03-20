import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  background: #fff;
  padding: 50px 20px;
  border-radius: 4px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      margin: 10px 0;
      font-weight: bold;
      align-self: flex-start;
    }

    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: #aaa;
      }
    }

    span {
      color: #fc2d01;
      align-self: flex-start;
      margin: 0 0 10px;
      font-size: 12px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }
  }
`;
