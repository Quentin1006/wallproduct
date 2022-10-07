export type Product = {
  name: string;
  brand: string;
  color: string;
  link: string;
  price: number;
  year: number;
};

export type Filter = {
  type: "selector" | "input" | "radio" | "checkbox";
  label: string;
  state: any;
};

export type FilterRecord = Record<string, Filter>;
