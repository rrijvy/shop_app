import React from "react";

const ContactUsPage = () => {
  return (
    <div>
      <div className="mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className=" bg-gray-100 py-3 text-center ring-1 ring-inset ring-gray-900/15 lg:flex lg:flex-col lg:justify-center lg:py-7">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
            </p>
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get access
            </a>
            <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
