class Game{
    constructor(user){
        this.current_user = user;
        this.game_difficulty = 8;
        this.card_shirt = 'first';
        this.timer = document.querySelector(".timer");
        this.card_deck = document.getElementById('card-deck');
        this.cards_html = document.getElementsByClassName('card border-8bit');
        this.cards = [...this.cards_html];//[...this.cards_html];
        this.matched_cards = document.getElementsByClassName("match");
        this.opened_cards = [];
        this.m_second = 0;
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.first_move = 1;
        this.interval = 0;
    }

    newGame(){
        let game_field = document.getElementById('game-field');
        let main_menu = document.getElementById('main-menu');
        let difficulty_radio = document.getElementsByName('diff');
        for(let i = 0; i < difficulty_radio.length; i++) {
            if(difficulty_radio[i].checked){
                this.game_difficulty = Number(difficulty_radio[i].id);
            }
        }

        let shirts_radio = document.getElementsByName('shirts');
        for(let i = 0; i < shirts_radio.length; i++) {
            if(shirts_radio[i].checked){
                this.card_shirt = shirts_radio[i].id;
                for(let i=0;i<this.cards_html.length;i++) {
                    this.cards_html[i].className += ' ' + this.card_shirt;
                }
            }
        }

        main_menu.style.opacity = '0';
        setTimeout(()=>{
            main_menu.style.display = 'none';
            game_field.style.display = 'flex';
        }, 500);
        setTimeout(()=>{
            game_field.style.opacity = '1';
        }, 1000);

        if (this.game_difficulty === 8){
            this.card_deck.style.width = '34rem';

            let shuffledCards = Game.cansasCityShuffle(this.cards, 8);
            for (let i= 0; i < 9; i++){
                this.card_deck.innerHTML = '';
                [].forEach.call(shuffledCards, (item) =>{
                    this.card_deck.appendChild(item);
                });
            }


        }else if(this.game_difficulty === 16){
            this.card_deck.style.width = '34rem';

            let shuffledCards = Game.cansasCityShuffle(this.cards, 16);
            for (let i= 0; i < 16; i++){
                this.card_deck.innerHTML = '';
                [].forEach.call(shuffledCards, (item) =>{
                    this.card_deck.appendChild(item);
                });
            }

        }else if(this.game_difficulty === 24){
            this.card_deck.style.width = 100 + '%';

            let shuffledCards = Game.cansasCityShuffle(this.cards, 24);
            for (let i= 0; i < 24; i++){
                this.card_deck.innerHTML = '';
                [].forEach.call(shuffledCards, (item) =>{
                    this.card_deck.appendChild(item);
                });
            }
        }

        console.log('this.opened_cards: ' + this.opened_cards);
        this.first_move = 1;
        this.m_second = 0;
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        let timer = document.querySelector(".timer");
        timer.innerHTML = "0 mins 0,0 secs";
        clearInterval(this.interval);
    }

    endGame(){
        let game_field = document.getElementById('game-field');
        let main_menu = document.getElementById('main-menu');
        game_field.style.opacity = '0';
        clearInterval(this.interval);
        console.log('this.cards.length: ' + this.cards.length);
        console.log('this.matched_cards.length: ' + this.matched_cards.length);
        console.log('this.opened_cards.length: ' + this.opened_cards.length);
        setTimeout(()=>{
            game_field.style.display = 'none';
            main_menu.style.display = 'block';
            for(let i=0;i<this.cards.length;i++){
                this.cards[i].classList.remove("show", "open", "match", "unmatched", "disabled");
                this.cards[i].style.backgroundImage = '';
            }
            this.matched_cards =[];
            this.opened_cards = [];
        }, 500);
        setTimeout(()=>{
            main_menu.style.opacity = '1';
        }, 1000);
    }

    restartGame(){
        let game_field = document.getElementById('game-field');
        game_field.style.opacity = '0';
        clearInterval(this.interval);
        setTimeout(()=>{
            game_field.style.display = 'none';
            for(let i=0;i<this.cards.length;i++){
                this.cards[i].classList.remove("show", "open", "match", "unmatched", "disabled");
                this.cards[i].style.backgroundImage = '';
            }
            this.matched_cards =[];
            this.opened_cards = [];
            this.newGame();
        }, 500);
    }

    static cansasCityShuffle(array, size) {
        let currentIndex = size, temporaryValue, randomIndex;
        let newArray = [];
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            newArray.push(array[randomIndex]);
            array[randomIndex] = temporaryValue;
            newArray.push(temporaryValue);
        }
        return newArray;
    }

    displayCard(event){
        event.target.style.backgroundImage = 'url(assets/types/'+ event.target.type+'.jpg)';
        event.target.classList.toggle("open");
        event.target.classList.toggle("show");
        event.target.classList.toggle("disabled");
    };

    cardOpen(event) {
        if(this.first_move) {
            this.startTimer();
        }
        this.first_move = 0;
        this.opened_cards.push(event.target);
        console.log('this.matched_cards.length: ' + this.matched_cards.length);
        let len = this.opened_cards.length;
        if(len === 2){
            //moveCounter();
            if(this.opened_cards[0].type === this.opened_cards[1].type){
                this.matched();
            } else {
                this.unmatched();
            }
        }
    }

    matched(){
        this.matched_cards = document.getElementsByClassName("match");
        this.opened_cards[0].classList.add("match", "disabled");
        this.opened_cards[1].classList.add("match", "disabled");
        this.disable();
        this.opened_cards[0].classList.remove("show", "open", "no-event");
        this.opened_cards[1].classList.remove("show", "open", "no-event");

        setTimeout( ()=>{
            this.opened_cards[0].classList.add("disapear");
            this.opened_cards[1].classList.add("disapear");
            this.enable();
            this.opened_cards = [];
        }, 800)
    }

    unmatched(){
        this.opened_cards[0].classList.add("unmatched");
        this.opened_cards[1].classList.add("unmatched");
        this.disable();
        this.opened_cards[0].classList.add("flip-back");
        this.opened_cards[1].classList.add("flip-back");
        setTimeout(() =>{
                this.opened_cards[0].classList.remove("show", "open", "no-event","unmatched");
                this.opened_cards[1].classList.remove("show", "open", "no-event","unmatched");

        },600);
        setTimeout(() =>{
            this.opened_cards[0].style.backgroundImage = '';
            this.opened_cards[1].style.backgroundImage = '';
            this.opened_cards = [];
            this.enable();
        },1050);
    }

    disable(){
        Array.prototype.filter.call(this.cards, (card)=>{
            card.classList.add('disabled');
        });
    }

    enable(){
        Array.prototype.filter.call(this.cards, (card)=>{
            card.classList.remove('disabled');
            for(let i = 0; i < this.matched_cards.length; i++){
                this.matched_cards[i].classList.add("disabled");
            }
        });
    }

    startTimer(){
        this.interval = setInterval( () =>{
            this.timer.innerHTML = this.minute+" mins "+this.second+"," +this.m_second + "secs";
            this.m_second++;
            if(this.m_second === 1000){
                this.second++;
                this.m_second=0;
            }
            if(this.second === 60){
                this.minute++;
                this.second=0;
            }
            if(this.minute === 60){
                this.hour++;
                this.minute = 0;
            }
        },1);
    }

    congratulations(){
        if (this.matched_cards.length === this.game_difficulty) {
            clearInterval(this.interval);
            let finalTimeValue = this.m_second + (this.second * 1000) + (this.minute * 6000);
            let finalTime = timer.innerHTML;
            console.log(finalTimeValue);
            let result = {};
            result.login = this.current_user.login;
            result.timeValue = finalTimeValue;
            result.finalTime = finalTime;

            let leader = new LeaderBoards();
            let place = leader.addToBoard(this.game_difficulty, result);
            document.getElementById("result-time").innerHTML = finalTime;
            let diff_res = document.getElementById("difficulty-level");
            switch (this.game_difficulty) {
                case 8:
                    diff_res.innerHTML = 'easy';
                    break;
                case 16:
                    diff_res.innerHTML = 'medium';
                    break;
                case 24:
                    diff_res.innerHTML = 'hard';
                    break;
            }
            console.log(place);
            if(++place) {
                document.getElementById("leaderboard-place").innerHTML = place;
            }else{
                document.getElementById("leaderboard-result").innerHTML = "Unfortunately u don't get in leaderboards :(";
            }


            let modal = new ModalWindow();
            modal.show('congratulations');

            // declare star rating variable

            //showing move, rating, time on modal
            //document.getElementById("result-time").innerHTML = finalTime;
            //document.getElementById("starRating").innerHTML = starRating;
            //document.getElementById("totalTime").innerHTML = finalTime;

            //closeicon on modal
            //closeModal();
        }
    }
}