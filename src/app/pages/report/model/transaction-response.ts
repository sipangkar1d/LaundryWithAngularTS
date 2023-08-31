export interface TransactionResponse {
  id:string;
  customerName:string;
  invoice:string;
  date:string;
  isPaid:boolean;
  status:string;
  grandTotal:number;
  transactionDetailResponses: TransactionDetailResponse[]
}

export interface TransactionDetailResponse{
  categoryName:string;
  quantity:number;
  price:number;
  productName:string;
  productQuantity:number;
  productPrice:number;
  subTotal:number;
}
