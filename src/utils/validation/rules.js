const rules = {
  required: (value) => !!value || "This field is required",
  cardNumber: (value) => /^\d{16}$/.test(value) || "Invalid card number",
  expirationDate: (value) => /^\d{2}\/\d{2}$/.test(value) || "Format should be MM/YY",
  cvv: (value) => /^\d{3}$/.test(value) || "CVV must be 3 digits",
  amount: (value) => value > 0 || "Amount must be greater than 0",
};

export default rules