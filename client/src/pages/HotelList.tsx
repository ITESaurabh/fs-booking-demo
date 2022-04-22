import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  LinearProgress,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { createBooking } from "../apis/booking";
import { getHotels } from "../apis/hotels";
import { getAuth } from "../utils/CookieUtil";
import { store } from "../utils/store";

const HotelList = () => {
  const { state } = useContext<any>(store);
  const { name } = getAuth();
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const hotelListQuery: any = useQuery(["hotels", state.selectedDate], () =>
    getHotels({
      date: state.selectedDate,
    })
  );
  console.log(state.selectedDate);

  if (hotelListQuery.isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (hotelListQuery.isError) {
    return (
      <span>
        Error: {hotelListQuery.error.message}{" "}
        {!name && <Navigate to="/login" />}
      </span>
    );
  }
  const handleBooking = (hotel: any) => {
    createBooking({
      hotel_id: hotel.id,
      booking_date: state.selectedDate,
      transaction_date: dayjs().format("YYYY-MM-DD"),
    }).then((res) => {
      queryClient.invalidateQueries(["hotels", state.selectedDate]);
      navigate("/history");
    });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography textAlign="center" mt={2} variant="h4">
            Hotel List
          </Typography>
        </Grid>

        {hotelListQuery.data.data.map((hotel: any, index: number) => (
          <Grid item xs={12} md={6} lg={4}>
            <Card key={index}>
              <CardMedia
                component="img"
                image={hotel.picture}
                title={hotel.name}
                style={{ height: "100px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {hotel.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleBooking(hotel)}
                  fullWidth
                  size="small"
                  color="primary"
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelList;
