function onSubmit(event) {
  const preg = document.getElementById("pregnancies");
  const glucose = document.getElementById("glucose");
  const blood = document.getElementById("blood-pressure");
  const skin = document.getElementById("skin-thickness");
  const insulin = document.getElementById("insulin");
  const pedigree = document.getElementById("diabetes-pedigree");
  const age = document.getElementById("age");
  const bmi = document.getElementById("bmi");
  const warning = document.getElementById("warning");

  if (
    !preg.value.trim() ||
    !glucose.value.trim() ||
    !blood.value.trim() ||
    !skin.value.trim() ||
    !insulin.value.trim() ||
    !pedigree.value.trim() ||
    !age.value.trim ||
    !bmi.value.trim()
  ) {
    warning.style.visibility = "visible";
    warning.innerHTML = "*Some of the data is empty!";
    event.preventDefault();
    return false;
  } else if (age.value <= 0) {
    warning.style.visibility = "visible";
    warning.innerHTML = "*Age can't be zero or less!";
    event.preventDefault();
    return false;
  }
  return true;
}
