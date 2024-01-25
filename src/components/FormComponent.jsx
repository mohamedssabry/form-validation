import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import jsonData from "../test.json";

const initialValues = jsonData;

const generateValidationSchema = (sections) => {
  const sectionValidation = Yup.array().of(
    Yup.object().shape({
      items: Yup.array().of(
        Yup.object().shape({
          itemValues: Yup.string().required("This field is required"),
        })
      ),
    })
  );
  return Yup.object().shape({
    Sections: sectionValidation,
  }); 
};

const MyForm = () => (
  <div className="mt-2 p-8 rounded-md grid items-center text-end gap-4 relative">
    <h1 className="text-center text-2xl font-bold mb-4">My Form</h1>
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      validationSchema={generateValidationSchema(initialValues.Sections)}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-2 gap-8 justify-between">
          {values.Sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="grid gap-4 p-8 rounded-md shadow-lg bg-gray-100 flex-1"
            >
              <h2 className="text-lg font-bold grid items-center text-center">
                {section.displayName}
              </h2>
              {section.items.map((item, itemIndex) => (
                <div key={item.key} className="mb-2">
                  <label
                    htmlFor={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                    className="block font-semibold mb-1"
                  >
                    {item.displayName}
                  </label>
                  {item.cmsItemTypeEnum === 1 && (
                    <>
                      <Field
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        placeholder={`Enter ${item.displayName}`}
                        type="text"
                        className="w-full p-2 border rounded-md"
                      />
                      <ErrorMessage
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  )}
                  {item.cmsItemTypeEnum === 2 && (
                    <>
                      <Field
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        placeholder={`Enter ${item.displayName}`}
                        as="textarea"
                        className="w-full p-2 border rounded-md"
                      />
                      <ErrorMessage
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  )}
                  {item.cmsItemTypeEnum === 3 && (
                    <>
                      <input
                        accept=".jpg, .png, .gif, .jpeg"
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue(
                            `Sections.${sectionIndex}.items.${itemIndex}.itemValues`,
                            file
                          );
                        }}
                        className="w-full p-2 border rounded-md bg-white"
                      />
                      <ErrorMessage
                        name={`Sections.${sectionIndex}.items.${itemIndex}.itemValues`}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className=" text-center absolute left-60 top-full right-60">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-1/2"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default MyForm;
