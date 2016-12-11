/**
 * Created by sanketh on 11/29/2016.
 */
function validateSignupForm()
{
    var returnresult = false;
    var phoneValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var zipValidation = /^\d{5}$|^\d{5}-\d{4}$/;
    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    jQuery(function($) {

        try {

           
            var email = $("#email").val();
            var password = $("#password").val();
            var cnfpassword = $("#cnfpassword").val();
            var phone = $("#phoneNumber").val();
            var lastName = $("#lastName").val();
            var firstName = $("#firstName").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipCode = $("#zipCode").val();
            var verifyText = $("#textVerify").val();
            var gender;
            var securityQues = $('#securityQuestion :selected').text();
            var securityAns = $('#securityAnswer').val();
            console.log(securityQues);
            console.log(securityAns);
            console.log($('#securityQuestion').val());
            if (document.getElementById('mgender').checked) {
                gender = document.getElementById('mgender').value;
            }
            else {
                gender = document.getElementById('fgender').value;
            }
            var errorContainer = document.getElementById("error-container");
            var errorContainer1 = document.getElementById("error-container1");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            var errorTextElement1 = errorContainer1.getElementsByClassName("text-goes-here")[0];
            //var errorTextElement1 = errorContainer.getElementsByClassName("text-goes-here")[1];
            errorContainer.classList.add("hidden");
            errorContainer1.classList.add("hidden");
            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.
            console.log(document);
            $( "#fnameerror" ).empty();
            $( "#lnameerror" ).empty();
            $( "#emailerror" ).empty();
            $( "#passworderror" ).empty();
            $( "#cnfpassworderror" ).empty();
            $( "#phoneerror" ).empty();
            $( "#addresserror" ).empty();
            $("#passwordValiderror").empty();
            if (!firstName) {
                errorCheck = true;
                document.getElementById('fnameerror').innerHTML="*Please enter a firstName*";
            }
            if (!lastName) {
                errorCheck = true;
                document.getElementById('lnameerror').innerHTML="*Please provide the lastName*";
            }
            if (!email) {
                errorCheck = true;
                document.getElementById('emailerror').innerHTML="*Please provide the email. ex: abc@stevens.edu *";
            }
            if (!password) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide the password*";
            }
            if (!cnfpassword) {
                errorCheck = true;
                document.getElementById('cnfpassworderror').innerHTML="*Please confirm password*";
            }
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10) {
                errorCheck = true;
                document.getElementById('phoneerror').innerHTML="*Please provide a valid contact number*";
            }
            console.log(typeof zipCode);
            if (!address || !city || !state || !zipCode) {
                errorCheck = true;
                console.log("!!!");
                document.getElementById('addresserror').innerHTML="*Please provide all the address field values*";
            }
            else if(!zipCode.match(zipValidation)){
                errorCheck = true;
                console.log("###");
                document.getElementById('addresserror').innerHTML="*Zipcode invalid*";
            }
            console.log("sdfsdfsd");
            if (password && !password.match(passwordValidation)) {
                errorCheck = true;
                console.log("$$$");
                document.getElementById("passwordValiderror").innerHTML="*Please provide a Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase*";
            }


            /*if (!email) errorMessage = "Please provide the email."+"\n";
            if (!password) errorMessage = errorMessage+"Please provide the password.\n";
            if (!cnfpassword) errorMessage = errorMessage+"Please confirm password.\n";
            if (!firstName) errorMessage = errorMessage+"Please provide the firstName.\n";
            if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10)
                errorMessage = errorMessage+"Please provide a valid contact number.\n";
            if (!address || !city || !state || !zipCode)
                errorMessage = errorMessage+"Please provide all the address field values.\n";
            if (password.length <8 || password.length > 15) errorMessage = errorMessage+"Please provide a Password containing atleast 8 characters and maximum of 15 characters.\n"
            */
            //if(errorMessage != "") {
             if(errorCheck) {
                console.log("Error");
                //var errorlist = ["error1", "error2"];
                //throw errorlist;
                //throw errorMessage;
                errorContainer1.classList.remove("hidden");
                 //errorTextElement1
                return false;
            }
            // email format verification and domain verification
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(email.match(emailformat))
            {
                var domain = email.split("@")[1];
                if ($.inArray(domain, ['stevens.edu']) == -1) {
                    // InValid domain
                    throw "Please provide a valid Stevens email.";
                }
            }
            else
            {
                throw "Please provide a valid email format. ex. abc@stevens.edu";
            }

            if(password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            if(verifyText != $("#codeValue").val()) {
                throw "Verification failed. Please enter the correct code.";
            }
            if(!securityAns) {
                throw "security Answer required.";
            }
            returnresult = true;
        }catch (e) {
            console.log(e);
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}


// Update profile validation
function validateUserUpdateForm()
{

    var returnresult = false;
    //var phoneValidation=/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm;
    var phoneValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var zipValidation = /^\d{5}$|^\d{5}-\d{4}$/;
    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    jQuery(function($) {

        try {
            var email = $("#email").val();
            var password = $("#password").val();
            var cnfpassword = $("#cnfpassword").val();
            var phone = $("#phoneNumber").val();
            var lastName = $("#lastName").val();
            var firstName = $("#firstName").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipCode = $("#zipCode").val();
            var gender;
            var securityQues = $('#securityQuestion :selected').text();
            var securityAns = $('#securityAnswer').val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");

            var errorContainer1 = document.getElementById("error-container1");
            var errorTextElement1 = errorContainer1.getElementsByClassName("text-goes-here")[0];
            errorContainer1.classList.add("hidden");

            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.

            $( "#fnameerror" ).empty();
            $( "#lnameerror" ).empty();
            $( "#emailerror" ).empty();
            $( "#passworderror" ).empty();
            $( "#cnfpassworderror" ).empty();
            $( "#phoneerror" ).empty();
            $( "#addresserror" ).empty();

            if (!firstName) {
                errorCheck = true;
                document.getElementById('fnameerror').innerHTML="*Please enter a firstName*";
            }
            if (!lastName) {
                errorCheck = true;
                document.getElementById('lnameerror').innerHTML="*Please provide the lastName*";
            }
            if (!email) {
                errorCheck = true;
                document.getElementById('emailerror').innerHTML="*Please provide the email. ex: abc@stevens.edu *";
            }
            if (!password) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide the password*";
            }
            if (!cnfpassword) {
                errorCheck = true;
                document.getElementById('cnfpassworderror').innerHTML="*Please confirm password*";
            }
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10) {
                errorCheck = true;
                document.getElementById('phoneerror').innerHTML="*Please provide a valid contact number*";
            }
            if (!address || !city || !state || !zipCode) {
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Please provide all the address field values*";
            }
            else if(!zipCode.match(zipValidation)){
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Zipcode invalid*";
            }
            if (!password.match(passwordValidation)) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide a Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase*";
            }

            /*if (!email) errorMessage = "Please provide the email.\n";
            if (!password) errorMessage = errorMessage+"Please provide the password.\n";
            if (!cnfpassword) errorMessage = errorMessage+"Please confirm password.\n";
            if (!firstName) errorMessage = errorMessage+"Please provide the firstName.\n";
            if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10)
                errorMessage = errorMessage+"Please provide a valid contact number.\n";
            if (!address || !city || !state || !zipCode)
                errorMessage = errorMessage+"Please provide all the address field values.\n";
            if (password.length <8 || password.length > 15) errorMessage = errorMessage+"Please provide a Password containing atleast 8 characters and maximum of 15 characters.\n"

            if(errorMessage != "") {
                console.log("Error");
                throw errorMessage;
            }
*/
            if(errorCheck) {
                console.log("Error");
                errorContainer1.classList.remove("hidden");
                return false;
            }

            // email format verification and domain verification
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(email.match(emailformat))
            {
                var domain = email.split("@")[1];
                if ($.inArray(domain, ['stevens.edu']) == -1) {
                    // InValid domain
                    throw "Please provide a valid Stevens email.";
                }
            }
            else
            {
                throw "Please provide a valid email format. ex. abc@stevens.edu";
            }

            if(password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            var securityQuestion ="";
            if(securityQues == '1') securityQuestion ="City you were born in?";
            else securityQuestion = "Mother's maiden name?";
            if (email) {
                //console.log("requestCOnfig setup");
                var requestConfig = {
                    method: "POST",
                    url: "/updateUser",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        address: address,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        security:securityQuestion,
                        answer: securityAns
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log(responseMessage);
                    if(responseMessage.error){
                        //console.log(responseMessage.error);
                        errorTextElement.textContent = responseMessage.message;
                        errorContainer.classList.remove("hidden");
                    }else if(responseMessage.success){
                        //console.log(responseMessage.message._id);
                        //window.location="http://localhost:3000/myprofile/"+responseMessage.message._id;
                        window.location="http://localhost:3000/login/";
                    }
                });
            }
            returnresult = true;
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            console.log(e);
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}
