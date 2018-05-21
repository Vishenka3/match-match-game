class User{

    constructor(){
        this.login = null;
        this.password = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
    }

    static isValid(){
        let form = document.querySelector("#registration-form");
        let valid = false;
        for(let i=0;i<form.elements.length;i++) {
            if (form.elements[i].checkValidity() === false) {
                let target = form.elements[i];
                ModalWindow.addTooltip(target);
            } else {
                valid = true;
                ModalWindow.removeTooltip();
            }
        }
        return valid;
    }


    setUser(obj){
        this.login = obj.login;
        this.password = obj.password;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
    }

    isRegistered(){
        if(JSON.parse(localStorage.getItem(this.login))){
            let temp = JSON.parse(localStorage.getItem(this.login));
            if(temp.password === this.password){
                this.setUser(temp);
                return true;
            }else{
                ModalWindow.addTooltip(form.elements[1], 'Wrong password.');
                return false;
            }
        }else{
            ModalWindow.addTooltip(form.elements[0], 'Such login does not exist.');
            return false;
        }
    }

    saveProfile(object){
        this.login = object.login;
        this.password = object.password;
        this.first_name = object.first_name;
        this.last_name = object.last_name;
        this.email = object.email;

        if(JSON.parse(localStorage.getItem(this.login))){
            ModalWindow.addTooltip(form.elements[0], 'This login is already taken');
        }else{
            let sObj = JSON.stringify(this);
            localStorage.setItem(this.login, sObj);
            let modal = new ModalWindow();
            modal.close();
            this.setProfileIcon();
        }
    }

    setProfileIcon(){
        let header_button = document.getElementById('header-button');
        let head_profile = document.getElementById('head-profile');
        let profile_name = document.getElementById('profile-name');
        header_button.style.display = 'none';
        head_profile.style.display = 'flex';
        profile_name.innerHTML = 'User:<br>' + this.first_name + ' ' + this.last_name;

    }
}