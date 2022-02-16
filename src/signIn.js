function createElement(attr, props, appendTo, appendMe) {
  let element = document.createElement(`${attr.eType}`);
  if (attr) {
    Object.keys(attr)
      .slice(1)
      .forEach((key) => {
        element.setAttribute(`${key}`, attr[key]);
      });
  }
  if (props) {
    Object.keys(props).forEach((key) => {
      element[key] = props[key];
    });
  }
  if (appendTo) appendTo.append(element);
  if (appendMe) appendMe.forEach((e) => element.append(e));
  return element;
}

export default function signInForm() {
  let emailInput = createElement({
    eType: "input",
    name: "email",
    type: "email",
    id: "signInEmail",
  });

  let emailLabel = createElement(
    {
      eType: "label",
      for: "email",
    },
    {
      textContent: "Email",
    },
    false,
    [emailInput]
  );

  let passwordInput = createElement({
    eType: "input",
    name: "password",
    type: "password",
    id: "signInPassword",
  });

  let passwordLabel = createElement(
    {
      eType: "label",
      for: "password",
    },
    {
      textContent: "password",
    },
    false,
    [passwordInput]
  );
  let signInBtn = createElement(
    {
      eType: "button",
      id: "signIn",
    },
    { textContent: "Sign In" }
  );
  let signUpBtn = createElement(
    {
      eType: "button",
      id: "signUp",
    },
    { textContent: "Sign Up" }
  );
  let form = createElement(
    {
      eType: "form",
      id: "authForm",
    },
    false,
    false,
    [emailLabel, passwordLabel, signInBtn, signUpBtn]
  );
  return form;
}
