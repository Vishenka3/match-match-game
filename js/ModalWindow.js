class ModalWindow {

    constructor() {
        this._block = document.getElementById('blockscreen');
        this._win = document.getElementById('modalwindow');
    }

    initBlock() {
        if (!this._block) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            this._block = document.createElement('div');
            this._block.id = 'blockscreen';
            parent.insertBefore(this._block, obj);
        }
        this._block.style.opacity = '1';
        this._block.style.display = 'inline';
    }

    initWin(windowType) {
        if(windowType === 'registration'){
            document.getElementById('rules-window').style.display = 'none';
            document.getElementById('difficulty-window').style.display = 'none';
            document.getElementById('congratulations-window').style.display = 'none';
            document.getElementById('authorization-window').style.display = 'none';
            document.getElementById('shirts-window').style.display = 'none';
            document.getElementById('registration-window').className = 'window';
            document.getElementById('registration-window').style.display = 'block';
        }else if(windowType === 'authorization'){
            document.getElementById('rules-window').style.display = 'none';
            document.getElementById('difficulty-window').style.display = 'none';
            document.getElementById('congratulations-window').style.display = 'none';
            document.getElementById('registration-window').style.display = 'none';
            document.getElementById('shirts-window').style.display = 'none';
            document.getElementById('authorization-window').className = 'window';
            document.getElementById('authorization-window').style.display = 'block';
        }else if(windowType === 'rules'){
            document.getElementById('rules-window').className = 'rules window';
            document.getElementById('rules-window').style.display = 'block';
        }else if(windowType === 'difficulty'){
            document.getElementById('registration-window').style.display = 'none';
            document.getElementById('rules-window').style.display = 'none';
            document.getElementById('congratulations-window').style.display = 'none';
            document.getElementById('authorization-window').style.display = 'none';
            document.getElementById('shirts-window').style.display = 'none';
            document.getElementById('difficulty-window').className = 'window';
            document.getElementById('difficulty-window').style.display = 'block';
        }else if(windowType === 'shirts'){
            document.getElementById('registration-window').style.display = 'none';
            document.getElementById('rules-window').style.display = 'none';
            document.getElementById('congratulations-window').style.display = 'none';
            document.getElementById('authorization-window').style.display = 'none';
            document.getElementById('difficulty-window').style.display = 'none';
            document.getElementById('shirts-window').className = 'window';
            document.getElementById('shirts-window').style.display = 'block';
        }else if(windowType === 'congratulations'){
            document.getElementById('registration-window').style.display = 'none';
            document.getElementById('rules-window').style.display = 'none';
            document.getElementById('authorization-window').style.display = 'none';
            document.getElementById('difficulty-window').style.display = 'none';
            document.getElementById('shirts-window').style.display = 'none';
            document.getElementById('congratulations-window').className = 'window';
            document.getElementById('congratulations-window').style.display = 'block';
        }

        this._win.style.display = 'block';
        let className = this._win.className;
        if( className.indexOf(' smooth-appearing') === -1 ){
            className += ' smooth-appearing';
        }
        this._win.style.top = 'calc((100% - ' + window.getComputedStyle(this._win,null).getPropertyValue("height") + ')/2)';
        this._win.className = className;
    }

    close() {
        this._win.className = 'initial border-8bit';
        this._block.style.opacity = '0';
        setTimeout( ()=>{
            this._block.style.display = 'none';
            this._win.style.display = 'none';
            document.getElementById('rules-window').className = 'window hidden';
        },600);

        document.getElementById('registration-window').className = 'window hidden';
        document.getElementById('authorization-window').className = 'window hidden';

        let records = this._win.getElementsByTagName('span');
        for(let i=0;i<records.length;i++){
            records[i].innerHTML = '';
        }
        records = document.getElementsByTagName('input');
        for(let i=0;i<records.length;i++){
            records[i].value = '';
        }
        let profile_name = document.getElementById('profile-name');
        console.log('profile_name.innerHTML: ' + profile_name.innerHTML);
        ModalWindow.removeTooltip();
    }

    switchWindows() {
        this._win.className = 'initial border-8bit';
        document.getElementById('registration-window').className = 'window hidden';
        document.getElementById('authorization-window').className = 'window hidden';
        document.getElementById('rules-window').className = 'window hidden';
        let records = document.getElementsByTagName('span');
        for(let i=0;i<records.length;i++){
            records[i].innerHTML = '';
        }
        records = this._win.getElementsByTagName('input');
        for(let i=0;i<records.length;i++){
            records[i].value = '';
        }
        ModalWindow.removeTooltip();
    }

    show(win_type) {
        this.initBlock();
        this.initWin(win_type);
        if(win_type === 'authorization' || win_type === 'registration'){
            blinking(win_type);
        }
    }

    static addTooltip(target, errorText){
        let tooltip = target.getAttribute('data-tooltip');

        let tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        if(errorText){
            tooltipElem.innerHTML = '<div class="cbbl -right">' + errorText + '</div>';
        }else {
            tooltipElem.innerHTML = '<div class="cbbl -right">' + tooltip + '</div>';
        }
        document.body.appendChild(tooltipElem);

        let coords = target.getBoundingClientRect();
        let left = coords.left + 120 + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top - tooltipElem.offsetHeight - 18;
        if (top < 0) {
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';

        showingTooltip = tooltipElem;
    }

    static removeTooltip() {
        let tooltips = document.getElementsByClassName('cbbl -right');
        for (let i = 0; i < tooltips.length; i++) {
            tooltips[i].remove();
        }
    }
}
