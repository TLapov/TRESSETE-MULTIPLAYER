export class Cards {
    cards = [
        ...Object.values(new Batoons()), 
        ...Object.values(new Swords()),
        ...Object.values(new Coins()),
        ...Object.values(new Cups())
    ];

    deck(): any[] {
        let deck = [...this.cards];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
}

class Batoons {
    static category = 'batoons';
    aceOfBatons = {
        name: 'aceOfBatons',
        category: Batoons.category,
        img: 'assets/aceOfBatons.png',
        value: 1,
        strength: 3
    }
    twoOfBatons = {
        name: 'twoOfBatons',
        category: Batoons.category,
        img: 'assets/twoOfBatons.png',
        value: 0.333,
        strength: 2
    }
    threeOfBatons = {
        name: 'threeOfBatons',
        category: Batoons.category,
        img: 'assets/threeOfBatons.png',
        value: 0.3333,
        strength: 1
    }
    fourOfBatons = {
        name: 'fourOfBatons',
        category: Batoons.category,
        img: 'assets/fourOfBatons.png',
        value: 0,
        strength: 10
    }
    fiveOfBatons = {
        name: 'fiveOfBatons',
        category: Batoons.category,
        img: 'assets/fiveOfBatons.png',
        value: 0,
        strength: 9
    }
    sixOfBatons = {
        name: 'sixOfBatons',
        category: Batoons.category,
        img: 'assets/sixOfBatons.png',
        value: 0,
        strength: 8
    }
    sevenOfBatons = {
        name: 'sevenOfBatons',
        category: Batoons.category,
        img: 'assets/sevenOfBatons.png',
        value: 0,
        strength: 7
    }
    knaveOfBatons = {
        name: 'knaveOfBatons',
        category: Batoons.category,
        img: 'assets/knaveOfBatons.png',
        value: 0.333,
        strength: 6
    }
    knightOfBatons = {
        name: 'knightOfBatons',
        category: Batoons.category,
        img: 'assets/knightOfBatons.png',
        value: 0.333,
        strength: 5
    }
    kingOfBatons = {
        name: 'kingOfBatons',
        category: Batoons.category,
        img: 'assets/kingOfBatons.png',
        value: 0.333,
        strength: 4
    }
}

class Swords {
    static category = 'swords';
    aceOfSwords = {
        name: 'aceOfSwords',
        category: Swords.category,
        img: 'assets/aceOfSwords.png',
        value: 1,
        strength: 3
    }
    twoOfSwords = {
        name: 'twoOfSwords',
        category: Swords.category,
        img: 'assets/twoOfSwords.png',
        value: 0.333,
        strength: 2
    }
    threeOfSwords = {
        name: 'threeOfSwords',
        category: Swords.category,
        img: 'assets/threeOfSwords.png',
        value: 0.333,
        strength: 1
    }
    fourOfSwords = {
        name: 'fourOfSwords',
        category: Swords.category,
        img: 'assets/fourOfSwords.png',
        value: 0,
        strength: 10 
    }
    fiveOfSwords = {
        name: 'fiveOfSwords',
        category: Swords.category,
        img: 'assets/fiveOfSwords.png',
        value: 0,
        strength: 9
    }
    sixOfSwords = {
        name: 'sixOfSwords',
        category: Swords.category,
        img: 'assets/sixOfSwords.png',
        value: 0,
        strength: 8
    }
    sevenOfSwords = {
        name: 'sevenOfSwords',
        category: Swords.category,
        img: 'assets/sevenOfSwords.png',
        value: 0,
        strength: 7
    }
    knaveOfSwords = {
        name: 'knaveOfSwords',
        category: Swords.category,
        img: 'assets/knaveOfSwords.png',
        value: 0.333,
        strength: 6
    }
    knightOfSwords = {
        name: 'knightOfSwords',
        category: Swords.category,
        img: 'assets/knightOfSwords.png',
        value: 5,
        strength: 0.333
    }
    kingOfSwords = {
        name: 'kingOfSwords',
        category: Swords.category,
        img: 'assets/kingOfSwords.png',
        value: 4,
        strength: 0.333
    }
}

class Coins {
    static category = 'coins';
    aceOfCoins = {
        name: 'aceOfCoins',
        category: Coins.category,
        img: 'assets/aceOfCoins.png',
        value: 1,
        strength: 3
    }
    twoOfCoins = {
        name: 'twoOfCoins',
        category: Coins.category,
        img: 'assets/twoOfCoins.png',
        value: 0.333,
        strength: 2
    }
    threeOfCoins = {
        name: 'threeOfCoins',
        category: Coins.category,
        img: 'assets/threeOfCoins.png',
        value: 0.333,
        strength: 1
    }
    fourOfCoins = {
        name: 'fourOfCoins',
        category: Coins.category,
        img: 'assets/fourOfCoins.png',
        value: 0,
        strength: 10
    }
    fiveOfCoins = {
        name: 'fiveOfCoins',
        category: Coins.category,
        img: 'assets/fiveOfCoins.png',
        value: 0,
        strength: 9
    }
    sixOfCoins = {
        name: 'sixOfCoins',
        category: Coins.category,
        img: 'assets/sixOfCoins.png',
        value: 0,
        strength: 8
    }
    sevenOfCoins = {
        name: 'sevenOfCoins',
        category: Coins.category,
        img: 'assets/sevenOfCoins.png',
        value: 0,
        strength: 7
    }
    knaveOfCoins = {
        name: 'knaveOfCoins',
        category: Coins.category,
        img: 'assets/knaveOfCoins.png',
        value: 0.333,
        strength: 6
    }
    knightOfCoins = {
        name: 'knightOfCoins',
        category: Coins.category,
        img: 'assets/knightOfCoins.png',
        value: 0.333,
        strength: 5
    }
    kingOfCoins = {
        name: 'kingOfCoins',
        category: Coins.category,
        img: 'assets/kingOfCoins.png',
        value: 0.333,
        strength: 4
    }
}

class Cups {
    static category = 'cups';
    aceOfCups = {
        name: 'aceOfCups',
        category: Cups.category,
        img: 'assets/aceOfCups.png',
        value: 1,
        strength: 3
    }
    twoOfCups = {
        name: 'twoOfCups',
        category: Cups.category,
        img: 'assets/twoOfCups.png',
        value: 0.333,
        strength: 2
    }
    threeOfCups = {
        name: 'threeOfCups',
        category: Cups.category,
        img: 'assets/threeOfCups.png',
        value: 0.333,
        strength: 1
    }
    fourOfCups = {
        name: 'fourOfCups',
        category: Cups.category,
        img: 'assets/fourOfCups.png',
        value: 0,
        strength: 10
    }
    fiveOfCups = {
        name: 'fiveOfCups',
        category: Cups.category,
        img: 'assets/fiveOfCups.png',
        value: 0,
        strength: 9
    }
    sixOfCups = {
        name: 'sixOfCups',
        category: Cups.category,
        img: 'assets/sixOfCups.png',
        value: 0,
        strength: 8
    }
    sevenOfCups = {
        name: 'sevenOfCups',
        category: Cups.category,
        img: 'assets/sevenOfCups.png',
        value: 0,
        strength: 7
    }
    knaveOfCups = {
        name: 'knaveOfCups',
        category: Cups.category,
        img: 'assets/knaveOfCups.png',
        value: 0.333,
        strength: 6
    }
    knightOfCups = {
        name: 'knightOfCups',
        category: Cups.category,
        img: 'assets/knightOfCups.png',
        value: 0.333,
        strength: 5
    }
    kingOfCups = {
        name: 'kingOfCups',
        category: Cups.category,
        img: 'assets/kingOfCups.png',
        value: 0.333,
        strength: 4
    }
}
