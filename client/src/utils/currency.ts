/**
 * All prices in this store are Pakistani Rupees. Formats as "Rs. 18,500".
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}
