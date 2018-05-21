
window.onload = function(){

    let modal = new ModalWindow();
    let currentUser = new User();
    let game = new Game(currentUser);
    let leader = new LeaderBoards();
    modal.show('rules');


    let logging_in = document.getElementById('log-in-button');
    logging_in.addEventListener('click', ()=>{
        modal.show('authorization');
    });

    let signing_in = document.getElementById('registration-link');
    signing_in.addEventListener('click', ()=>{
        modal.switchWindows();
        setTimeout(() =>{
            modal.show('registration')
        },500);
    });

    let ok_button = document.getElementById('ok-button');
    ok_button.addEventListener('click', ()=>{
        modal.switchWindows();
        setTimeout(() =>{
            modal.show('authorization')
        },500);
    });

    let congr_ok = document.getElementById('congr-ok');
    congr_ok.addEventListener('click', ()=>{
        modal.close();
    });

    let shirts_ok = document.getElementById('shirts-ok');
    shirts_ok.addEventListener('click', ()=>{
        modal.close();
    });

    let diff_ok = document.getElementById('diff-ok');
    diff_ok.addEventListener('click', ()=>{
        modal.close();
    });

    let difficulty_button = document.getElementById('difficulty-button');
    difficulty_button.addEventListener('click', ()=>{
        modal.show('difficulty')
    });

    let shirts_button = document.getElementById('shirts-button');
    shirts_button.addEventListener('click', ()=>{
        modal.show('shirts')
    });

    let reg_button = document.getElementById('reg-button');
    reg_button.addEventListener('click', ()=>{
        if(User.isValid()){
            let profile = {};
            form = document.querySelector("#registration-form");
            profile.login = form.elements[0].value;
            profile.password = form.elements[1].value;
            profile.first_name = form.elements[2].value;
            profile.last_name = form.elements[3].value;
            profile.email = form.elements[4].value;
            currentUser.saveProfile(profile);
        }
    });

    let author_button = document.getElementById('author-button');
    author_button.addEventListener('click', ()=>{
        form = document.querySelector("#authorization-form");
        currentUser.login = form.elements[0].value;
        currentUser.password = form.elements[1].value;
        if(currentUser.isRegistered()){
            modal.close();
            currentUser.setProfileIcon();
        }
    });

    const handler = (event)=>{
        game.displayCard(event);
        game.cardOpen(event);
        game.congratulations();
    };

    let start_game = document.getElementById('start-game');
    start_game.addEventListener('click', ()=>{
        game.newGame();
        for (let i = 0; i < game.cards.length; i++){
            game.cards[i].addEventListener("click", handler);
        }
    });

    let end_game = document.getElementById('back-to-main');
    end_game.addEventListener('click', ()=>{
        game.endGame();
        for (let i = 0; i < game.cards.length; i++){
            game.cards[i].removeEventListener("click", handler);
        }
    });

    let back_to_main = document.getElementById('table-to-main');
    back_to_main.addEventListener('click', ()=>{
        LeaderBoards.closeTables();
    });


    let restart_game = document.getElementById('restart-game');
    restart_game.addEventListener('click', ()=>{
        game.restartGame();
    });


    let leaderboards_show = document.getElementById('leaderboards-show');
    leaderboards_show.addEventListener('click', ()=>{
        LeaderBoards.showTables();
    });

};


