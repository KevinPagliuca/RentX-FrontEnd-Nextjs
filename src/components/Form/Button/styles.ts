import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 5rem;
  text-decoration: none;
`;

type ButtonComponentProps = {
  variant?: 'transparent' | 'red' | 'green' | undefined;
};

export const ButtonComponent = styled.button<ButtonComponentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font: 500 1.125rem 'Inter', sans-serif;
  line-height: 1.375rem;
  padding: 1.325px 5rem;
  background: var(--main);
  color: var(--white);
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;

  &:disabled {
    opacity: 0.5;
    &:hover {
      cursor: not-allowed;
    }
  }

  &:not(:disabled):hover {
    background: ${darken(0.2, '#DC1637')};
  }

  ${({ variant }) =>
    variant === 'transparent' &&
    css`
      background: transparent;
      border-color: var(--gray-300);
      color: var(--gray-500);

      &:hover {
        background: var(--gray-300) !important;
      }
    `}
  ${({ variant }) =>
    variant === 'green' &&
    css`
      background: var(--green-500) !important;
      background: transparent;
      border-color: var(--green-500);

      &:hover {
        filter: brightness(0.9);
      }
    `}
`;
