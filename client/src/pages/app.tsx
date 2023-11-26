import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ProductItem } from '../store/types';
import { RootReducer } from '../store/reducers';
import { ProductCard } from '../components';

function App() {
  const items = useSelector<RootReducer, ProductItem[] | null>(state => state.items.items);
  const mapItems = useSelector<RootReducer, ProductItem[] | null>(state => state.items.items);

  return (
    <div className="App">
      <Box sx={{ m: 4 }}>
        <Typography variant="h5" component="h5">
          <b>Svi proizvodi</b>
          <Typography sx={{ ml: 1, color: "#111" }} component="span">{items?.length} proizvoda</Typography>
        </Typography>
        <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
          {mapItems && mapItems.map(item => (
            <ProductCard key={item.id} {...item} />
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default App;