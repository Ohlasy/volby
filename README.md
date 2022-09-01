# Komunální volby 2022

## Všechno, co potřebujete vědět, než půjdete volit™

Repository obsahuje mikroweb pro komunální volby 2022 na Boskovicku. Účelem webu je poskytnout voličům na jednom místě informace pro jejich rozhodování a podpořit je v rozhodnutí jít volit. K obojímu slouží především videorozhovory s lídry kandidátek a sekundárně též seznam textů, které k těmto volbám vyšly v Ohlasech v předchozích měsících.

Technicky jde o statický web napsaný v [Next.js](https://nextjs.org) a hostovaný na [Vercelu](https://vercel.com/). Data se načítají z [YouTube playlistu](https://www.youtube.com/playlist?list=PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI) (volební videa) a [hlavního webu Ohlasů](https://ohlasy.info) (volební texty).

## Videorozhovory

* Celkem 10 rozhovorů
* 9 lídrů přišlo, za jednoho jsme natočili stručnou „náhradu“
* Data jsou volně dostupná na YouTube v [tomto playlistu](https://www.youtube.com/playlist?list=PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI)
* Po zveřejnění očekáváme minimum změn
* Rozhovory budou relevantní zejména během září až do začátku voleb, pak jejich význam rychle klesne s případnou výjimkou nového starosty / nové starostky

## Volební texty

* Viz jejich seznam v archivu: https://archiv.ohlasy.info/?tag=volby+2022
* Načítají se [přes API](https://ohlasy.info/assets/articles.js), tag `volby 2022`
* Seznam se bude měnit, zejména po volbách naskočí nové texty s výsledky voleb a podobně
* Nemusí být k dispozici v první verzi, stačí během prvního týdne

## Další obsah

### Poděkování sponzorům a týmu

TBD

### Praktické odkazy

* [Jak funguje volební systém](https://ohlasy.info/clanky/2018/09/krizkovani.html)
* [Vlákno na diskuzním fóru](https://forum.ohlasy.info/t/komunalni-a-senatni-volby-2022/498)
* [Přehled kandidátních listin](https://volby.cz/pls/kv2022/kv2211?xjazyk=CZ&xid=1&xv=12&xdz=2&xnumnuts=6201&xobec=581372)
* Seznam volebních místností

### Volební výsledky

TBD

### Dárcovský widget

Projekt má vlastní [dárcovskou výzvu na Darujme.cz](https://ohlasy.info/rozhovory), na kterou upozorňujeme v každém rozhovoru, ale určitě ji chceme promovat i přímo tady na webu, ať už jednodušší formou tlačítka / odkazu, nebo složitější formou darovacího widgetu.

### Debaty senátorů a lídrů

Zřejmě ještě uspořádáme debatu volebních lídrů a debatu senátorských kandidátů (tedy dvě samostatné události). Pokud se podaří pořídit z nich záznam, budeme jej určitě chtít prezentovat tady na webu.

## Časový rozvrh

* Od čtvrtka 1. září budou na YouTube postupně naskakovat finální verze rozhovorů
* V pondělí 5. září spustíme verzi 1, kde musí být aspoň volební videa, zbytek obsahu podle možností
* V týdnu od 5. září vyjdou rozhovory v podcastu Ohlasů, zřejmě najednou
* V pondělí 19. září večer zřejmě proběhne námi pořádaná debata volebních lídrů
* Volby jsou v pátek a sobotu 23. a 24. září, výsledky budou známy v sobotu

Výhledově bude volební mikroweb integrován do hlavního webu Ohlasů, tedy volby.ohlasy.info → ohlasy.info/volby. (Momentálně je samostatný zejména z technických důvodů.)