import styled from "styled-components";
import { Button } from "src/UI/Button";

export const Content = styled.div`
  padding: 20px;
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 20px;
  ${({ theme }) => theme.mediaQueries.ll} {
    padding: 16px;
    gap: 16px;
  }
`;

export const ButtonStyled = styled(Button)`
  padding: 15px 20px;
  font-size: 20px;
  line-height: 100%;
  gap: 7px;
  width: fit-content;
  ${({ theme }) => theme.mediaQueries.ll} {
    padding: 12px 16px;
    font-size: 16px;
    gap: 6px;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 20px;
  ${({ theme }) => theme.mediaQueries.ll} {
    gap: 7px;
    padding: 16px;
  }
`;
