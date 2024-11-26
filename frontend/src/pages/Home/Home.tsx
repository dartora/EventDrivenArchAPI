import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import muiLogo from './logos/mui.svg';
import pwaLogo from './logos/pwa.svg';
import reactLogo from './logos/react_ed.svg';
import recoilLogo from './logos/recoil.svg';
import rrLogo from './logos/rr.svg';
import tsLogo from './logos/ts.svg';
import viteLogo from './logos/vite.svg';
import { Image } from './styled';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from 'react';

const mockData = [
  {
    id: 1,
    dateTime: "2024-11-23 15:30",
    driver: "João Silva",
    origin: "Rua A, 123",
    destination: "Av. Brasil, 456",
    distance: "10 km",
    time: "25 min",
    price: "R$ 35,00",
  },
  {
    id: 2,
    dateTime: "2024-11-22 12:00",
    driver: "Maria Oliveira",
    origin: "Rua B, 456",
    destination: "Av. Paulista, 789",
    distance: "12 km",
    time: "30 min",
    price: "R$ 40,00",
  },
  {
    id: 3,
    dateTime: "2024-11-20 10:00",
    driver: "Carlos Lima",
    origin: "Rua C, 789",
    destination: "Av. Copacabana, 123",
    distance: "8 km",
    time: "20 min",
    price: "R$ 30,00",
  },
];

function Home() {
  const isPortrait = useOrientation();

  const width = isPortrait ? '40%' : '30%';
  const height = isPortrait ? '30%' : '40%';

  const [userId, setUserId] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("todos");
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilter = () => {
    let filtered = mockData;

    if (userId) {
      filtered = filtered.filter((row) => row.id.toString() === userId);
    }

    if (selectedDriver !== "todos") {
      filtered = filtered.filter((row) => row.driver === selectedDriver);
    }

    setFilteredData(filtered);
  };
  return (
    <Box sx={{ padding: 4 }}>
      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
          alignItems: "center",
        }}
      >
        {/* User ID Filter */}
        <TextField
          label="ID do Usuário"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ width: 200 }}
        />

        {/* Driver Selector */}
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Motorista</InputLabel>
          <Select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            label="Motorista"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="João Silva">João Silva</MenuItem>
            <MenuItem value="Maria Oliveira">Maria Oliveira</MenuItem>
            <MenuItem value="Carlos Lima">Carlos Lima</MenuItem>
          </Select>
        </FormControl>

        {/* Filter Button */}
        <Button variant="contained" onClick={handleFilter}>
          Aplicar Filtro
        </Button>
      </Box>

      {/* Travel History Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data e Hora</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Distância</TableCell>
              <TableCell>Tempo</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.dateTime}</TableCell>
                  <TableCell>{row.driver}</TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                  <TableCell>{row.distance}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhuma viagem encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


export default Home;
