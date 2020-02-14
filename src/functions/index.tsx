export function getAmortizedPrincipleAndInterest(balance: number, rate: number, term: number) {
  const _rate: number = rate / 100 / 12
  const period: number = term * 12
  const payments: number = (balance * (_rate / (1 - Math.pow(1 + _rate, - period))))
  return payments
}


export function validation(values: any, FIELDS: any) {
  // const { financing, expenses, income, repairs } = values
  for (const prop in FIELDS) {
    for (let val in values[prop]) {
      if (val !== 'Address' && val !== 'City' && val !== 'State') {
        if (val === 'TermYears') {
          console.log('Yes')
          if (values[prop][val] === "") {
            values[prop][val] = 1
          }
        }
        if (values[prop][val] === "") {
          values[prop][val] = 0
        }
      }
    }
  }

  return values
}