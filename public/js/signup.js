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
            var phone = $("#phoneNumber").val();
            var lastName = $("#lastName").val();
            var firstName = $("#firstName").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipCode = $("#zipCode").val();
            var verifyText = $("#textVerify").val();
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
            if (!firstName) errorMessage = errorMessage+"Please provide the firstName.\n";
            if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
            if (!phone || phone==undefined || !phone.match(phoneValidation) || phone.length<10)
                errorMessage = errorMessage+"Please provide a valid contact number.\n";
            if (!address || !city || !state || !zipCode)
                errorMessage = errorMessage+"Please provide all the address field values.\n";
            if (password.length <8 || password.length > 15) errorMessage = errorMessage+"Please provide a Password containing atleast 8 characters and maximum of 15 characters.\n"
            /*if (!address) errorMessage = errorMessage+"Please provide the address.\n";
             if (!city) errorMessage = errorMessage+"Please provide the city.\n";
             if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
             */
            //console.log($("#codeValue").val());
            //console.log(profilePic);
            //console.log(verifyText == $("#codeValue").val());
            if(errorMessage != "") {
                console.log("Error");
                throw errorMessage;
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
