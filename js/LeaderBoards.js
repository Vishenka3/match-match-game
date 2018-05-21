class LeaderBoards{
    constructor(){
        this.easyboards = [];
        this.mediumBoards = [];
        this.hardBoards = [];
    }

    static compare(res1, res2){
        return res1.timeValue - res2.timeValue;
    }

    addToBoard(difficulty, result){
        if(difficulty === 8){
            if(localStorage.getItem('easyBoards')){
                this.easyboards = JSON.parse(localStorage.getItem('easyBoards'));
            }
            this.easyboards.push(result);
            this.easyboards.sort( LeaderBoards.compare );
            if(this.easyboards.length>10){
                this.easyboards.pop();
            }
            let sObj = JSON.stringify(this.easyboards);
            localStorage.setItem('easyBoards', sObj);
            return this.easyboards.indexOf(result);
        }else if(difficulty === 16){
            if(localStorage.getItem('mediumBoards')){
                this.mediumBoards = JSON.parse(localStorage.getItem('mediumBoards'));
            }
            this.mediumBoards.push(result);
            this.mediumBoards.sort( LeaderBoards.compare );
            if(this.mediumBoards.length>10){
                this.mediumBoards.pop();
            }
            let sObj = JSON.stringify(this.mediumBoards);
            localStorage.setItem('mediumBoards', sObj);
            return this.mediumBoards.indexOf(result);
        }else if(difficulty === 24){
            if(localStorage.getItem('hardBoards')){
                this.hardBoards = JSON.parse(localStorage.getItem('hardBoards'));
            }
            this.hardBoards.push(result);
            this.hardBoards.sort( LeaderBoards.compare );
            if(this.hardBoards.length>10){
                this.hardBoards.pop();
            }
            let sObj = JSON.stringify(this.hardBoards);
            localStorage.setItem('hardBoards', sObj);
            return this.hardBoards.indexOf(result);
        }
    }

    static createTables(){
        let easyBoards = [];
        let mediumBoards = [];
        let hardBoards = [];
        let easyBoard = document.getElementById('easyBoard');
        let mediumBoard = document.getElementById('mediumBoard');
        let hardBoard = document.getElementById('hardBoard');
        easyBoard.innerHTML = '<tr>\n<th>Place</th>\n<th>Login</th>\n<th>Result</th>\n</tr>';
        mediumBoard.innerHTML = '<tr>\n<th>Place</th>\n<th>Login</th>\n<th>Result</th>\n</tr>';
        hardBoard.innerHTML = '<tr>\n<th>Place</th>\n<th>Login</th>\n<th>Result</th>\n</tr>';
        if(localStorage.getItem('easyBoards')){
            easyBoards = JSON.parse(localStorage.getItem('easyBoards'));
            for(let i=0;i<easyBoards.length;i++){
                let newTR = document.createElement('tr');
                newTR.innerHTML = '<td>№' + (i+1) + '</td><td>' + easyBoards[i].login + '</td><td>'+ easyBoards[i].finalTime +'</td>';
                easyBoard.appendChild(newTR);
            }
        }else{
            easyBoard.innerHTML = '<h4>This table is currently empty</h4>'
        }

        if(localStorage.getItem('mediumBoards')){
            mediumBoards = JSON.parse(localStorage.getItem('mediumBoards'));
            for(let i=0;i<mediumBoards.length;i++){
                let newTR = document.createElement('tr');
                newTR.innerHTML = '<td>№' + (i+1) + '</td><td>' + mediumBoards[i].login + '</td><td>'+ mediumBoards[i].finalTime +'</td>';
                mediumBoard.appendChild(newTR);
            }
        }else{
            mediumBoard.innerHTML = '<h4>This table is currently empty</h4>'
        }

        if(localStorage.getItem('hardBoards')){
            hardBoards = JSON.parse(localStorage.getItem('hardBoards'));
            for(let i=0;i<hardBoards.length;i++){
                let newTR = document.createElement('tr');
                newTR.innerHTML = '<td>№' + (i+1) + '</td><td>' + hardBoards[i].login + '</td><td>'+ hardBoards[i].finalTime +'</td>';
                hardBoard.appendChild(newTR);
            }
        }else{
            hardBoard.innerHTML = '<h4>This table is currently empty</h4>'
        }

    }

    static showTables(){
        LeaderBoards.createTables();
        let tables = document.getElementById('leader-boards');
        let main_menu = document.getElementById('main-menu');
        main_menu.style.opacity = '0';
        setTimeout(()=>{
            main_menu.style.display = 'none';
            tables.style.display = 'flex';
        }, 500);
        setTimeout(()=>{
            tables.style.opacity = '1';
        }, 1000);
    }

    static closeTables(){
        let tables = document.getElementById('leader-boards');
        let main_menu = document.getElementById('main-menu');
        tables.style.opacity = '0';
        setTimeout(()=>{
            main_menu.style.display = 'block';
            tables.style.display = 'none';
        }, 500);
        setTimeout(()=>{
            main_menu.style.opacity = '1';
        }, 1000);
    }
}