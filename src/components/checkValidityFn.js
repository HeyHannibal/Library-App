const formError = document.querySelectorAll(".error");
export default function checkValidity(e) {
  e.preventDefault();
  if (!title.checkValidity()) {
    formError[0].hidden = false;
    formError[0].textContent = `Title should have at least 3 characters.`;
    return false;
  } else if (!author.checkValidity()) {
    formError[1].hidden = false;
    formError[1].textContent = `Author's name must have at least 5 characters.`;
    return false;
  } else if (!pages.checkValidity()) {
    if (pages.validity.rangeUnderflow) {
      formError[2].hidden = false;
      formError[2].textContent = `A book should have more than 50 pages.`;
    }
    if (pages.validity.rangeOverflow) {
      formError[2].hidden = false;
      formError[2].textContent = `A book should have less than 99999 pages`;
    }
    return false;
  } else {
    let allErrors = Array.from(formError);
    allErrors.forEach((item) => (item.hidden = true));
    return true;
  }
}

