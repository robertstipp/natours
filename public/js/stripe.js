/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Ku21gKmuuTC3yER1COCTCtUljRrPlQoZWlq1rIos06NY34YR5wY2QT3x0L8bjQ3dQCkTeFRabxNmKsTruhpirXn00MRevlXPY'
);

export const bookTour = async (tourId, startDateId) => {
  // 1) Get checkout session from API
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}/${startDateId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
