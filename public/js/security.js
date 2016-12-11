/**
 * Created by sanketh on 11/28/2016.
 */

function validateSecurity()
{
    var returnresult = false;
    jQuery(function($) {
        try {
            var userSecurityAnswer = $("#answer1").val();
            var givenAnswer = $("#answer").val();
            var newpassword = $("#password").val();
            var cnfnewpassword = $("#cnfpassword").val();
            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");

            if(givenAnswer == userSecurityAnswer && !$("#password").val()) {
                $("#questionID").hide();
                $("#answerID").hide();
                $("#changePassword").show();
                returnresult = false;
                return returnresult;
            }
            else if(givenAnswer != userSecurityAnswer){
                throw "Security Answer doesn't match.";
            }
            else if((givenAnswer == userSecurityAnswer) && (newpassword != cnfnewpassword)) {
                throw "Passwords do not match.";
            }

            returnresult = true;
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}
