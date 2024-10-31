const quotes = [`Chinese?`, `Need a quipe`, `It was 2 for £2!`, `WHERE'S RITTLE??`, `PRESIDENT DOWN`, `HA.`, `NOT REALLY`, `EVERYONE'S ENTITLED TO THEIR OWN PREFERENCE`,
    `SNAAAACKS`, `YOU CAN'T GET CHEAP WOOD`, `NO NO….THAT'S A CITY LORRY`, `RIGHT!` ,`GOT GUUUNS`, `YOU DON'T PUT SHARP KNIVES IN THE DISHWASHER!`,
    `It's physically impossible for me to queef.`, `Have you got the same number of points as gandalf has sexualities?`, `THAT'S SAUCE`, `Needin ma bed`,
    `I'M ALL STICKY NOW!`, `One eye's on the shop and the other's coming back with the change`, `IT'S DRIPPIN!`, `I'LL BE THE ONE LAUGHING WHEN THERE'S A SHORTAGE OF VEG`,
    `MY BODY'S A TEMPLE`, `BUT I'M NO GAY`, `10 INCH RIP, CRACK TAE SACK!`, `DO I JUST JUMP WHEN YOU SAY JUMP?!`, `She's fucking bipolar, eh.`, `Crackin wee barbeque, eh.`,
    `There was nothing I could have done bois.`, `YOU'VE GOT A CRACKIN ARSE, HERE, HAVE SOME FUDGE`, `♪♪ THE COUNTDOWN IS FINAL ♪♪`, `GAAAAAAMES?`, `MINIATURE SCHNAUZERS!!`,
    `Don't wanna get bummed by a demon.`, `THAT'S MY PENIS!`, `I DID NOT FART!`, `Am no a fucking curry.`, `YOU'RE A FUNNY CUNT.`, `I DON'T FIND IT FUNNY, FUNNILY ENOUGH.`,
    `THAT'S MY BUMHOLE!`, `NO. SERIOUSLY.`, `THERE'S FUCK ALL WRONG WITH IT!`, `You're so cosy…. eh.`, `I'm heading doon tae the fish shop.`, `10 TUN O HADDOCK, 3 TUN O COD`,
    `You've twisted my arm`, `I'M CHUGGY BUT FUGGY`, `WOAH-OH`, `GOT A 9AM THE MORROW!`, `I only opened three crates`, `I'M TOUCHING CLOTH!`];

export function getShunQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}