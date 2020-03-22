import styled from 'styled-components';

export const Content = styled.table`
  width: 100%;
  border-spacing: 0 20px;

  thead th {
    color: #333;
    text-align: left;
    font-size: 16px;
    padding: 5px 10px;

    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    background: #fff;
    padding: 5px 10px;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      text-align: right;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }

    main {
      display: flex;
      align-items: center;

      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
`;
