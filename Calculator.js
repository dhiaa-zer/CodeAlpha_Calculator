
//change themes :
let styleLink;

document.addEventListener('DOMContentLoaded', () => {
   styleLink = document.getElementById('style');
   const radiBtns = document.querySelectorAll('input[name="theme"]');
   
   radiBtns.forEach(radio => {
       radio.addEventListener('change', (event) => {
           changeTheme(event);
       });
   });
});
   
function changeTheme(event) {
    const newTheme = event.target.value;
    styleLink.setAttribute('href', `css/${newTheme}`);
}

//operation :















//result :