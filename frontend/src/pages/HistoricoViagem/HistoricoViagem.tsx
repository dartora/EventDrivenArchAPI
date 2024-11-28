import useOrientation from '@/hooks/useOrientation';
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
import { useEffect, useState } from 'react';

function HistoricoViagem() {

  const [userId, setUserId] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredData, setFilteredData] = useState<Ride[]>([]);

  useEffect(() => {
    fetchRides();
  }, []);
  const fetchRides = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_BACKEND + '/ride');
      const data = await response.json();
      setRides(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = rides;
    if (userId) {
      filtered = filtered.filter((row) => row.USER_ID.toString() === userId);
    }
    if (selectedDriver !== "todos") {
      filtered = filtered.filter((row) => row.DRIVER_ID.toString() === selectedDriver);
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
              <TableCell>User Id</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Distancia</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.USER_ID}>
                  <TableCell>{row.DRIVER_ID}</TableCell>
                  <TableCell>{row.ORIGIN_ADDRESS}</TableCell>
                  <TableCell>{row.DESTINATION_ADDRESS}</TableCell>
                  <TableCell>{row.STATUS}</TableCell>
                  <TableCell>{row.DISTANCE}</TableCell>
                  <TableCell>{row.PRICE}</TableCell>
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


export default HistoricoViagem;
