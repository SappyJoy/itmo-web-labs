"use strict";

let x_value, y_value, r_value;

// Обновляет значение r в соответсвии с нажатой кнопкой
window.onload = function () {

  let buttons = document.querySelectorAll("input[name=r-value]");
  buttons.forEach(click);

  function click(element) {
    element.onclick = function () {
      r_value = this.value;
      buttons.forEach(function (element) {
        element.style.backgroundColor = "";
        element.style.color = "";
      });
      this.style.backgroundColor = "#000000"
      this.style.color = "#ffffff"
    }
  }
};

document.getElementById("submit-button").onclick = function () {
  if (validateX() && validateY() && validateR()) {
    let request = '?x=' + x_value + '&y=' + y_value + '&r=' + r_value + '&timezone=' + new Date().getTimezoneOffset();
    fetch("handler.php" + request, {
      method: "GET",
      headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
    }).then(response => response.text()).then(function (serverReply) {
      let json = JSON.parse(serverReply);

      let result = "<tr>";
      result += '<td class="result-value">' + json.x + '</td>';
      result += '<td class="result-value">' + json.y + '</td>';
      result += '<td class="result-value">' + json.r + '</td>';
      result += '<td class="result-value">' + json.result + '</td>';
      result += '<td class="result-value">' + json.currentTime + '</td>';
      result += '<td class="result-value">' + json.benchmarkTime + '</td>';
      result += '</tr>';

      document.getElementById("result-values").innerHTML += result;
      draw_point(x_value, y_value, r_value);
      clearNotifications();
    }).catch(err => createNotification("Ошибка HTTP. Повторите попытку позже. " + err));
  }
};

function validateX() {
  x_value = document.querySelector("input[name=x-coordinate]").value.replace(",", ".");
  if (x_value === undefined) {
    createNotification("x не введён");
    return false;
  } else if (!isNumeric(x_value)) {
    createNotification("x не число");
    return false;
  } else if (!((x_value > -3) && (x_value < 3))) {
    createNotification("x не входит в область допустимых значений");
    return false;
  } else return true;
}

function validateY() {
  try {
    length = document.querySelectorAll("input[type=checkbox]:checked").length;
    console.log(length);
    if (length > 1) {
      createNotification("Должно быть выбрано только одно значение y");
      return false;
    }
    y_value = document.querySelector("input[type=checkbox]:checked").value;
    return true;
  } catch (err) {
    createNotification("Значение y не выбрано");
    return false;
  }
}

function validateR() {
  if (isNumeric(r_value)) return true;
  else {
    createNotification("r не выбран");
    return false;
  }
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