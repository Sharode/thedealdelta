export function getAmortizedPrincipleAndInterest(balance: number, rate: number, term: number) {  
  const period: number = term * 12
  const payments: number = (balance * (( (rate / 100) / 12) / (1 - Math.pow(1 + ((rate / 100) / 12), - period))))
  return payments
}