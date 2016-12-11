/**
 * Created by sanketh on 12/3/2016.
 */
function validateSellForm()
{
    var returnresult = false;
    var yearValidation = /\d{4}/;
    jQuery(function($) {

        try {
            var title = $("#title").val();
            var description  = $("#description").val();
            var price  = $("#price").val();
            var condition = $("#condition").val();
            var purchasedYear = $("#purchasedYear").val();
            var productImage = $("#productImage").val();
            var status = $('#status :selected').text();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            if (!title) throw "Must provide title.";
            if (!description) throw "Must provide description.";
            if (!price) throw "Must provide price.";
            if (!condition) throw "Must provide product's condition.";
            if (!purchasedYear) throw "Must provide year of product purchase.";
            if (purchasedYear < 1 || !purchasedYear.match(yearValidation)) throw "Provide a Valid purchased year";
            if (!status) throw "Must provide status.";
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

function validateUpdateProductForm()
{
    var returnresult = false;
    var yearValidation = /\d{4}/;
    jQuery(function($) {

        try {
            var title = $("#title").val();
            var description  = $("#description").val();
            var price  = $("#price").val();
            var condition = $("#condition").val();
            var purchasedYear = $("#purchasedYear").val();
            var productImage = $("#productImage").val();
            var status = $("#status").val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");

            if (!title) throw "Must provide title.";
            if (!description) throw "Must provide description.";
            if (!price) throw "Must provide price.";
            if (!condition) throw "Must provide product's condition.";
            if (!purchasedYear) throw "Must provide year of product purchase.";
            if (purchasedYear < 1 || !purchasedYear.match(yearValidation)) throw "Provide a Valid purchased year";
            if (!status) throw "Must provide status.";
                        returnresult = true;
        } catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}
