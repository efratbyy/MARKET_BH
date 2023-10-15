export interface UserInterface {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  street: string;
  houseNumber: number;
}

export interface ProductInterface {
  productName: string;
  brand: string;
  barcode: string;
  category: string;
  amount: number;
  price: number;
  image: {
    url: string;
    alt: string;
  };
}

export interface CartProductInterface {
  productName: string;
  barcode: string;
  amount: number;
  price: number;
}
