/**
 * Created by sanketh on 11/28/2016.
 */

(function ($) {

    var loginform = $("#loginform");

    console.log("123");
/*    loginform.submit(function (event) {
        event.preventDefault();
        //alert("Form submitted");
        try {
            //console.log("Form submitted");
            var email = $("#email").val();
            var password = $("#password").val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            //alert(username);
            //alert(password);
            console.log(email);
            console.log(password);
            if (!email) throw "Must provide email.";
            if (!password) throw "Must provide password.";
            //next();
             if (email && password) {
                 //console.log("requestCOnfig setup");
                 var requestConfig = {
                 method: "POST",
                 url: "/login",
                 contentType: 'application/json',
                 data: JSON.stringify({
                     email: email,
                     password: password
                 })
                 };

                 $.ajax(requestConfig).then(function (responseMessage) {
                     console.log(responseMessage);
                     //window.open("/private", "_self");
                 });
             }
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }
    });*/
})(window.jQuery);
