import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import MapWithRoute from '../../components/MapWithRoute';

interface Driver {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  CAR: string;
  tripCost: string;
}

interface Route {
  bounds: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  legs: Array<{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
    end_address: string;
    start_address: string;
    steps: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      end_location: { lat: number; lng: number };
      html_instructions: string;
      travel_mode: string;
    }>;
  }>;
  overview_polyline: { points: string };
}

const Page2 = () => {
  const location = useLocation();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (location.state) {
      console.log('Full location state:', location.state);
      console.log('Route from state:', location.state.route);
      setDrivers(location.state.travelOptions);
      setDistance(location.state.distance);
      if (location.state.route && location.state.route.length > 0) {
        console.log('Setting route with:', location.state.route[0]);
        setRoute(location.state.route[0]);
      }
    }
  }, [location.state]);

  // Only render map if route data is available
  const renderMap = () => {
    console.log('Rendering map with route:', route);
    if (route && route.overview_polyline) {
      return <MapWithRoute routeData={route} />;
    }
    console.log('Missing route data for map');
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

  return (
    <Container>
      {renderMap()}

      <Typography variant="h6" gutterBottom>
        Motoristas Disponíveis:
      </Typography>
      <List>
        {drivers.map((driver) => (
          <ListItem key={driver.ID}>
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
                    Valor: {driver.tripCost}
                  </Typography>
                </>
              }
            />
            <Divider />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Page2;
