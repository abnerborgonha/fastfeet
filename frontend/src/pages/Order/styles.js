import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1024px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  strong {
    font-size: 22px;
    margin-bottom: 50px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      background: #fff;
      border: 1px solid #ccc;
      height: 36px;

      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eee;
      border-radius: 4px;

      svg {
        margin: 0 5px;
      }
    }

    input {
      border: 0;
      background: none;

      &::placeholder {
        color: #aaa;
      }
    }

    button {
      height: 36px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      display: flex;
      align-items: center;
      transition: background 0.2s;

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
`;

export const RecipientInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  span {
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  span {
    font-size: 15px;
    margin-bottom: 8px;

    strong {
      margin-right: 5px;
    }
  }
`;

export const Signature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  strong {
    font-size: 14px;
    margin: 8px 0;
  }

  img {
    align-self: center;
    width: 220px;
    height: 80px;
  }
`;
