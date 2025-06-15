const params = new URLSearchParams(window.location.search);
const preg = params.get("pregnancies");
const glucose = params.get("glucose");
const blood = params.get("blood_pressure");
const skin = params.get("skin_thickness");
const insulin = params.get("insulin");
const pedigree = params.get("diabetes_pedigree_function");
const age = params.get("age");
const bmi = params.get("bmi");

document.getElementById("pregData").innerHTML = "Pregnancies: " + preg;
document.getElementById("gluData").innerHTML = "Glucose: " + glucose;
document.getElementById("bloodData").innerHTML = "Blood Pressure: " + blood;
document.getElementById("skinData").innerHTML = "Skin Thickness: " + skin;
document.getElementById("insulinData").innerHTML = "Insulin: " + insulin;
document.getElementById("funcData").innerHTML =
  "Diabetes Pedigree Function: " + pedigree;
document.getElementById("ageData").innerHTML = "Age: " + age;
document.getElementById("bmiData").innerHTML = "BMI: " + bmi;

function goBack() {
  window.location.href = "/index.html";
}
