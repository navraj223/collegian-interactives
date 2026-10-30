(() => {
  const root = document.getElementById('halloween-video-watchlist');
  const films = [{"title": "The Texas Chain Saw Massacre", "year": "1974", "review": "We kick off our list with Tobe Hooper’s scrappy shocker starring Marilyn Burns as Sally Hardesty, who, along with her brother and friends, tries to survive a bloody, sun-soaked day in rural Texas. Its grimy, nerve-fraying style helped shape slasher films and independent horror for decades. Leatherface changed the way we look at the American countryside and chainsaws forever.", "score": "5/5"}, {"title": "Audition", "year": "1999", "review": "Takashi Miike’s slow-burn begins with widower Shigeharu Aoyama (Ryo Ishibashi) holding fake auditions to find a new partner; Eihi Shiina’s quiet, unsettling Asami steals the show from the moment she appears. The film’s notorious shift from awkward romance to full-on nightmare made it a landmark of Japanese horror. Speed-dating by casting call may not have been a great idea.", "score": "4/5"}, {"title": "Saint Maud", "year": "2019", "review": "Morfydd Clark gives a riveting performance as Maud, a troubled care worker who becomes convinced she must save her patient Amanda’s soul. Jennifer Ehle makes an equally memorable impression as Amanda. Rose Glass’s debut turns private faith, guilt and an increasingly fragile grip on reality into an intimate psychological journey. The savior we never knew we needed.", "score": "3.5/5"}, {"title": "Titane", "year": "2021", "review": "Julia Ducournau’s body-horror fever dream stars Agathe Rousselle as Alexia, whose bizarre and dangerous habits take a startling turn when violence begins to take over. Vincent Lindon co-stars in a story that swerves from grotesque, twisted metal toward an unexpectedly tender, hard-to-categorize kind of family drama. If you’re a hardcore car lover, this might be for you. It’s definitely for Alexia.", "score": "3.5/5"}, {"title": "Midsommar", "year": "2019", "review": "Florence Pugh anchors Ari Aster’s sunlit folk horror as Dani, who travels with her boyfriend and his friends to a Swedish midsummer festival that grows increasingly disturbing. Jack Reynor, Will Poulter and the rest of the group join her on a trip where the bright flowers and daylight only make the rituals harder to look away from. The journey leaves you wondering whether it ends in tragedy or triumph?", "score": "5/5"}, {"title": "Tigers Are Not Afraid", "year": "2017", "review": "Writer-director Issa López blends fairy-tale imagery with the frightening reality facing a group of children in Mexico. Paola Lara leads as Estrella, a girl who joins a gang of street kids after her mother goes missing during a wave of gang violence in the city. Ghosts and wishes haunt a story that is imaginative, moving and far from a comforting bedtime story.", "score": "4/5"}, {"title": "The Thing", "year": "1982", "review": "Kurt Russell plays Antarctic researcher MacReady in John Carpenter’s chill-filled classic, where an alien can imitate any living creature — and suspicion becomes almost as dangerous as the monster. Rob Bottin’s genius is on full display as the practical effects deliver the film’s unforgettable transformations, while the isolated setting turns every test of trust into a paranoid fight for survival.", "score": "5/5"}, {"title": "Hellraiser", "year": "1987", "review": "Writer-director Clive Barker introduced the world to Pinhead and the Cenobites when a mysterious puzzle box opened the door to an otherworldly realm. The film’s mix of supernatural horror, grotesque imagery and forbidden desire gave horror fans a sexy new icon — a demon to some and an angel to others. It also gave puzzle enthusiasts a very good reason not to solve every puzzle they encounter.", "score": "5/5"}, {"title": "Videodrome", "year": "1983", "review": "David Cronenberg’s unnerving media nightmare stars James Woods as Max Renn, a television executive who stumbles on a disturbing broadcast, and Blondie’s Deborah Harry as Nicki Brand. As reality and hallucination blur, the film’s celebrated body horror and practical effects make television itself feel like an intruder. A message that’s just as strong today as it was over four decades ago.", "score": "3/5"}, {"title": "Evil Dead", "year": "2013", "review": "Fede Álvarez’s bloody revival of Sam Raimi’s horror series stars Jane Levy as Mia, whose friends try to help her through withdrawal in a remote cabin — only to unleash something so much worse. Its relentless gore and rain-soaked chaos make this one for the crowd that likes its horror loud, violent and mean.", "score": "4.5/5"}, {"title": "Saw", "year": "2004", "review": "Two men wake up chained in a grimy bathroom and must piece together the rules of a deadly game in James Wan’s classic breakout thriller. Cary Elwes and Leigh Whannell lead a cast whose desperate search for answers helped launch a long-running franchise — and made the phrase “I want to play a game” legendary among horror fans.", "score": "4.5/5"}, {"title": "The Lords of Salem", "year": "2012", "review": "Rob Zombie casts his wife Sheri Moon Zombie as Heidi, a radio DJ whose life gets tangled up with an ominous record and the town’s history of witch trials. Zombie puts his unmistakable musical influence on display and opts for slow-building dread over a conventional haunted-house ride in this forgotten gem.", "score": "2.5/5"}, {"title": "Train to Busan", "year": "2016", "review": "Yeon Sang-ho sends a zombie outbreak hurtling through a crowded train, with Gong Yoo as a work-obsessed father trying to protect his daughter, played by Kim Su-an. This Korean film took a struggling sub-genre and injected it with new life with this fresh take on zombies in a new environment. The confined setting keeps the action moving, but it’s the passengers’ choices and shifting alliances that give this high-speed thriller its emotional punch.", "score": "5/5"}, {"title": "American Psycho", "year": "2000", "review": "Christian Bale’s eerily polished Patrick Bateman navigates the status-obsessed world of Manhattan finance while the film’s satire keeps asking what, or who, he really is. A resurgence in the film’s popularity brought the question to a new generation of audiences. Based on Bret Easton Ellis’s novel, Mary Harron’s adaptation turns business cards, restaurant reservations and immaculate routines into weapons of uncomfortability.", "score": "4.5/5"}, {"title": "Frankenstein", "year": "1931", "review": "Boris Karloff’s iconic monster, directed by James Whale and created with makeup artist Jack Pierce, became one of horror’s defining images. Colin Clive plays the ambitious Dr. Frankenstein, but Karloff gives the creature a deep sadness that helped make the story more than a mad-scientist shocker; the film set a standard for generations of monster movies to come.", "score": "4/5"}, {"title": "Fear Street: 1994", "year": "2021", "review": "Leigh Janiak launches this Goosebumps derived trilogy with a group of teens, led by Kiana Madeira and Olivia Welch, confronting a murderous force tied to Shadyside’s long history. Its teen cast, Ghostface–inspired killer and ’90s soundtrack serve as the perfect opening chapter to a story that leaps backward through time in the next two films.", "score": "2.5/5"}, {"title": "Fear Street: 1978", "year": "2021", "review": "The trilogy heads to summer camp! Sadie Sink and Emily Rudd star as dysfunctional sisters who discover that Shadyside’s curse has followed them into the woods. With the series paying homage to slashers of the past, this film took inspiration from summer camp films of the ‘70s and ‘80s, while connecting the trilogy’s first and final films. Arguably the best of the trilogy, Leigh Janiak reminds us why sometimes keeping things simple goes a long way.", "score": "4/5"}, {"title": "Fear Street: 1666", "year": "2021", "review": "The final chapter travels to the town’s colonial past to uncover the origins of the curse. With the series previously heading down the slasher highway, 1666 took a different route and decided to opt for tense colonial imagery and thrill. Familiar performers such as Madeira, Welch and Sink return in new roles as the trilogy connects its periods and closes the loop on Shadyside’s history. Three movies, several eras and one town that should probably reconsider its slogan.", "score": "3.5/5"}, {"title": "A Nightmare on Elm Street", "year": "1984", "review": "Wes Craven’s dream-stalking slasher introduced Robert Englund as the razor-gloved Freddy Krueger and featured Johnny Depp in his film debut. Heather Langenkamp’s legendary final girl, Nancy, fights back in a world where falling asleep is the biggest danger. A truly genius idea that allowed the premise of the movie to control the rules we thought we knew.", "score": "5/5"}, {"title": "Final Destination", "year": "2000", "review": "Devon Sawa stars as Alex, a teenager who has a premonition moments before disaster and escapes — only for the survivors to discover that fate may still have them on its list. With Ali Larter and Seann William Scott among the cast, James Wong’s film turned elaborate chain reactions and everyday objects into a new kind of horror-movie suspense. Thank you, Rube Goldberg.", "score": "5/5"}, {"title": "Sleepaway Camp", "year": "1983", "review": "At Camp Arawak, a shy camper Angela (Felissa Rose) and her cousin Ricky (Jonathan Tiersten) arrive just as campers begin suffering bizarre, violent accidents. Robert Hiltzik’s cult slasher is remembered for its summer-camp setting and an ending that has kept viewers talking for years. I especially advise avoiding spoilers on this unexpectedly hilarious camp slasher classic.", "score": "3.5/5"}, {"title": "Child’s Play", "year": "1988", "review": "Catherine Hicks and Chris Sarandon star as a mother and detective trying to protect young Andy (Alex Vincent) from his new doll, Chucky — voiced by the amazing Brad Dourif. The concept of talking dolls had been done before but never with this degree of success. Director Tom Holland (no, not that one) made Chucky a horror icon and gave generations of kids a reason to distrust their favorite toys.", "score": "4.5/5"}, {"title": "Anaconda", "year": "1997", "review": "A documentary crew ventures into the Amazon and meets a very large obstacle: a giant snake. Jennifer Lopez, Ice Cube and Jon Voight star, with Voight’s snake-hunting Paul Serone providing a memorable dose of larger-than-life villainy. The result is a creature-feature adventure with plenty of jungle peril and one enormous reason to stay on the boat. If you like campy creature features, this may be the one for you.", "score": "3.5/5"}, {"title": "The Texas Chainsaw Massacre 2", "year": "1986", "review": "Director Tobe Hooper returns to the franchise with Dennis Hopper as a determined Texas lawman and Caroline Williams as a radio host drawn into Leatherface’s world. Released 12 years after the original, the sequel takes the franchise in a more comedic direction. The sequel shifts the original’s raw terror toward louder, broader dark comedy — chainsaws still included, subtlety optional.", "score": "4/5"}, {"title": "House of 1000 Corpses", "year": "2003", "review": "Rob Zombie’s first feature stars Fresno’s own Sid Haig, Bill Moseley and Rob Zombie’s wife, Sheri Moon Zombie as members of the bizarre Firefly family, who turn a road trip into a nightmare. Its music video – inspired colors, grindhouse grit and carnival-show weirdness make it feel like a haunted funhouse that is anything but fun for its visitors.", "score": "4.5/5"}, {"title": "12 Hour Shift", "year": "2020", "review": "Angela Bettis plays Mandy, a nurse trying to survive a hospital shift while caught up in a black-market organ scheme in rural Arkansas. Chloe Farnworth and David Arquette help turn the night into a chaotic, bloody comedy. Brea Grant’s film finds dark laughs in workplace stress, though most employees’ worst shift stories involve considerably fewer missing kidneys.", "score": "4/5"}, {"title": "Jennifer’s Body", "year": "2009", "review": "Megan Fox plays Jennifer, a high school student transformed into a classmate-devouring succubus, while Amanda Seyfried’s Needy narrates their complicated friendship. Written by Diablo Cody and directed by Karyn Kusama, the horror-comedy mixes teen angst, sharp dialogue and supernatural trouble. Infamously mismarketed upon release, it’s now seen as a time capsule of an era and has since found a devoted audience of its own.", "score": "4/5"}, {"title": "Coraline", "year": "2009", "review": "Henry Selick’s stop-motion adaptation of Neil Gaiman’s story follows Coraline, voiced by Dakota Fanning, through a hidden door into a tempting parallel world where the parents act a little differently and have buttons for eyes. Teri Hatcher and Ian McShane are also among the voice cast of this film’s beautifully crafted, quietly creepy fantasy. The animation and message make it an ideal gateway to spooky-season chills.", "score": "4.5/5"}, {"title": "Scooby Doo on Zombie Island", "year": "1998", "review": "The Mystery Inc. gang reunites for a Louisiana mystery that delivers a surprise. The supernatural menace is not simply another person in a rubber mask. Scooby, Shaggy, Fred, Daphne and Velma get a darker, spookier adventure than the usual unmasking routine. The film became a favorite among fans who wanted their cartoon mysteries with a little more monster, a little more stakes, and a lot more scooby!", "score": "3.5/5"}, {"title": "Halloweentown", "year": "1998", "review": "Kimberly J. Brown stars as Marnie, a young witch who discovers a secret town filled with magical creatures, while Debbie Reynolds plays her witchy grandmother Aggie. Disney’s cozy Halloween fantasy brings ghosts, goblins and family adventure together in a movie that feels like a bowl of Halloween candy in film form. Ready those nostalgia goggles and butter that popcorn.", "score": "3/5"}, {"title": "The Rocky Horror Picture Show", "year": "1975", "review": "Our countdown ends with none other than the greatest viewing experience in Halloween history! Tim Curry, the flamboyant Dr. Frank-N-Furter, Susan Sarandon and Barry Bostwick throw their absolute all into a musical tribute to old horror and science-fiction films. Songs, costumes and midnight audience participation helped turn this once-unlikely release into a cult phenomenon still to this day. The final instruction is simple: jump to the left, step to the right, and sing along if the room knows the words!", "score": "5/5"}];
  const designs = [
    ['#b8a178','#25180f','#a34424','sun'],
    ['#a5333b','#fff0db','#eec4ad','eyes'],
    ['#203c3b','#f3d9aa','#bb9d5f','cross'],
    ['#1b333c','#ead5bd','#8ba1a5','ring'],
    ['#e7dda6','#3e4928','#b798d2','flowers'],
    ['#253f38','#e9d9ac','#e7ad64','eyes'],
    ['#192d52','#edf6ee','#a7ccdf','rays'],
    ['#241c29','#dfbd6e','#c89948','grid'],
    ['#292341','#edb4be','#f5789c','screen'],
    ['#272328','#eddfbc','#a94734','slash'],
    ['#382528','#f1e3bf','#ce6459','spiral'],
    ['#482638','#e1bba7','#a54a5b','triangle'],
    ['#184549','#e5e8c4','#83bfc0','tracks'],
    ['#cec7b5','#621e31','#97283e','slash'],
    ['#344438','#dce7b5','#7b9b5b','cross'],
    ['#372747','#e8bd99','#b55078','slash'],
    ['#463024','#f4d995','#b9703e','moon'],
    ['#343731','#e7d9ac','#8c8358','triangle'],
    ['#38293b','#eedad1','#bf5857','slash'],
    ['#293742','#e7e4d2','#b3c6ce','tracks'],
    ['#234543','#f3d9a4','#d5ad65','triangle'],
    ['#233449','#e9cd98','#d95b49','eyes'],
    ['#283a28','#e1d1aa','#6d8a49','spiral'],
    ['#a36350','#211918','#e7bc6b','sun'],
    ['#462237','#eed6b0','#c54554','grid'],
    ['#1d434a','#e1d5bf','#c76766','cross'],
    ['#472b43','#f0c1d9','#dd7d9d','lips'],
    ['#263451','#f0e1ae','#cfbfe5','eyes'],
    ['#304b4a','#dfdcb2','#8cac75','moon'],
    ['#59333e','#f2d9a9','#e9ad61','moon'],
    ['#27212a','#f0d0c3','#ce3c55','lips']
  ];
  const rack = root.querySelector('.ah-rack');
  const prev = root.querySelector('.ah-prev');
  const next = root.querySelector('.ah-next');
  const cassette = root.querySelector('.ah-cassette');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pageSize = root.clientWidth - 64 <= 520 ? 4 : 8;
  let page = 0;
  let selected = 0;
  let tapeAnimation;
  function announce(message) {root.querySelector('.ah-status').textContent = message;}
  function updateCaseState() {
    root.querySelectorAll('.ah-vhs').forEach(button => {
      const active = Number(button.dataset.index) === selected;
      button.setAttribute('aria-pressed',String(active));
      button.querySelector('.ah-in-stock').textContent = active ? 'PICKED' : 'VHS';
    });
  }
  function renderShelves() {
    const columns = pageSize / 2;
    const start = page * pageSize;
    rack.replaceChildren();
    for (let offset = 0; offset < pageSize && start + offset < films.length; offset += columns) {
      const shelf = document.createElement('div');
      shelf.className = 'ah-shelf';
      for (let i = start + offset; i < Math.min(start + offset + columns, films.length); i++) {
        const film = films[i];
        const [bg,ink,accent,motif] = designs[i];
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ah-vhs cursor-interaction';
        button.dataset.index = i;
        button.setAttribute('aria-label', 'Read '+film.title+' ('+film.year+'), film '+(i+1));
        button.style.setProperty('--cover-bg',bg);
        button.style.setProperty('--cover-ink',ink);
        button.style.setProperty('--cover-accent',accent);
        const cover = document.createElement('span');cover.className='ah-cover';
        const art = document.createElement('span');art.className='ah-cover-art ah-motif-'+motif;art.setAttribute('aria-hidden','true');
        const issue = document.createElement('span');issue.className='ah-cover-issue';issue.setAttribute('aria-hidden','true');
        const number = document.createElement('span');number.textContent=String(i+1).padStart(2,'0');
        issue.append(number);
        const title = document.createElement('span');title.className='ah-cover-title'+(film.title.length>30?' ah-extra-long':film.title.length>22?' ah-long':'');title.textContent=film.title;
        const bottom = document.createElement('span');bottom.className='ah-cover-bottom';bottom.setAttribute('aria-hidden','true');
        const year = document.createElement('span');year.textContent=film.year;
        const stock = document.createElement('span');stock.className='ah-in-stock';stock.textContent='VHS';
        bottom.append(year,stock);cover.append(art,issue,title,bottom);button.append(cover);
        button.addEventListener('click',() => selectFilm(i,true));shelf.append(button);
      }
      rack.append(shelf);
    }
    root.querySelector('.ah-page-current').textContent = page + 1;
    root.querySelector('.ah-page-total').textContent = Math.ceil(films.length/pageSize);
    root.querySelector('.ah-page-range').textContent = String(start+1).padStart(2,'0')+'–'+String(Math.min(start+pageSize,films.length)).padStart(2,'0');
    prev.disabled = page === 0;
    next.disabled = (page+1)*pageSize >= films.length;
    updateCaseState();
  }
  function selectFilm(index,animate) {
    selected = index;
    const film = films[index];
    const number = String(index+1).padStart(2,'0');
    root.querySelector('.ah-film-title').textContent = film.title;
    root.querySelector('.ah-tape-title').textContent = film.title;
    root.querySelector('.ah-film-year').textContent = film.year+' · Film '+number+' of 31';
    root.querySelector('.ah-inventory').textContent = 'NO. '+number;
    root.querySelector('.ah-review').textContent = film.review;
    root.querySelector('.ah-score').textContent = film.score;
    root.querySelector('.ah-rating').setAttribute('aria-label','Coffin score: '+parseFloat(film.score)+' out of 5 for overall movie quality');
    const coffins = root.querySelector('.ah-coffins');coffins.replaceChildren();
    for (let i=0;i<5;i++) {
      const coffin = document.createElement('span');coffin.className='ah-coffin';
      coffin.style.setProperty('--fill',Math.max(0,Math.min(1,parseFloat(film.score)-i))*100+'%');coffins.append(coffin);
    }
    updateCaseState();
    if (animate && !reducedMotion.matches) {
      if (tapeAnimation) tapeAnimation.cancel();
      tapeAnimation = cassette.animate([{transform:'translate(35px,-14px) rotate(8deg)',opacity:.5},{transform:'translate(-4px,1px) rotate(-6deg)',opacity:1},{transform:'rotate(-4deg)',opacity:1}],{duration:460,easing:'cubic-bezier(.2,.7,.3,1)'});
    }
    if (animate) announce('At the counter: '+film.title+', '+film.year+'. Coffin score '+film.score+'. Full review below.');
  }
  function turnPage(delta) {
    page = Math.max(0,Math.min(Math.ceil(films.length/pageSize)-1,page+delta));
    renderShelves();
    announce('Shelf '+(page+1)+' of '+Math.ceil(films.length/pageSize)+'. Films '+(page*pageSize+1)+' through '+Math.min((page+1)*pageSize,films.length)+'.');
    if (document.activeElement === next && next.disabled) prev.focus();
    if (document.activeElement === prev && prev.disabled) next.focus();
  }
  prev.addEventListener('click',()=>turnPage(-1));
  next.addEventListener('click',()=>turnPage(1));
  root.querySelector('.ah-surprise').addEventListener('click',()=>{
    const index = (selected + 1 + Math.floor(Math.random()*(films.length-1))) % films.length;
    page = Math.floor(index/pageSize);renderShelves();selectFilm(index,true);
  });
  renderShelves();selectFilm(0,false);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(entries=>{
      const desired = entries[0].contentRect.width <= 520 ? 4 : 8;
      if (desired !== pageSize) {pageSize=desired;page=Math.floor(selected/pageSize);renderShelves();}
    }).observe(root);
  }
})();
