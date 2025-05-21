

// Celcius to Fahrenheit
function temperature(){
    var c = document.getElementById("c").value;
    var f = (c * 9/5) + 32;
    document.getElementById("f").value = f;
}

// Kilogram to pounds
function weight(){
    var k = document.getElementById("kg").value;
    var l = k * 2.2;
    document.getElementById("lbs").value = l;
}

// Kilometers to Miles
function distance(){
    var k = document.getElementById("km").value;
    var l = k * 0.62137;
    document.getElementById("m").value = l;
}