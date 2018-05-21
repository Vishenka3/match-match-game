let blinking = function(windowType) {

    let cursorBlink;
    let cmd2;
    let cursor;
    let inputElem2;
    let targ_form;

    function moveTargetElement(){
        cursor = cmd2.lastElementChild;
        inputElem2 = cmd2.nextElementSibling.firstElementChild;
        inputElem2.focus();

        clearInterval(cursorBlink);

        cursorBlink = window.setInterval( () => {
            if (cursor.style.visibility === 'visible') {
                cursor.style.visibility = 'hidden';
            } else {
                cursor.style.visibility = 'visible';
            }
        }, 400);

        inputElem2.onkeyup = (event) => {
            //console.log(inputElem2.value);
            if ((inputElem2.id == 'reg_password' || inputElem2.id == 'password') && ((event.keyCode > 46 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode == 161) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode > 162 && event.keyCode < 170))){
                hidden_pass.innerHTML+='*';
            }else if((inputElem2.id == 'reg_password' || inputElem2.id == 'password') && (event.keyCode === 8)){
                hidden_pass.innerHTML = hidden_pass.innerHTML.substr(0, hidden_pass.innerHTML.length-1);
            }
            cmd2.firstElementChild.innerHTML = inputElem2.value;
        };

        inputElem2.onblur = () => {
            clearInterval(cursorBlink);
            cursor.style.visibility = 'hidden';
        };
    }

    if(windowType === 'registration'){
        cmd2 = document.getElementsByClassName('cmd_for_login')[0];
        cursor= document.getElementsByClassName('cursor')[0];
        inputElem2 = document.getElementById('reg_login');
        hidden_pass = document.getElementsByClassName('hidden_span')[0];
        targ_form = document.getElementById('registration-form');
    }else if(windowType === 'authorization'){
        cmd2 = document.getElementsByClassName('cmd_for_login')[5];
        cursor= document.getElementsByClassName('cursor')[5];
        inputElem2 = document.getElementById('login');
        hidden_pass = document.getElementsByClassName('hidden_span')[1];
        targ_form = document.getElementById('authorization-form');
    }
    console.log('get focus');
    inputElem2.focus();

    targ_form.onkeyup = (event) =>{
        if(event.keyCode == 9){
            cmd2 = cmd2.parentNode.nextElementSibling.firstElementChild;
            moveTargetElement();
        }
    };

    targ_form.addEventListener('click', (event) =>{
        let target = event.target;
        console.log('inputElem2: ' + inputElem2.innerHTML);
        while (target != this) {
            if (target.classList == 'input_field') {
                cmd2 = target.firstElementChild;
                moveTargetElement();
                return;
            }
            target = target.parentNode;
        }
    });

    cursorBlink = window.setInterval( () => {
        if (cursor.style.visibility === 'visible') {
            //console.log('blinkau');
            cursor.style.visibility = 'hidden';
        } else {
            cursor.style.visibility = 'visible';
        }
    }, 400);

    inputElem2.onkeyup = () => {
        //console.log(inputElem2.value);
        cmd2.firstElementChild.innerHTML = inputElem2.value;
    };

    inputElem2.onblur = () => {
        clearInterval(cursorBlink);
        cursor.style.visibility = 'hidden';
    };
};