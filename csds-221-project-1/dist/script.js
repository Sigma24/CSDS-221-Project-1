$(document).ready(function () {
  $("#checkIn").change(calculateNumDays);
  $("#checkOut").change(calculateNumDays);
  $("#numAdults").on("input", calculateCost);
  $("#resetButton").click(function () {
    inputs.forEach((input) => {
      input.parent().removeClass("has-error");
    });
    toastr["info"]("Fields were successfully cleared.", "");
  });
  $("#submitButton").click(function (e) {
    e.preventDefault();
    var validInputs = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].val().trim() === "") {
        inputs[i].parent().addClass("has-error");
        validInputs = false;
        toastr["error"](
          `The ${inputs[i]
            .attr("id")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()} field is missing.`,
          ""
        );
      } else {
        inputs[i].parent().removeClass("has-error");
      }
    }
    if ($("#cost").val() === "") {
      validInputs = false;
      toastr["error"]("No cost was calculated.", "");
    } else if ($("#cost").val() < 0) {
      validInputs = false;
      toastr["error"]("The cost is negative.", "");
    }
    if (validInputs) {
      toastr["success"]("The form was successfully submitted.", "");
    }
  });
});

inputs = [
  $("#username"),
  $("#firstName"),
  $("#lastName"),
  $("#phoneNumber"),
  $("#faxNumber"),
  $("#email")
];

function calculateNumDays() {
  var start = moment($("#checkIn").val());
  var end = moment($("#checkOut").val());
  if (start.isValid() && end.isValid()) {
    var days = end.diff(start, "days");
    $("#numDays").val(days);
    calculateCost();
  }
}

function calculateCost() {
  var numAdults = $("#numAdults").val();
  var numDays = $("#numDays").val();
  if (numDays !== "") {
    var cost = 150 * numAdults * numDays;
    $("#cost").val(cost);
  }
}