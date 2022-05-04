"use strict";

let x_value, y_value, r_value;

const X_VALUES = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

// document.getElementById("submit-button").onclick = function () {
//   if (validateX() && validateY() && validateR()) {
//     let formData = new FormData();
//     formData.append("x", x_value);
//     formData.append("y", y_value);
//     formData.append("r", r_value);
//     formData.append("timezone", new Date().getTimezoneOffset().toString());
//     formData.forEach((value, key, parent) => console.log("key=" + key + " value=" + value));
//     fetch('api', {
//       method: "POST",
//       body: formData
//     }).then(response => response.text()).then(function (serverReply) {
//       clearNotifications()
//       location.reload()
//     }).catch(err => createNotification("Ошибка HTTP. Повторите попытку позже. " + err));
//   }
// };

document.getElementById("axes").onclick = function (event) {
  if (!validateR()) {
    return;
  }

  x_value = getXbyOffset(event.offsetX);
  y_value = getYbyOffset(event.offsetY);

  let min_dist = Infinity;
  let nearest_x;

  for (let i = 0; i < X_VALUES.length; i++) {
    let dist = Math.abs(x_value - X_VALUES[i]);
    if (dist < min_dist) {
      min_dist = dist;
      nearest_x = X_VALUES[i];
    }
  }
  x_value = nearest_x;

  draw_point(x_value, y_value, r_value);
  console.log("Point has been drawn: " + x_value + " " + y_value + " " +  r_value);

  document.forms['fire-form_id'].elements["y"].value = y_value;
  const x_checkboxes = document.querySelectorAll("input[type=checkbox]");
  x_checkboxes.forEach((element) => {
    element.checked = false;
  });
  document.querySelector(`input[type=checkbox][value="${x_value}"]`).checked = true;
  clearNotifications();
}

document.getElementById("submit-button").onclick = function (event) {
  if (!validateX() || !validateY() || !validateR()) {
    event.preventDefault();
  } else {
    document.forms['fire-form_id'].elements["timezone"].value = new Date().getTimezoneOffset().toString();
    console.log("timezone is set");
  }
};

function validateX() {
  try {
    length = document.querySelectorAll("input[type=checkbox]:checked").length;
    console.log(length);
    if (length > 1) {
      createNotification("Должно быть выбрано только одно значение x");
      return false;
    }
    x_value = document.querySelector("input[type=checkbox]:checked").value;
    return true;
  } catch (err) {
    createNotification("Значение x не выбрано");
    return false;
  }
}

function validateY() {
  y_value = document.querySelector("input[name=y]").value.replace(",", ".");
  if (y_value === undefined) {
    createNotification("y не введён");
    return false;
  } else if (!isNumeric(y_value)) {
    createNotification("y не число");
    return false;
  } else if (!((y_value >= -5) && (y_value <= 5))) {
    createNotification("y не входит в область допустимых значений");
    return false;
  } else return true;
}

function validateR() {
  r_value = document.querySelector("input[name=r]").value.replace(",", ".");
  if (r_value === undefined || r_value === "") {
    createNotification("r не введён");
    return false;
  } else if (!isNumeric(r_value)) {
    createNotification("r не число");
    return false;
  } else if (!((r_value >= 1) && (r_value <= 4))) {
    createNotification("r не входит в область допустимых значений");
    return false;
  } else return true;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNotification(message) {
  let outputContainer = document.getElementById("output-container");
  let notificationTableRow = document.createElement("h4");
  notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
  outputContainer.append(notificationTableRow);
  let span = document.querySelector(".notification");
  span.textContent = message;
}

function clearNotifications() {
  let outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = "";
}