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

export const Content = styled.table`
  width: 100%;
  border-spacing: 0 20px;

  thead th {
    color: #333;
    text-align: left;
    font-size: 16px;
    padding: 5px 10px;
  }

  tbody td {
      background: #fff;
      padding: 5px 10px;

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
  }
`;
