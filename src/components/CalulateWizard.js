import React from 'react';
import Wizard from './Wizard'
import { Field, ErrorMessage } from 'formik';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const required = (value) => (value ? undefined : 'Required');

const CalculateWizard = () => {
  return (
    <div className="bg-gray-200 flex justify-center items-center flex-col">
      <div className="w-2/3 max-w-3xl">
        <Wizard
          initialValues={{
            email: '',
            favoriteColor: '',
          }}
          onSubmit={(values, actions) => {
            sleep(300).then(() => {
              window.alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            });
          }}
        >
          <Wizard.Page>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Address
                </label>
              </div>
              <div class="md:w-2/3">
                <Field
                  name="propertyAddress"
                  component="input"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="123 Cherry St"
                  validate={required}
                />
                <ErrorMessage
                  name="propertyAddress"
                  component="div"
                  className="field-error"
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                  City
                </label>
              </div>
              <div class="md:w-2/3">
                <Field
                  name="propertyCity"
                  component="input"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Austin"
                  validate={required}
                />
                <ErrorMessage
                  name="propertyCity"
                  component="div"
                  className="field-error"
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                  State
                </label>
              </div>
              <div class="md:w-2/3">
                <Field
                  name="propertyState"
                  component="input"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Texas"
                  validate={required}
                />
                <ErrorMessage
                  name="propertyState"
                  component="div"
                  className="field-error"
                />
              </div>
            </div>

          </Wizard.Page>
          <Wizard.Page
            validate={values => {
              const errors = {};
              if (!values.propertyCity) {
                errors.propertyCity = 'Required';
              }
              if (!values.propertyState) {
                errors.propertyState = 'Required';
              }
              return errors;
            }}
          >
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
                  Square foot
                </label>
              </div>
              <div class="md:w-2/3">
                <Field
                  name="propertySquareFoot"
                  component="input"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="2572"
                  validate={required}
                />
                <ErrorMessage
                  name="propertySquareFoot"
                  component="div"
                  className="field-error"
                />
              </div>
            </div>
          </Wizard.Page>
        </Wizard>
      </div>

    </div>
  );
}

export default CalculateWizard;