new Vue ({
    el: "#app",
    data: {
        isNewGame: true,
        userHealth: 100,
        monsterHealth: 100,
        lastAttackValueUser: 0,
        lastAttackValueMonster: 0,
        moveArray: []
    },
    methods: {
        userAttack: function(){
            let userAttackValue = Math.floor((Math.random() * 8) + 4);
            if(this.monsterHealth >= 0){
                this.lastAttackValueUser = userAttackValue;
                if (this.monsterHealth < userAttackValue){
                    userAttackValue = this.monsterHealth;
                }
                this.monsterHealth -= userAttackValue;
            }
        },
        monsterAttack: function(){
            let monsterAttackValue = Math.floor((Math.random() * 8) + 3);
            this.lastAttackValueMonster = monsterAttackValue;
            if(this.userHealth >= 0){
                if (this.userHealth < monsterAttackValue){
                    monsterAttackValue = this.userHealth;
                }
                this.userHealth -= monsterAttackValue;
            }
        },
        attack: function(){
            this.userAttack();
            this.monsterAttack();
            this.addLogEntry();
        },
        specialAttack: function(){
            let userAttackValue = Math.floor((Math.random() * 8) + 11);
            if(this.monsterHealth >= 0){
                this.lastAttackValueUser = userAttackValue;
                if (this.monsterHealth < userAttackValue){
                    userAttackValue = this.monsterHealth;
                }
                this.monsterHealth -= userAttackValue;
            }
            this.monsterAttack();
            this.addLogEntry();
        },
        heal: function(){
            if (this.userHealth > 90){
                this.userHealth += 100-this.userHealth;
            }
            else{
                this.userHealth += 10;
            }
            this.monsterAttack();
            this.addLogEntry(true);
        },
        addLogEntry: function(isHeal){
            if (isHeal){
                this.moveArray.unshift({
                    str: "PLAYER HEALS FOR 10",
                    class: 'player-turn'});
            }
            else{
                this.moveArray.unshift({
                    str: "PLAYER HITS MONSTER FOR " + this.lastAttackValueUser,
                    class: 'player-turn'});
            }
            this.moveArray.unshift({
                str: "MONSTER HITS PLAYER FOR " + this.lastAttackValueMonster,
                class: 'monster-turn'});
        },
        endGame: function(){
            alert("Somebody won! Wanna Play again?");
            this.reset();
        },
        giveUp: function(){
            this.isNewGame = true;
        },
        reset: function(){
            this.isNewGame = true;
            this.moveArray = [];
            this.userHealth = 100;
            this.monsterHealth = 100;
            this.lastAttackValueUser = 0;
            this.lastAttackValueMonster = 0;
        },
        startGame: function(){
            this.reset();
            this.isNewGame = false;
        }
    },
    computed: {
        getCurrentMonsterHealth: function(){
            return 'width:' + this.monsterHealth + '%';
        },
        getCurrentUserHealth: function(){
            return 'width:' + this.userHealth + '%';
        },
        getLastUserAttack: function(){
            return this.lastAttackValueUser;
        },
        getLastMonsterAttack: function(){
            return this.lastAttackValueMonster;
        }

    },
    watch: {
        userHealth: function(value){
            var vm = this;
            if (vm.userHealth === 0){
                vm.endGame();
            }
        },
        monsterHealth: function(value){
            var vm = this;
            if (vm.monsterHealth === 0){
                vm.endGame();
            }
        }
    }
})