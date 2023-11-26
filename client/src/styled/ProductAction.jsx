import styled from "@emotion/styled";
import { CardActions } from "@mui/material";

const ProductAction = styled(CardActions)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  & * { color: black !important; }
`;

const CartProductActions = styled(CardActions)`
  display: grid;
  align-items: start;
  flex: 1;
`;

export { ProductAction, CartProductActions };