$(function () {
  var OperatorStatus = false;
  var OperatorEqualStage = false;
  var NumberValue_first = 0;
  var NumberValue_secend = 0;
  var ScreenTotal = 0;
  var Operators = "";
  var PointLength_first = 0;
  var PointLength_secend = 0;
  var PointLengthMax = Math.max(PointLength_first, PointLength_secend);

  $(".ScreenTotal").text("0");

  $(".Number-btn").click(function () {
    if (OperatorEqualStage) {
      OperatorEqualStage = false;
      $(".ScreenTotal").text("");
    }
    if ($(this).text() !== "0") {
      $(".AC").text("C");
    }

    if ($(this).text() === ".") {
      if ($(".ScreenTotal").text() === "0") {
        $(".ScreenTotal").html(0 + ".");
      } else if (ScreenTotal.indexOf(".") != -1) {
        return;
      }
    }

    if (OperatorStatus) {
      NumberValue_secend = $(this).text();
      if ($(".ScreenTotal").text().length === 0 || $(".ScreenTotal").text() === "0") {
        ScreenTotal = NumberValue_secend;
        $(".ScreenTotal").text(ScreenTotal);
      } else {
        ScreenTotal = ScreenTotal + NumberValue_secend;
        $(".ScreenTotal").text(ScreenTotal);
        NumberValue_secend = ScreenTotal;
      }
      $(".Operator-btn").removeClass("click");
    } else {
      NumberValue_first = $(this).text();
      if ($(".ScreenTotal").text().length === 0 || $(".ScreenTotal").text() === "0") {
        ScreenTotal = NumberValue_first;
        $(".ScreenTotal").text(ScreenTotal);
      } else {
        ScreenTotal = ScreenTotal + NumberValue_first;
        $(".ScreenTotal").text(ScreenTotal);
        NumberValue_first = ScreenTotal;
      }
    }
  });

  $(".Percentage").click(function () {
    $(".Operator-btn").removeClass("click");
    if (Math.round(ScreenTotal) === Number(ScreenTotal)) {
      ScreenTotal *= 0.01;
    } else {
      PointLength_first = ScreenTotal.toString().split(".")[1].length;
      ScreenTotal = (Number(ScreenTotal).toString().replace(".", "") * 1) / Math.pow(10, PointLength_first + 2);
    }
    NumberValue_first = ScreenTotal;
    $(".ScreenTotal").text(ScreenTotal);
  });

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
    PointLength = Math.max(PointLength_first, PointLength_secend);
    $(".ScreenTotal").text(ScreenTotal);
  });

  $(".PlusMinus").click(function () {
    $(".Operator-btn").removeClass("click");
    ScreenTotal *= -1;
    NumberValue_first = ScreenTotal;
    $(".ScreenTotal").text(ScreenTotal);
  });

  $(".Operator-btn").click(function () {
    Operators = $(this).text();
    $(".Operator-btn").removeClass("click");
    $(this).addClass("click");
    NumberValue_first = parseFloat(ScreenTotal);
    OperatorEqualStage = true;
    OperatorStatus = true;
    ScreenTotal = "";
  });

  $(".equal").click(function () {
    NumberValue_secend = parseFloat(NumberValue_secend);
    OperatorEqualStage = true;
    if (Operators === "^") {
      // Potenciación
      ScreenTotal = Math.pow(NumberValue_first, NumberValue_secend);
    } else if (Operators === "√") {
      // Raíz cuadrada
      ScreenTotal = Math.sqrt(NumberValue_first);
    } else {
      switch (Operators) {
        case "+":
          PointLength_first = NumberValue_first.toFixed(10).toString().split(".")[1].length;
          PointLength_secend = NumberValue_secend.toFixed(10).toString().split(".")[1].length;
          PointLengthMax = Math.max(PointLength_first, PointLength_secend);
          ScreenTotal = Math.round(
            (NumberValue_first * Math.pow(10, PointLengthMax) + NumberValue_secend * Math.pow(10, PointLengthMax)) /
              Math.pow(10, PointLengthMax)
          );
          OperatorStatus = false;
          NumberValue_first = ScreenTotal;
          break;
        case "-":
          PointLength_first = NumberValue_first.toFixed(10).toString().split(".")[1].length;
          PointLength_secend = NumberValue_secend.toFixed(10).toString().split(".")[1].length;
          PointLengthMax = Math.max(PointLength_first, PointLength_secend);
          ScreenTotal = Math.round(
            (NumberValue_first * Math.pow(10, PointLengthMax) - NumberValue_secend * Math.pow(10, PointLengthMax)) /
              Math.pow(10, PointLengthMax)
          );
          OperatorStatus = false;
          NumberValue_first = ScreenTotal;
          break;
        case "×":
          if (Math.round(NumberValue_first) !== NumberValue_first && Math.round(NumberValue_secend) !== NumberValue_secend) {
            PointLength_first = NumberValue_first.toString().split(".")[1].length;
            PointLength_secend = NumberValue_secend.toString().split(".")[1].length;
            ScreenTotal = (Number(NumberValue_first).toString().replace(".", "") * Number(NumberValue_secend).toString().replace(".", "")) / Math.pow(10, PointLength_first + PointLength_secend);
          } else if (Math.round(NumberValue_first) === NumberValue_first && Math.round(NumberValue_secend) !== NumberValue_secend) {
            PointLength_secend = NumberValue_secend.toString().split(".")[1].length;
            ScreenTotal = (NumberValue_first * Number(NumberValue_secend).toString().replace(".", "")) / Math.pow(10, PointLength_secend);
          } else if (Math.round(NumberValue_first) !== NumberValue_first && Math.round(NumberValue_secend) === NumberValue_secend) {
            PointLength_first = NumberValue_first.toString().split(".")[1].length;
            ScreenTotal = (Number(NumberValue_first).toString().replace(".", "") * NumberValue_secend) / Math.pow(10, PointLength_first);
          } else {
            ScreenTotal = Number(NumberValue_first * NumberValue_secend);
          }
          OperatorStatus = false;
          NumberValue_first = ScreenTotal;
          break;
        case "÷":
          PointLength_first = (Math.round(Number(NumberValue_first).toString().replace(".", "") / NumberValue_first) + "").length;
          PointLength_secend = (Math.round(Number(NumberValue_secend).toString().replace(".", "") / NumberValue_secend) + "").length;
          ScreenTotal = Number((Number(NumberValue_first).toString().replace(".", "")) / Number(Number(NumberValue_secend).toString().replace(".", ""))) * Math.pow(10, PointLength_secend - PointLength_first);
          OperatorStatus = false;
          NumberValue_first = ScreenTotal;
          break;
      }
    }

    $(".ScreenTotal").text(ScreenTotal);
  });
});
