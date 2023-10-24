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
  title: string;
  brand: string;
  barcode: string;
  category: string;
  amount: number;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  details: {
    weightDisplay: number;
    weightUnitDisplay: string;
    weight: number;
    weightUnit: string;
    divideBy: number;
    isSugar: boolean;
    isSodium: boolean;
  };
}

export interface CartProductInterface {
  title: string;
  barcode: string;
  amount: number;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  brand: string;
  note: string;
}
