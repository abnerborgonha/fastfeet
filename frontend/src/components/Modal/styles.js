import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const Content = styled.div`
  padding: 20px;
`;

export const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 4px;
  }
`;
