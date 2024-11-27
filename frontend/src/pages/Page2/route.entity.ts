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