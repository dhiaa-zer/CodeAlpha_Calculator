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
    if(current.innerText.length>16){
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
    const operandsRegex = /[\d.]+/g;
    const operatorRegex = /[+\-x\/]/g;
    let mytext = previous.innerText + current.innerText;
    const operands = mytext.match(operandsRegex)?.map(Number) || [];
    const operator = mytext.match(operatorRegex);
    
    if (operator.length != 0 && operands.length == 2) {
        switch (operator[0]) {
            case '+':
                current.innerText = String(operands[0] + operands[1]);
            
                break;
            case 'x':
                current.innerText = String(operands[0] * operands[1]);
                
                break;
            case '/':
                current.innerText = String(operands[0] / operands[1]);
                
                break;
            default:
                current.innerText = String(operands[0] - operands[1]);
                
        }
        previous.innerText = "";
        resultDisplayed=true;
    }
}

function Keyboard(event){
    const key = event.key;  
    if(key==='-' && current.innerText===''){
        add_current(key);
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
        if(resultDisplayed){
            current.innerText='';
            resultDisplayed=false;
        }
        add_current(number.innerText);
    });
});


op_btn.forEach(operation => {
    operation.addEventListener('click', () => {
         if(operation.innerText==='-' && current.innerText===''){
            add_current(operation.innerText);
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