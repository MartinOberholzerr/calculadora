$(function () {
  // Declaración de variables para el estado y valores numéricos
  var OperatorStatus = false; // Indica si se ha seleccionado un operador
  var OperatorEqualStage = false; // Indica si se ha presionado el botón igual "=" y se espera la entrada del segundo número.
  var NumberValue_first = 0; // Almacena el primer número ingresado.
  var NumberValue_secend = 0; // Almacena el segundo número ingresado.
  var ScreenTotal = 0; // Guarda el resultado de la operación actual.
  var Operators = ""; // Almacena el operador seleccionado.
  var PointLength_first = 0; // Rastrea la longitud de los números antes del punto decimal.
  var PointLength_secend = 0; // Rastrea la longitud de los números después del punto decimal.
  var FullExpression = ""; // Variable para almacenar la expresión completa.

  // Función para actualizar la pantalla con la expresión completa
  function updateScreen() {
    if (FullExpression === "") {
      $(".ScreenTotal").text("0");
    } else {
      $(".ScreenTotal").text(FullExpression);
    }
  }

  // Inicialización de la pantalla con el valor 0
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
      NumberValue_first += $(this).text(); // Agrega el número a NumberValue_first
      FullExpression += $(this).text(); // Agrega el número a la expresión completa
    } else {
      NumberValue_secend += $(this).text(); // Agrega el número a NumberValue_secend
      FullExpression += $(this).text(); // Agrega el número a la expresión completa
    }

    updateScreen();
  });

  // Manejo del botón "AC" (borrar todo)
  $(".AC").click(function () {
    $(".Operator-btn").removeClass("click"); // Quita la clase "click" de los botones de operadores
    $(this).text("AC"); // Restaura el botón "AC"
    OperatorStatus = false; // Restablece el estado del operador
    NumberValue_first = 0; // Restablece el primer número
    NumberValue_secend = 0; // Restablece el segundo número
    ScreenTotal = 0; // Restablece el resultado
    Operators = ""; // Restablece el operador
    PointLength_first = 0; // Restablece la longitud de los números antes del punto decimal
    PointLength_secend = 0; // Restablece la longitud de los números después del punto decimal
    FullExpression = ""; // Restablece la expresión completa
    updateScreen();
  });

  // Manejo del botón "+/-" (cambiar signo)
  $(".PlusMinus").click(function () {
    if (FullExpression !== "") {
      FullExpression = "(-" + FullExpression + ")"; // Cambia el signo de la expresión completa
      NumberValue_first = Number(NumberValue_first) * -1; // Cambia el signo del primer número
      updateScreen();
    }
  });

  // Manejo de los botones de operadores (+, -, *, /)
  $(".Operator-btn").click(function () {
    Operators = $(this).text(); // Almacena el operador seleccionado

    // Quita la clase "click" de todos los botones de operadores
    $(".Operator-btn").removeClass("click");

    // Marca el botón de operador actual como "click"
    $(this).addClass("click");

    OperatorStatus = true; // Indica que se ha seleccionado un operador
    FullExpression += " " + Operators + " "; // Agrega el operador a la expresión completa
    updateScreen();
  });

  // Manejo de los botones de paréntesis
  $(".Parenthesis-btn").click(function () {
    var Parenthesis = $(this).text();
    if (Parenthesis === "(") {
      FullExpression += Parenthesis; // Agrega el paréntesis abierto a la expresión completa
    } else if (Parenthesis === ")") {
      FullExpression += " " + NumberValue_secend + Parenthesis; // Agrega el paréntesis cerrado y el segundo número a la expresión completa
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
      // Las operaciones +, -, *, y / deben manejarse aquí.
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
          FullExpression = "Error: División por cero";
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
