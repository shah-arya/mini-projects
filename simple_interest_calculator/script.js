function compute()
{
    var p = document.getElementById("principal").value;
    var rate = document.getElementById("rate").value;
    var num_years = document.getElementById("years").value;
    var interest = p * num_years * rate /100;
    var amount = parseInt(p) + parseFloat(interest);
    var result = document.getElementById("result");
    var year = new Date().getFullYear() + parseInt(num_years);

    if(p <= 0){
        alert("Enter a positive number.");
        document.getElementById("principal").focus();
    }
    else{
        result.innerHTML = "If you deposit $" + "<mark>" + p + "</mark>" + ", \<br\> at an interest rate of " 
        + "<mark>" + rate + "</mark>" + "%. \<br\>You will receive an amount of " + "<mark>" + amount + "</mark>" + ", \<br\>in the year " 
        + "<mark>" + year + "</mark>" + "\<br\>";
    }
    
}

// use to display Rate slider
function updateRate(){
    var rateval = document.getElementById("rate").value;
    document.getElementById("rate_val").innerText = rateval;
}