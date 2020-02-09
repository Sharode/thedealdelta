import React from 'react';
import { Formik } from 'formik';

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form 
            onSubmit={handleSubmit}
            className="min-h-24 bg-white shadow-md rounded px-16 pt-12 pb-16 mb-4"
          >
            {activePage}
            <div className="buttons">
              {!isLastPage && ( 
                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button 
                      type="submit"
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {page > 0 && (
                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button 
                      type="button"
                      onClick={this.previous}
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Previous
                    </button>
                  </div>
                </div>
              )}

              {(isLastPage) && (
                <div class="md:flex md:items-center mt-4">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
                </div>
              )}
            </div>

            {/* <FormikDebug /> */}
          </form>
        )}
      />
    );
  }
}

export default Wizard;