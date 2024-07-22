import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from 'hooks/useInventory';
import Dashboard from 'pages/Dashboard';
import EditOrAdd from 'pages/EditOrAdd';
import GlobalStyles from 'styles/global';

import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<EditOrAdd />} />
            <Route path="/inventory/:inventoryId" element={<EditOrAdd />} />
          </Routes>
        </Router>
      </InventoryProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
