/**
 * Created by sanketh on 11/29/2016.
 */
function validateSignupForm()
{

    var returnresult = false;
    var phoneValidation=/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm;
    jQuery(function($) {

        try {
            var email = $("#email").val();
            var password = $("#password").val();
            var cnfpassword = $("#cnfpassword").val();
            var phone = $("#userphone").val();
            var lastname = $("#lastname").val();
            var firstname = $("#firstname").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipcode = $("#zipcode").val();
            var verifyText = $("#textverify").val();
            var gender;

            if (document.getElementById('mgender').checked) {
                gender = document.getElementById('mgender').value;
            }
            else {
                gender = document.getElementById('fgender').value;
            }
            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.
            if (!email) errorMessage = "Please provide the email.\n";
            if (!password) errorMessage = errorMessage+"Please provide the password.\n";
            if (!cnfpassword) errorMessage = errorMessage+"Please confirm password.\n";
            if (!firstname) errorMessage = errorMessage+"Please provide the firstname.\n";
            if (!lastname) errorMessage = errorMessage+"Please provide the lastname.\n";
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10)
                errorMessage = errorMessage+"Please provide a valid contact number.\n";
            if (!address || !city || !state || !zipcode)
                errorMessage = errorMessage+"Please provide all the address field values.\n";
            if (password.length <8 || password.length > 15) errorMessage = errorMessage+"Please provide a Password containing atleast 8 characters and maximum of 15 characters.\n"
            /*if (!address) errorMessage = errorMessage+"Please provide the address.\n";
             if (!city) errorMessage = errorMessage+"Please provide the city.\n";
             if (!lastname) errorMessage = errorMessage+"Please provide the lastname.\n";
             */
            //console.log($("#codeValue").val());
            //console.log(profilePic);
            //console.log(verifyText == $("#codeValue").val());
            if(errorMessage != "") {
                console.log("Error");
                throw errorMessage;
            }
            if(password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            if(verifyText != $("#codeValue").val()) {
                throw "Verification failed. Please enter the correct code.";
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