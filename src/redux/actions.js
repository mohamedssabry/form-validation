export const setFormData = (formData) => ({
  type: "SET_FORM_DATA",
  payload: formData,
});

export const submitForm = (itemValues) => ({
  type: "SUBMIT_FORM",
  payload: itemValues,
});
