import { keyframes } from 'styled-components'

/**
 * fadeins left or right for toast notification
 */
 export const toastInRight = keyframes`
 from { transform: translateX(100%); }
 to { transform: translateX(0); }
`;

export const toastInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
 `;