import styled from '@emotion/styled'
const NAV_HEIGHT = 70;

const FullHeightContainer = styled.div`
  height: calc(100vh - ${NAV_HEIGHT}px);
  display: flex;
  align-items: center;
`

export default FullHeightContainer;