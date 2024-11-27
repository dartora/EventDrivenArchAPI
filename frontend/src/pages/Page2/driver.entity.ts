interface Driver {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  CAR: string;
  tripCost: string;
  ratings: Array<{
    ID: number;
    STARS: number;
    COMMENT: string;
  }>; // Added ratings
}