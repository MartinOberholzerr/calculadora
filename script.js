$(function () {
  // Declaración de variables para el estado y valores numéricos
  var OperatorStatus = false;
  var OperatorEqualStage = false;
  var NumberValue_first = 0;
  var NumberValue_secend = 0;
  var ScreenTotal = 0;
  var Operators = "";
  var PointLength_first = 0;
  var PointLength_secend = 0;
  var FullExpression = ""; // Variable para almacenar la expresión completa

  // Función para actualizar la pantalla con la expresión completa
  function updateScreen() {
    if (FullExpression === "") {
      $(".ScreenTotal").text("0");
    } else {
      $(".ScreenTotal").text(FullExpression);
    }
  }

  // Iniciacion de la pantalla con el valor 0
  $(".ScreenTotal").text("0");

  // Manejo de los botones numéricos
  $(".Number-btn").click(function () {
    if (OperatorEqualStage) {
      OperatorEqualStage = false;
      $(".ScreenTotal").text("");
      FullExpression = "";
    }
    if ($(this).text() !== "0" || FullExpression !== "") {
      $(".AC").text("C");
    }

    if (Operators === "") {
      NumberValue_first += $(this).text();
      FullExpression += $(this).text();
    } else {
      NumberValue_secend += $(this).text();
      FullExpression += $(this).text();
    }

    updateScreen();
  });

  // Manejo del botón "AC" (borrar todo)
  $(".AC").click(function () {
    $(".Operator-btn").removeClass("click");
    $(this).text("AC");
    OperatorStatus = false;
    NumberValue_first = 0;
    NumberValue_secend = 0;
    ScreenTotal = 0;
    Operators = "";
    PointLength_first = 0;
    PointLength_secend = 0;
    FullExpression = "";
    updateScreen();
  });

  // Manejo del botón "+/-" (cambiar signo)
  $(".PlusMinus").click(function () {
    if (FullExpression !== "") {
      FullExpression = "(-" + FullExpression + ")";
      NumberValue_first = Number(NumberValue_first) * -1;
      updateScreen();
    }
  });

  // Manejo de los botones de operadores (+, -, *, /)
  $(".Operator-btn").click(function () {
    Operators = $(this).text();
    $(".Operator-btn").removeClass("click");
    $(this).addClass("click");
    OperatorStatus = true;
    FullExpression += " " + Operators + " ";
    updateScreen();
  });

  // Manejo de los botones de paréntesis
  $(".Parenthesis-btn").click(function () {
    var Parenthesis = $(this).text();
    if (Parenthesis === "(") {
      FullExpression += Parenthesis;
    } else if (Parenthesis === ")") {
      FullExpression += " " + NumberValue_secend + Parenthesis;
    }
    updateScreen();
  });

  // Manejo del botón "=" (calcular resultado)
  $(".equal").click(function () {
    if (Operators === "^") {
      // Potenciación
      ScreenTotal = Math.pow(Number(NumberValue_first), Number(NumberValue_secend));
      FullExpression = NumberValue_first + " ^ " + NumberValue_secend + " = " + ScreenTotal;
    } else if (Operators === "√") {
      // Raíz cuadrada
      ScreenTotal = Math.sqrt(Number(NumberValue_first));
      FullExpression = "√(" + NumberValue_first + ") = " + ScreenTotal;
    } else {
      // Las operaciones +, -, *, y / deben manejarse aca.
      NumberValue_first = Number(NumberValue_first);
      NumberValue_secend = Number(NumberValue_secend);
      if (Operators === "+") {
        ScreenTotal = NumberValue_first + NumberValue_secend;
      } else if (Operators === "-") {
        ScreenTotal = NumberValue_first - NumberValue_secend;
      } else if (Operators === "×") {
        ScreenTotal = NumberValue_first * NumberValue_secend;
      } else if (Operators === "÷") {
        if (NumberValue_secend === 0) {
          FullExpression = "Error: Division by zero";
          updateScreen();
          return;
        }
        ScreenTotal = NumberValue_first / NumberValue_secend;
      }
      FullExpression = NumberValue_first + " " + Operators + " " + NumberValue_secend + " = " + ScreenTotal;
    }

    updateScreen();
    OperatorEqualStage = true;
  });
});
