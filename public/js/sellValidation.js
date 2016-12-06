/**
 * Created by sanketh on 12/3/2016.
 */
function validateSellForm()
{
    console.log('sellValidation.js')
    var returnresult = false;
    jQuery(function($) {

        try {
            //console.log("Form submitted");
            var title = $("#title").val();
            var description  = $("#description").val();
            var condition = $("#condition").val();
            var purchasedYear = $("#purchasedYear").val();
            var productImage = $("#productImage").val();
            //var status = $("#status").val();
            var status = $('#status :selected').text();
            //var email = $("#email").val();


            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            //console.log(status);
            //console.log(email);
            //console.log(password);
            if (!title) throw "Must provide title.";
            if (!description) throw "Must provide description.";
            if (!condition) throw "Must provide product's condition.";
            if (!purchasedYear) throw "Must provide year of product purchase.";
            if (!status) throw "Must provide status.";
            // if (!productImage) throw "Must provide product's image.";
            //if (!email) throw "Must provide email.";

/*            //next();
            // if (title && description && condition && purchasedYear && status && productImage && email) {
            if (title && description && condition && purchasedYear && status && email) {
                //console.log("requestCOnfig setup");
                //noinspection JSAnnotator
                var requestConfig = {
                    method: "POST",
                    url: "/sell/sellProduct",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        title : title,
                        description  : description,
                        condition : condition,
                        purchasedYear : purchasedYear,
                        productImage : productImage,
                        status : status,
                        email : email
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log(responseMessage.message);
                    window.open("/products/"+responseMessage.message._id, "_self");
                });
            }*/
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
