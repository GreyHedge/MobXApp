export interface IQuotation {
  id: number;
  last: string;
  highestBid: string;
  percentChange: string;
}

export interface IQuotationMap {
  [name: string]: IQuotation;
}
