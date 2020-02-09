import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const required = (value) => (value ? undefined : 'Required');

const Breadcrumb = () => {
  return (
    <nav class="text-gray-500 font-bold my-8" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <a href="#" class="text-blue-500" aria-current="page">Property</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
        </li>
        <li class="flex items-center">
          <a href="#">Loan</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <a href="#">Repairs</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <a href="#">Income</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <a href="#">Expenses</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <a href="#" >Analysis</a>
        </li>
      </ol>
    </nav>
  )
}

const validate = (values) => {
  const errors = {};
  if (!values.propertyCity) {
    errors.propertyCity = 'Required';
  }
  if (!values.propertyState) {
    errors.propertyState = 'Required';
  }
  return errors;
}

const handleSubmit = (values) => {
  sleep(300).then(() => {
    window.alert(JSON.stringify(values, null, 2));
  });
};

const FormSection = (props) => {
  const { name, fields } = props

  return (
    <div className="mb-6">
      <div className="w-full mb-8 pb-2 border-gray-300 border-b-2">{name}</div>
      
      <div className="min-h-24 bg-white shadow-md rounded px-16 py-12">     
        {fields.map((obj) => {
          return (
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  {obj.label}
                </label>
              </div>
              <div class="md:w-2/3">
                <Field
                  name={obj.name}
                  component="input"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder={obj.placeholder}
                  validate={required}
                />
                <ErrorMessage
                  name={obj.name}
                  component="div"
                  className="field-error"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="bg-gray-200 flex justify-center items-center flex-col py-16">
      <div className="text-center text-xl mb-8">
        <div className="font-bold text-3xl">TheDealDelta</div>
        <div>Fast, Free Rental Property Analysis Calculator</div>
      </div>


      <div className="w-2/3 max-w-3xl">
        <Formik
          initialValues={{}}
          enableReinitialize={false}
          validate={validate}
          onSubmit={handleSubmit}
          
          render={({ values, handleSubmit, isSubmitting, handleReset }) => (
            <form 
              onSubmit={handleSubmit}
              className=""
            >
              <div>
                <FormSection
                  name="Property" 
                  fields={[
                    {
                      name: 'propertyAddress',
                      label: 'Address',
                      placeholder: '123 Cherry St',
                    },
                    {
                      name: 'propertyCity',
                      label: 'City',
                      placeholder: 'Austin',
                    },
                    {
                      name: 'propertyState',
                      label: 'State',
                      placeholder: 'Texas',
                    },
                  ]}
                />

                <FormSection
                  name="Financing" 
                  fields={[
                    {
                      name: 'loanPurchasePrice',
                      label: 'Purchase Price',
                      placeholder: '480000',
                    },
                    {
                      name: 'loanAmount',
                      label: 'Loan Amount',
                      placeholder: '471306',
                    },
                    {
                      name: 'loanTerm',
                      label: 'Loan Term (yrs)',
                      placeholder: '30',
                    },
                    {
                      name: 'loanInterestRate',
                      label: 'Interest rate',
                      placeholder: '3.201 %',
                    },
                    {
                      name: 'loanMortgageInsurance',
                      label: 'Mortgage Insurance',
                      placeholder: '325$',
                    },
                    {
                      name: 'loanHomeInsurance',
                      label: 'Homeowners Insurance',
                      placeholder: '130$',
                    },
                    {
                      name: 'loanPoints',
                      label: 'Points added',
                      placeholder: '0$',
                    },
                    {
                      name: 'loanClosingCosts',
                      label: 'Closing costs',
                      placeholder: '4253$',
                    },
                  ]}
                />

                <FormSection
                  name="Repairs" 
                  fields={[
                    {
                      name: 'repairsAmount',
                      label: 'Estimated repairs',
                      placeholder: '24356$',
                    },
                    {
                      name: 'repairsValuation',
                      label: 'After repair value',
                      placeholder: '571000$',
                    },
                  ]}
                />

                <FormSection
                  name="Income"
                  fields={[
                    {
                      name: 'incomeAmount',
                      label: 'Income from units',
                      placeholder: '7425$',
                    },
                    {
                      name: 'incomeOther',
                      label: 'Other',
                      placeholder: '0$',
                    },
                  ]}
                />

                <FormSection
                  name="Expenses"
                  fields={[
                    {
                      name: 'expensesVacancy',
                      label: 'Vacancy',
                      placeholder: '240$',
                    },
                    {
                      name: 'expensesCapEx',
                      label: 'Capital Expenditures',
                      placeholder: '400$',
                    },
                    {
                      name: 'expensesMaintenance',
                      label: 'Repairs & Maintenance',
                      placeholder: '615$',
                    },
                    {
                      name: 'expensesManagement',
                      label: 'Management fees',
                      placeholder: '900$',
                    },
                    {
                      name: 'expensesElectricity',
                      label: 'Electricity',
                      placeholder: '0$',
                    },
                    {
                      name: 'expensesWaterSewer',
                      label: 'Water & Sewer',
                      placeholder: '0$',
                    },
                    {
                      name: 'expensesTrash',
                      label: 'Trash',
                      placeholder: '0$',
                    },
                    {
                      name: 'expensesHOA',
                      label: 'HOA',
                      placeholder: '40$',
                    },
                    {
                      name: 'expensesHomeInsurance',
                      label: 'Homeowners Insurance',
                      placeholder: '40$',
                      values: 130,
                    },
                    {
                      name: 'expensesPropertyTaxes',
                      label: 'Property Taxes',
                      placeholder: '632$',
                      values: 130,
                    },
                  ]}
                />
                <div class="md:flex md:items-center md:justify-end mt-4">
                  <div class="">
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
          )}>
        </Formik>
      </div>
    </div>
  );
}

export default App;