let insertName = prompt("Lütfen Adınızı Giriniz.");
let myName = document.querySelector("#myName");
if(insertName == ""){
    alert("Lütfen Bilgilerinizi Kontrol Ediniz!");
    window.location.reload();
}
myName.innerHTML = insertName.toUpperCase();
let days = ["Pazar",
"Pazartesi",
"Salı",
"Çarşamba",
"Perşembe",
"Cuma",
"Cumartesi"];
function checkTime(x){
    if(x < 10){
    x = "0" + x;
    }; 
    return x;
}
(function theTime(){
    const now = new Date();
    let date = now.getDate();
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hour = now.getHours();
    let day = now.getDay();
    sec = checkTime(sec);
    min = checkTime(min);
    hour = checkTime(hour);
    document.querySelector("#myClock").innerHTML = `${hour}:${min}:${sec} ${days[day]} `;
    setTimeout(theTime, 1000);
})()