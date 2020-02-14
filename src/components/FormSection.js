import React from "react"
import { Field, ErrorMessage } from 'formik';

export const FormSection = (props) => {
  const { name, fields } = props

  return (
    <div className="mb-6">
      <div className="w-full mb-8 pb-2 border-gray-300 border-b-2">{name}</div>

      <div className="min-h-24 bg-white shadow-md rounded px-16 py-12">
        {fields.map((obj) => {

          return (
            <div key={obj.name} className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={obj.name}>
                  {obj.label}
                </label>
              </div>
              <div className="md:w-2/3">
                <Field
                  name={obj.name}
                  component="input"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type={obj.type}
                  placeholder={obj.placeholder}
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