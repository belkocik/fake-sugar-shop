// export type SugarProductSchema = {
//   title: string;
//   subtitle: string;
//   description: string;
//   slug: string;
//   brand: string;
//   manufacturer: string;
//   price: number;
//   stock: number;
//   discountValue: number;
//   promotion: boolean;
//   newProduct: boolean;
//   onDiscount: boolean;
//   coverImage: string;
// };

export type SugarProductSchema = {
  title: string;
  brand?: string;
  price?: number;
  coverImage?: string;
  id: string;
  slug?: string;
  stock: number;
  onDiscount?: boolean;
  discountValue?: number;
  quantity?: number;
};
