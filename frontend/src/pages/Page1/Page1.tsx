import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function Page1() {
  const navigate = useNavigate(); // Create history object


  // Define a type for travel options
  type TravelOption = {
    description: string;
    price: number;
  };

  const [formData, setFormData] = useState({
    userId: '',
    origin: '',
    destination: '',
  });
  const [travelOptions, setTravelOptions] = useState<TravelOption[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEstimate = async () => {
    try {
      // Simula uma chamada à API
      const response = await fetch('http://localhost:8080/ride/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setTravelOptions(data);
      navigate('/page-2', { state: { travelOptions: data.availableDrivers, distance: data.distanceInKm, route: data.route } });

    } catch (error) {
      console.error('Erro ao estimar viagem:', error);
    }
  };

  return (
    <>
      <Meta title="Solicitação de Viagem" />
      <FullSizeCenteredFlexBox>
        {!travelOptions ? (
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 400,
              padding: 3,
              border: '1px solid #ddd',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" textAlign="center">
              Solicitação de Viagem
            </Typography>
            <TextField
              label="ID do Usuário"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Endereço de Origem"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Endereço de Destino"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleEstimate}
              fullWidth
            >
              Estimar Viagem
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: '100%', maxWidth: 400, padding: 3 }}>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Opções de Viagem
            </Typography>
            {travelOptions.map((option: TravelOption, index: number) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1">
                  <strong>Opção {index + 1}:</strong> {option.description}
                </Typography>
                <Typography variant="body2">
                  Preço: R$ {option.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setTravelOptions(null)}
            >
              Voltar
            </Button>
          </Box>
        )}
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page1;
