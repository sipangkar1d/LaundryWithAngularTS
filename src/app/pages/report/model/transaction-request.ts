export interface TransactionRequest {
  customerPhone: string;
  isPaid: boolean;
  transactionDetailRequest: TransactionDetailRequest
}

export interface TransactionDetailRequest {
  categoryId: string;
  quantity: number;
  productId: string;
  productQuantity: number;
}
