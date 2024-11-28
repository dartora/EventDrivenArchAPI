import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Divider, Card, CardContent, CardActions, Button } from '@mui/material';
import MapWithRoute from '../../components/MapWithRoute';

const Page2 = () => {
  const location = useLocation();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (location.state) {
      setDrivers(location.state.travelOptions);
      setDistance(location.state.distance);
      setIdUser(location.state.userId);
      if (location.state.route && location.state.route.length > 0) {
        setRoute(location.state.route[0]);
      }
    }
  }, [location.state]);

  // Only render map if route data is available
  const renderMap = () => {
    if (route && route.overview_polyline) {
      return <MapWithRoute routeData={route} />;
    }
    return <Typography>Loading map...</Typography>;
  };

  if (!drivers.length || distance === null || !route) {
    return (
      <Container>
        <Typography variant="h5" >
          Nenhuma opção de viagem, distância ou rota disponível.
          <br />
          Por favor, volte e tente novamente.
        </Typography>
      </Container>
    );
  }
  async function handleDriverSelect(driver: Driver) {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + '/ride/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originAddress: location.state.origin,
          destinationAddress: location.state.destination,
          driverId: driver.ID,
          distance: distance,
          price: parseFloat(driver.tripCost),
          userId: idUser,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ride');
      }
      // Redirect to ride status page or show success message
      alert('Ride created successfully!');
      // navigate('/ride-status'); // Uncomment if you have a ride status page
    } catch (error) {
      console.error('Error creating ride:', error);
      alert('Failed to create ride. Please try again.');
    }
  }
  return (
    <Container>
      {renderMap()}

      <Typography variant="h6" gutterBottom>
        Motoristas Disponíveis:
      </Typography>
      <List>
        {drivers.map((driver) => (
          <ListItem key={driver.ID}>
            <Card onClick={() => handleDriverSelect(driver)} style={{ cursor: 'pointer' }}> {/* Added Card */}
              <CardContent>
                <ListItemText
                  primary={driver.NAME}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {driver.DESCRIPTION}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        Carro: {driver.CAR}
                        <br />
                        Avaliação: {driver.ratings.length > 0 ? driver.ratings[0].STARS + ' estrelas' : 'Sem avaliações'}
                        <br />
                        Valor: R${driver.tripCost}
                      </Typography>
                    </>
                  }
                />
              </CardContent>
              <CardActions>
                <Button size="small">Selecionar</Button>
              </CardActions>
            </Card>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Page2;
