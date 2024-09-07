let styleLink = document.getElementById('style');
const radiBtns = document.querySelectorAll('input[name="theme"]');
let current = document.querySelector('.current');
let previous = document.querySelector('.previous');
let del = document.querySelector('button[data-action="Delete"]');
let reset = document.querySelector('button[data-action="reset"]');
let N_btn = document.querySelectorAll('button[data-value]');
let op_btn = document.querySelectorAll('button[data-operation]');
let equal = document.querySelector('button[data-action="equal"]');
let resultDisplayed=false;
// Change theme
function changeTheme(event) {
    const newTheme = event.target.value;
    styleLink.setAttribute('href', `css/${newTheme}`);
}

// Delete
function Delete() {
    if (current.innerText) {
        current.innerText = current.innerText.slice(0, -1);
    }
}

// Reset
function Reset() {
    current.innerText = '';
    previous.innerText = '';
}

// Add current value to the screen
function add_current(value) {
    if (value === '.' && current.innerText.includes('.')) {
        return;  
    }
    if(current.innerText.length>14){
        return ;
    }
    current.innerText += String(value);
}

// Add previous value to screen 
function add_previous(op) {
    if (/[+\-x\/]$/.test(previous.innerText)) {
        previous.innerText = previous.innerText.slice(0, -1) + " " + String(op); 
    } else {
        previous.innerText = current.innerText + " " + String(op);
        current.innerText = '';
    }
}

// Calculation
function calcul() {
    if(current.innerText.length!=''){

    
    const currentValue = parseFloat(current.innerText);  
    const previousValueParts = previous.innerText.split(' ');  

    if (previousValueParts.length === 2) {
        const previousValue = parseFloat(previousValueParts[0]);  
        const operator = previousValueParts[1];

        let result;
        switch (operator) {
            case '+':
                result = previousValue + currentValue;
                break;
            case 'x':
                result = previousValue * currentValue;
                break;
            case '/':
                result = currentValue === 0 ? 'Error' : previousValue / currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            default:
                return;
        }

        // Display the result and reset previous value
        current.innerText = String(result);
        previous.innerText = '';
        resultDisplayed = true;
    }
}
else{
    current.innerText='Error' ;
    previous.innerText='';
    resultDisplayed=true;
}
}

function Keyboard(event){
    const key = event.key;  
    if(key==='-' && current.innerText===''){
        add_current(key);
        resultDisplayed=false;
        return ;
     }

     if(/[.+\x\/]/.test(key)&& current.innerText==='' && previous.innerText==='' ||/[.+\x\/]/.test(key)&& current.innerText==='-'){
        return ;
     }

    


    if (!isNaN(key) || key==='.') {
       
        if(resultDisplayed){
            current.innerText='';
            resultDisplayed=false;
        }
        add_current(key);
    } else {
        switch (key) {
            case '+':
            case '-':
            case '*':
            case '/':    
              
                const operation = key === '*' ? 'x' : key;
                if (current.innerText.length != 0 && previous.innerText.length != 0) {
                    calcul();
                }
                add_previous(operation);
                break;
            case 'Enter': 
            case '=':
                calcul();
                break;
            case 'Backspace':  
                Delete();
                break;
            case 'Escape': 
                Reset();
                break;
        }
}

}
// Event listeners
radiBtns.forEach(radio => {
    radio.addEventListener('change', (event) => {
        changeTheme(event);
    });
});

del.addEventListener('click', () => {
    Delete();
});

reset.addEventListener('click', () => {
    Reset();
});

N_btn.forEach(number => {
    number.addEventListener('click', () => {
        if(number.innerText==='.' && current.innerText==='' && previous.innerText==='' ||number.innerText==='.'&& current.innerText==='-'){
            return ;
         }

        if(resultDisplayed){
            current.innerText='';
            resultDisplayed=false;
        }
        add_current(number.innerText);
    });
});


op_btn.forEach(operation => {
    operation.addEventListener('click', () => {
         if(operation.innerText!='-' && current.innerText==='' && previous.innerText==='' || current.innerText==='-'){
            return ;
         }
         if(operation.innerText==='-' && current.innerText===''){
            add_current(operation.innerText);
            resultDisplayed=false;
            return ;
         }

        if(current.innerText.length!=0 && previous.innerText.length!=0  ){
           calcul();
        }
        add_previous(operation.innerText);
        
    });
});


equal.addEventListener('click', () => {
    calcul();
});


document.addEventListener('keydown',(event)=>{
    Keyboard(event);
});