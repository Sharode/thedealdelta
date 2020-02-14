import React, { useState } from 'react';
import { Formik } from 'formik';
import { hot } from 'react-hot-loader'
import { getAmortizedPrincipleAndInterest, validation } from "./functions"
import { FormSection } from "./components/FormSection"
import { FIELDS } from "./constants"

const onSubmit = (values, actions) => {
  const newVal = validation(values, FIELDS)

  const principleAndInterest = getAmortizedPrincipleAndInterest(newVal.financing.Amount, newVal.financing.InterestRate, newVal.financing.TermYears)

  const monthlyMortgagePayment =
    principleAndInterest
    + newVal.financing.MortgageInsurance
    + newVal.expenses.HomeInsurance
    + newVal.expenses.PropertyTaxes
    + newVal.expenses.HOA

  // DO NOT DOUBLE COUNT insurance, taxes hoa
  const additionalMonthlyExpenses =
    newVal.expenses.Vacancy
    + newVal.expenses.CapEx
    + newVal.expenses.Maintenance
    + newVal.expenses.Management
    + newVal.expenses.Electricity
    + newVal.expenses.WaterSewer
    + newVal.expenses.Trash

  let monthlyIncome =
    newVal.income.Amount
    + newVal.income.Other

  let monthlyExpenses = monthlyMortgagePayment
    + additionalMonthlyExpenses

  let monthlyCashflow = monthlyIncome - monthlyExpenses

  let totalOperatingExpenses =
    newVal.expenses.Vacancy
    + newVal.expenses.CapEx
    + newVal.expenses.Maintenance
    + newVal.expenses.Management
    + newVal.expenses.Electricity
    + newVal.expenses.WaterSewer
    + newVal.expenses.Trash
    + newVal.expenses.HomeInsurance
    + newVal.expenses.PropertyTaxes
    + newVal.expenses.HOA

  const downPaymentAmount = newVal.financing.PurchasePrice * (newVal.financing.DownPaymentRate / 100)

  const totalCashNeeded =
    downPaymentAmount
    + newVal.repairs.Amount
    + newVal.financing.ClosingCosts

  const annualCashOnCashReturn = (monthlyCashflow * 12 / totalCashNeeded)


  actions.setSubmitting(false);

  console.log()

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyCashflow,
    totalCashNeeded,
    annualCashOnCashReturn,
    totalOperatingExpenses,
  }
};

const App = () => {
  const [state, setState] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashflow: 0,
    totalCashNeeded: 0,
    annualCashOnCashReturn: 0,
    totalOperatingExpenses: 0,
  })

  return (
    <div className="bg-gray-200 flex justify-center items-center flex-col py-16">
      <div className="text-center text-xl mb-8">
        <h1 className="font-bold text-3xl">TheDealDelta</h1>
        <div>Fast, Free Rental Property Analysis</div>
      </div>

      <div className="w-2/3 max-w-3xl">
        <Formik
          initialValues={{
            // property: {
            //   Address: '5211 Tahoe Trail',
            //   City: 'Austin',
            //   State: 'TX',
            // },

            // financing: {
            //   PurchasePrice: 480000,
            //   Amount: 471306,
            //   TermYears: 30,
            //   DownPaymentRate: 3.5,
            //   InterestRate: 2.875,
            //   MortgageInsurance: 325,
            //   Points: 0,
            //   ClosingCosts: 6256,
            // },

            // repairs: {
            //   Amount: 41026.38,
            //   Valuation: 0,
            // },

            // income: {
            //   // Amount: 3465,
            //   Amount: 2490,
            //   Other: 0,
            // },

            // expenses: {
            //   Vacancy: 0,
            //   CapEx: 0,
            //   Maintenance: 0,
            //   Management: 0,
            //   Electricity: 0,
            //   WaterSewer: 0,
            //   Trash: 0,
            //   HOA: 0,
            //   HomeInsurance: 130,
            //   PropertyTaxes: 856,
            // },
          }}
          enableReinitialize={false}
          // validate={validate}
          onSubmit={(values, actions) => {
            const results = onSubmit(values, actions)
            setState(results)

          }}
        >
          {({ values, handleSubmit, isSubmitting, handleReset, handleChange, setFieldValue }) => {

            return (
              <form
                onSubmit={handleSubmit}
                className=""
              >
                <div>
                  <FormSection
                    name="Property"
                    fields={FIELDS.property}
                  />

                  <FormSection
                    name="Financing"
                    fields={FIELDS.financing}
                  />

                  <FormSection
                    name="Repairs"
                    fields={FIELDS.repairs}
                  />

                  <FormSection
                    name="Income"
                    fields={FIELDS.income}
                  />

                  <FormSection
                    name="Expenses"
                    fields={FIELDS.expenses}
                  />

                  <div className="md:flex md:items-center md:justify-end mt-4">
                    <div className="">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>

        <div className="my-8 bg-white shadow-md rounded">
          <div className="bg-green-400 font-bold rounded-t w-full uppercase text-white text-center">
            results
          </div>
          <div className="px-16 py-12">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Monthly expenses
                  </div>
              </div>
              <div className="md:w-2/3">
                ${state.monthlyExpenses.toFixed(2)}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Monthly income
                  </div>
              </div>
              <div className="md:w-2/3">
                ${state.monthlyIncome.toFixed(2)}
              </div>
            </div>


            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Monthly cashflow
                  </div>
              </div>
              <div className="md:w-2/3">
                ${state.monthlyCashflow.toFixed(2)}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Cash on Cash return
                  </div>
              </div>
              <div className="md:w-2/3">
                {state.annualCashOnCashReturn.toFixed(2)}%
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Cash needed
                  </div>
              </div>
              <div className="md:w-2/3">
                ${state.totalCashNeeded.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default hot(module)(App);