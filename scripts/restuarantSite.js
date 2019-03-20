function isEmail(email) {
     var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);

}

$("#text").click(function() {

var errorMessage = "";
var fieldsMissing = "";

if($("#userEmail").val() == "") {
  fieldsMissing += "<br>Email";
}

if($("#phone").val() == "") {
  fieldsMissing += "<br>Telephone";
}
if($("#userName").val() == "") {
  fieldsMissing += "<br>Name";
}

if (fieldsMissing != "") {

  errorMessage += "<p>The following field(s) are missing:" + fieldsMissing;
}

if (isEmail($("#userEmail").val()) == false) {
  errorMessage += "<p>Your email address is not valid</p>";
}

if ($.isNumeric($("#phone").val()) == false) {
  errorMessage += "<p>Your phone number is not numeric</p>";
}
if (isEmail($("#userName").val()) == false) {
  errorMessage += "<p>Your name is not valid</p>";
}

if (errorMessage != "") {
  $("#errorMessage").submit(errorMessage);
} else {
  $("#successMessage").show();
  $("#errorMessage").hide();
}
});
