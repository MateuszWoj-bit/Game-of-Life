const form = document.querySelector(".value-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
event.preventDefault();
  const {
    elements: { horizontal, vertical, time },
  } = event.currentTarget;
  
  const newValues = {
    row: horizontal.value,
    column: vertical.value,
    time: time.value,
    };
    if (horizontal.value >= 1 && vertical.value >= 1 && time.value >= 1) {
      rows = Number.parseInt(horizontal.value);
      cols = Number.parseInt(vertical.value);
      reproductionTime = Number.parseInt(time.value);

      const gridContainer = document.getElementById("gridContainer");
      gridContainer.innerHTML = "";
      initialize();
    }  ;     
    
}
