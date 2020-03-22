import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    font-size: 22px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        height: 36px;
        width: 120px;
        background: #7159c1;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        margin-left: 4px;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;

        &:first-child {
          background: #aaa;

          &:hover {
            background: ${darken(0.03, '#aaa')};
          }
        }

        &:hover {
          background: ${darken(0.03, '#7159c1')};
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-right: 6px;
          }

          svg {
            margin: 3px;
          }
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;

  > div {
    display: flex;
    justify-content: center;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5px 0;

  &:first-child {
    margin-right: 5px;
  }

  strong {
    font-size: 15px;
    margin: 5px;
    font-weight: bold;
  }

  span {
    color: #f00;
  }
`;
