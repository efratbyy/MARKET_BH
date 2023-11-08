import axios from "axios";
import { time } from "console";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "https://api.emailjs.com";

export const emailPaymentDetailsApi = async (
  date: Date,
  userName: string,
  userEmail: string,
  cardHolderName: string,
  cardNumber: string,
  cardExpirationDate: string,
  cardCvv: string,
  cardHolderId: string,
  cart: CartProductInterface[] | undefined,
  orderNumber: Number | undefined
) => {
  try {
    let htmlCart = "";
    // convert cart to an HTML table
    if (cart === undefined || cart?.length === 0) {
      htmlCart = "Empty Cart";
    } else {
      // Create the table header with inline styles
      const tableHeader = `
        <tr>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">הערות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מותג</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">ברקוד</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מחיר</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">כמות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">פריט</th>
        </tr>
      `;

      // Map over the cart items to create rows
      const tableRows = cart
        ?.map(
          (item) => `
            <tr>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.note
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.brand
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.barcode
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">₪${item.price.toFixed(
              2
            )}</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.amount
              }</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.title
              }</td>
              
            </tr>
          `
        )
        .join(""); // Join the rows into a single string

      // Create the complete HTML table as a string
      htmlCart = `
        <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%;">
          ${tableHeader}
          ${tableRows}
        </table>
      `;
    }

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
        cart: htmlCart,
        order_number: orderNumber,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};
