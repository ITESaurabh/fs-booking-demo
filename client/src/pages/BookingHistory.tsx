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
import { useContext } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { getMyBookings } from "../apis/booking";
import { getAuth } from "../utils/CookieUtil";
import { store } from "../utils/store";

const BookingHistory = () => {
  const { state } = useContext<any>(store);
  const { name } = getAuth();
  const bookingHistoryQuery: any = useQuery(
    ["history", state.selectedDate],
    () =>
      getMyBookings({
        date: state.selectedDate,
      })
  );
  console.log(state.selectedDate);

  if (bookingHistoryQuery.isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (bookingHistoryQuery.isError) {
    return (
      <span>
        Error: {bookingHistoryQuery.error.message}{" "}
        {!name && <Navigate to="/login" />}
      </span>
    );
  }
  console.log(bookingHistoryQuery.data.data);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography textAlign="center" mt={2} variant="h4">
            My Booking History
          </Typography>
        </Grid>

        {bookingHistoryQuery.data.data.length > 0 ? (
          bookingHistoryQuery.data.data.map((hotel: any, index: number) => (
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
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>{"No Bookings Found for Today :("}</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default BookingHistory;
