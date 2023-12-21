function userDetailsAreValid(email, password, fullname, street, postal, city) {
  return (
    userCredentialsAreValid(email, password) &&
    emailIsConfirmed() &&
    !isEmpty(fullname) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 8
  );
}

function isEmpty(value) {
  return !value || value.trim() === "";
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
