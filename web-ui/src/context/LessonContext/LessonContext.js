import React, { useContext } from 'react';
import { flatMap } from 'lodash';
import { useSettingsState } from 'positive-store';

const LessonContext = React.createContext();

const content = {
  fi: [
    {
      id: 'positive-education',
      header: 'Mitä on positiivinen kasvatus?',
      description:
        'Positiivisten käyttäytymistieteiden perusasiat tulevat tutuiksi näiden videoiden myötä. Tutkittu tieto ja käytännön esimerkit kohtaavat videoissa.',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'love-of-beauty',
      },
      lessons: [
        {
          id: 'pospedweb1',
          header: 'Positiivinen psykologia',
          description: `Positiivinen psykologia tutkii ihmisen käyttäytymiseen myönteisesti vaikuttavia asioita. Tieteenhaara syntyi tämän vuosisadan alussa täydentämään aiempaa käyttäytymistieteiden kenttää.

Professorit Martin Seligman ja Mihaly Csikszentmihalyi yhdessä työtovereidensa kanssa virittivät keskustelun hyvinvoinnin tekijöiden tutkimisen tarpeellisuudesta pahoinvoinnin tekijöiden ohella. Ihmismieli on taipuvainen keskittymään vaaroihin ja epäonnistumisiin. Tarvitaan siis aktiivista tutkimusta siitä, miten mielen kuntoisuutta voidaan tukea ja mikä johtaa onnellisuuteen.

Nykyään positiivinen psykologia on kattonimi tai yhdistävä tekijä useille eri tutkimuksen aloille, kuten positiiviselle kasvatukselle, positiiviselle lääketieteelle, positiiviselle oikeustieteelle ja positiiviselle johtamiselle. Positiivisen psykologian periaatteiden merkitys ihmisten välisessä vuorovaikutuksessa on kiistaton.`,
          videoUrl: 'https://vimeo.com/447122971/eb79c11b18',
        },
        {
          id: 'pospedweb2',
          header: 'Hyvinvointi lähtökohtana',
          description:
            'Positiivisen psykologian varhaisimpia tutkimuksen kohteita on onnellisuus eli subjektiivinen hyvinvointi. Tieteellisen määritelmän mukaan onnellisuus koostuu kolmesta tekijästä, elämäntyytyväisyydestä sekä positiivisista ja negatiivisista tuntemuksista. Onnellisuuteen ovat yhteydessä mm. itsetunto, ulospäinsuuntautuneisuus, tunne oman elämän hallinnasta, omien luonteenvahvuuksien käyttö ja ennen kaikkea ihmissuhteet. Omaa onnellisuuttaan voi lisätä panostamalla toisiin ihmisiin, harjoittamalla kiitollisuutta ja tekemällä asioita, jotka kokee merkityksellisiksi. Onnellisuus ja hyvinvointi laajemmin ennustavat menestystä opinnoissa, työelämässä, harrastuksissa ja ihmissuhteissa. Onnellisuutta siis pitäisi olla, jotta menestystä tulisi, ei vasta sen seurauksena.',
          videoUrl: 'https://vimeo.com/447126907/27e32017cb',
        },
        {
          id: 'pospedweb3',
          header: 'Kohti positiivista kasvattajuutta',
          description:
            'Keskitytään siihen, mikä toimii. Positiivinen kasvattajuus on ennen kaikkea hyvän huomaamista. Pelkkä virheiden korjaaminen ja ongelmissa auttaminen eivät tuo toivottua lopputulosta. Näin on etenkin silloin, kun oppijalla on monenlaisia haasteita. Keskittyminen pelkästään vaikeuksiin voi johtaa niiden kohtuuttomaan korostumiseen. Tämä taas saattaa heikentää itsetuntoa ja vähentää uskoa omiin kykyihin. Vahvuuksiin tarttuminen ja niiden käytön edistäminen ovat positiivisen kasvatuksen kulmakiviä. Luonteenvahvuuksia kuten sinnikkyyttä, ystävällisyyttä ja rohkeutta ja itsesäätelyä voi ja pitää opettaa. Pitkälti niiden avulla hankitaan muutkin taidot.',
          videoUrl: 'https://vimeo.com/447136813/34dcb92d84',
        },
        {
          id: 'case1',
          header: 'Käytännön esimerkki A',
          description: `Vahvista itsesäätelytaitojaItsesäätelytaito kuuluu ns. voimavahvuuksiin, joiden avulla muutkin vahvuudet ovat opittavissa. Itsesäätely on myös vahvuuksista kaikkein moniulotteisimpia. Itsesäätelyyn luetaan mm. kognitiivinen joustavuus eli taito siirtää tarkkaavaisuutta sujuvasti tehtävästä toiseen. Inhibitio eli ylimääräisten ärsykkeiden torjuminen sekä työmuistin käyttö ovat nekin itsesäätelyn alaisia.

Itsesäätelylle tärkeää on sisäisen puheen oppiminen. Se, että pystyy kertomaan itselleen, mitä tehdä, kun mopo lähtee keulimaan, on puoli voittoa. Tässä videossa Kaisa kertoo oppilaastaan, joka sisäisen puheen avulla oppi säätämään innokkuuttaan sopivalle tasolle ja käyttämään sitä yhä useammin oikeissa paikoissa.`,
          videoUrl: 'https://vimeo.com/447156029/094ca085d7',
        },
        {
          id: 'case2',
          header: 'Käytännön esimerkki B',
          description: `Kun haastavaa käyttäytymistä yritetään vähentää, kieltojen ja rangaistusten asettaminen toimii usein vain hetken, jos sitäkään. Ei-toivotun toiminnan tilalle on opetettava tapa toimia oikein. Silloin on jotain, josta voi myös kiittää.

Tässä videossa Lotta muistelee, miten hautasi oppilaansa kanssa kirosanoja koulun pihalle kaivettuun kuoppaan. Miten rumat sanat pysyivät kuopassa?`,
          videoUrl: 'https://vimeo.com/447150323/a891a4f940',
        },
      ],
    },
    {
      id: 'positive-methodology',
      header: 'Vahvuusvariksen käsimalli kouluun',
      description: 'Positiivisen kasvatuksen ydinasiat kouluympäristöön soveltuen',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'joy',
        width: '113px',
        right: '10px',
        bottom: '10px',
      },
      lessons: [
        {
          id: '5_principles',
          header: 'Positiivisen kasvatuksen viisi ydinasiaa',
          description: `Hyvinvoinnin käsimallin avulla positiivisen kasvatuksen ydinasiat on helppo muistaa.
Peukalo: anna positiivista palautetta eli peukuta!
Etusormi: puhu vahvuuksista
Keskisormi: opeta käyttämään vahvuuksia
Nimetön: edistä yhteenkuuluvuutta, rakenna laumaa
Pikkusormi: näytä esimerkkiä eli walk the talk.`,
          videoUrl: 'https://vimeo.com/447163440/a794604e15',
        },
        {
          id: 'feedback',
          header: 'Positiivinen palaute',
          description: `Jokaisella oppilaalla on tarve onnistua! Hyvä lapsessa ja nuoressa pitää huomata ja sanoa ääneen. Aikuiselta tuleva positiivinen palaute ja välittäminen ovat ensiarvoisen tärkeitä juttuja oppimisen, myönteisen minäkuvan, identiteetin muodostamisen ja hyvinvoinnin kannalta!
Kiinnitä huomiota edistymiseen ja anna positiivista palautetta, joka tukee itsetuntoa ja johtaa myönteisiin tunnekokemuksiin! Muista, että tehokkainta positiivisen palautteen antaminen on oppimisen aikana, jolloin oppilaalla on mahdollisuus toimia palautteen suunnassa. Palaute on välittämistä ja positiivinen palaute kohottaa mielialaa! Ja toisinpäin, palautteen puute tekee näkymättömäksi ja saa aikaan arvottomuuden kokemuksen.`,
          videoUrl: 'https://vimeo.com/447161394/49b611141b',
        },
        {
          id: 'strengths_language',
          header: 'Vahvuuspuhe',
          description: `Käytä vahvuussanoja, kun annat palautetta, tsemppaat oppilaita toimintaan tai kuvaat omaa toimintaasi. Voi tehdä itsellesi vahvuussanoista muistilistan ja käyttää sitä opetuksen tukena. Vahvuuspuhe auttaa oppilaita ymmärtämään tarkemmin oppimisen kohteen tai tietyn taidon, jota on hyvä harjoitella lisää tai toisaalta, joka on jo hyvin hallussa. Vahvuuspuhe konkretisoi vahvuuksien käytön ja jättää vahvan muistijäljen, jolloin oppilaat voivat ottaa vahvuussanat pienin askelin myös osaksi omaa ajattelua, sisäistä puhetta ja oman toiminnan ohjaamista.`,
          videoUrl: 'https://vimeo.com/447165257/b85fdef7be',
        },
        {
          id: 'use_strengths',
          header: 'Vahvuuksien käyttö',
          description: `Kun olet tunnistanut oppilaiden kanssa heidän vahvuuksiaan,
1. suunnittele oppitunteja ja muuta toimintaa niin, että jokainen oppilas voi yhä useammin käyttää vahvuuksiaan omaksi ja erityisesti toisten hyväksi. Tämä lisää tunnetta omasta pätevyydestä! Lisäksi oppilaat saavat todellisia kokemuksia omien vahvuuksien käyttämisestä, ei vain niiden tietämisestä.
2. anna oppilaille mahdollisuus miettiä, millaisissa tilanteissa ja kenen kanssa heidän vahvuudet ovat parhaiten käytössä ja anna heille tilaa toimia. Pyydä oppilaita reflektoimaan tilanteita ja miettimään, miten omat vahvuudet olivat “käytössä” ja miltä se tuntui! Synnyttäkää yhdessä hyvintoimisen hyväntahtoista vahvuuskultuuria, jossa jokainen onnistuu!`,
          videoUrl: 'https://vimeo.com/447169347/eff0362b84',
        },
        {
          id: 'relationships',
          header: 'Yhteenkuuluvuus',
          description: `Hyvinvointia rakennetaan yhdessä joka koulupäivä! Omaan ryhmään kuuluminen ja yhteisöllisyys ovat jokaiselle oppilaalle ensiarvoisen tärkeää! Oppilaan tulee saada tuntea, että hän on tärkeä osa omaa laumaa ja tervetullut siihen! Tämän lisäksi omassa laumassa tulee saada tuntea psykologista turvaa, jolloin ei tarvitse pelätä virheitä tai nolatuksi tulemista.Oppilaiden kouluviihtyvyyttä selittää erityisesti ilo hyvistä ihmissuhteista.
Tue ryhmäsi yhteenkuuluvuuden ja hyväksynnän tunteita joka päivä opettamalla sosio-emotionaalisia taitoja ja antamalla oppilaille mahdollisuuksia monipuoliseen vuorovaikutukseen.`,
          videoUrl: 'https://vimeo.com/447170300/b828926b7b',
        },
        {
          id: 'walk_the_talk',
          header: 'Esimerkin voima',
          description: `Oppilaat saattavat unohtaa, mitä heille opetit, mutta he eivät koskaan unohda, mitä sait heidät tuntemaan! Opettajan lämmin ja positiivinen kohtaaminen motivoi oppilaita työskentelemään ja sitouttaa heidät tunnin aiheeseen sekä vähentää häiriökäyttäytymisen määrää. Oma esimerkkisi läsnäolevasta, innostuneesta ja aidosti välittävästä toiminnasta on paljon tärkeämpää kuin se, mitä oppimateriaalia tai opetusmenetelmää käytät!`,
          videoUrl: 'https://vimeo.com/447171181/b4a8b93e80',
        },
      ],
    },
    {
      id: 'positive-tips',
      header: 'Vahvuusvariksen käsimalli varhaiskasvatukseen',
      description: 'Positiivisen kasvatuksen ydinasiat varhaiskasvatusympäristöön soveltuen',
      illustration: {
        backgroundColor: 'gold',
        circleColor: 'green',
        slug: 'joy',
        width: '113px',
        right: '10px',
        bottom: '10px',
      },
      lessons: [
        {
          id: 'preschool_hand_start',
          header: 'Vahvuuskasvatuksen intro',
          description: `Hyvinvoinnin käsimallin avulla positiivisen kasvatuksen ydinasiat on helppo muistaa.
Peukalo: anna positiivista palautetta eli peukuta!
Etusormi: puhu vahvuuksista
Keskisormi: opeta käyttämään vahvuuksia
Nimetön: edistä yhteenkuuluvuutta, rakenna laumaa
Pikkusormi: näytä esimerkkiä eli walk the talk.`,
          videoUrl: 'https://vimeo.com/447827787/03fb0d73e7',
        },
        {
          id: 'peukalo-vaka',
          header: 'Anna positiivista palautetta eli peukuta',
          description: `Jokainen lapsi haluaa oppia, tulla toimeen ryhmässään ja saada kavereita. Onnistumiselle tulee luoda puitteet antamalla lapselle hänen taitotasoaan vastaavia tehtäviä ja mahdollisuuksia opetella vuorovaikutustaitoja turvallisessa ympäristössä. Kasvattajan tehtävä on varmistaa, että jokainen lapsi saa onnistumisen kokemuksia ja riittävää kannustavaa palautetta niistä.
Lapsen itsetunto ja luottamus omaan pätevyyteen vahvistuvat johdonmukaisista ja todellisiin havaintoihin perustuvista palautteenannoista. Ne voivat kohdistua hyvinkin pieniin asioihin, ja oppimisprosessien ja -tulosten lisäksi lukuisiin muihin taitoihin. Esimerkiksi: "Kiitos, kun autoit Jania tänään leikissä. Se, mitä teit, oli mielestäni rohkeaa ja osoitus siitä, että sinä välität toisista." Myönteinen palaute motivoi jatkamaan ja ponnistelemaan, yrittämään yhä uudelleen omaa osaamisen tasoa venyttäen.
Positiivista palautetta saa antaa kukkuramitalla. Elämä kyllä tasaa ylimääräiset.
Kiinnitä huomiota yrittämiseen, pieneenkin edistymiseen, välillä jopa vain aloittamiseen. Kannustuksen on osuttava toivottuun käytökseen eikä ei-toivotusta käytöksestä kuulu palkita. Palaute on näkyväksi tekemistä ja välittämistä, palautteen puute taas on näkymättömäksi tekemistä ja yhteydessä arvottomuuden kokemuksen. Kun ryhmässä on monenlaisia lapsia, positiivisen palautteenannonkin on kohdistuttava monenlaisiin onnistumisiin. Älä pihtaa peukutuksessa! Myös aikuisille positiivinen palaute on mielensähyvittämisen parasta polttoainetta.`,
          videoUrl: 'https://vimeo.com/447822034/174f8f9ca0',
        },
        {
          id: 'preschool_talk_strengths',
          header: 'Käytä vahvuussanoja',
          description: `Voimme puhua vain siitä, mistä tiedämme jotain. Kieli muokkaa ajatteluamme ja huomiomme kohteita. Kun luonteenvahvuuspuheesta tulee tuttua, se voi muuttua eläväksi, jatkuvasti kuultavaksi käyttökieleksi. Jos toivot ryhmääsi lisää työrauhaa, opeta, mitä itsesäätely ja sinnikkyys tarkoittavat, ja mikä niiden merkitys on jokaisen omalle itsenäiselle toiminnalle ja koko ryhmän hyvälle yhteistyölle. On myös tärkeää, että lapsi tietää onnistumisensa johtuneen vaikkapa peräänantamattomuudesta ja rohkeudesta, ei sattumankaupasta tai taikaiskusta. Ja että hän itse omalla sinnikkäällä toiminnallaan saavutti onnistumisen tai uuden taidon.
Käytä vahvuussanoja, kun annat palautetta, tsemppaat lapsia toimintaan tai kuvaat omaa toimintaasi. Voit tehdä itsellesi vahvuussanoista muistilistan ("nyt havaitsin sinnikkyyttä, nyt myötätuntoa, nyt luovuutta") ja käyttää sitä opetuksen tukena. Vahvuuspuhe auttaa lapsia ymmärtämään tarkemmin, miten jokin oppimisen kohde voidaan saavuttaa. Hän saa työkaluja, joiden avulla rakentaa omaa osaamistaan ja positiivista minäpuhetta. Esimerkiksi, "nyt tarvitsen näkökulmanottokykyä, jotta tiedän, mistä aloitan tehtävän ja mikä tehtävässä on tärkeintä". Tai "mitä rohkeus tekisi tässä tilanteessa?"
Peukuta kun kuulet lapsen käyttävän vahvuuskieltä! Puhu vahvuuskielellä myös lapsen huoltajille ja auta heitä mukaan rikkaamaan ja positiivisen vahvuuspuheen äärelle.`,
          videoUrl: 'https://vimeo.com/447823663/5ec6962777',
        },
        {
          id: 'keskisormi-vaka',
          header: 'Rakenna tilaisuuksia käyttää vahvuuksia',
          description: `Vahvuuksista puhuminen on tärkeää, jotta tunnemme mielemme työkalut. Pelkkä "vasarasta" puhuminen ei tietenkään riitä, vaan kunkin työkalun käyttöä on harjoiteltava ja siihen on luotava lukuisia mahdollisuuksia. Suunnittele varhaiskasvatuksen viikko-ohjelmaan ja yksittäisiin päiviin tilanteita, joissa jokainen lapsi voi käyttää omia vahvuuksiaan ja tunnistaa kiinnostuksen kohteitaan. On myös hyödyllistä vaihdella oppimisympäristöjä, jotta taitojen harjoittelulle löytyisi uusia paikkoja. Esimerkiksi pihaleikit, metsäretket ja ruokailutilanteet tarjoavat lukuisia mahdollisuuksia soveltaa jo orastavasti opittuja vahvuustaitoja. Anna vahvuuksien myös tukea toinen toisiaan erilaisissa tehtävissä. Esimerkiksi työ, jota toteuttaa innokas ja luova lapsi parinaan näkökulmanottokykyinen ja harkitsevainen toverinsa, saattaa kohota aivan uudelle tasolle. Ja samalla on mahdollisuus harjoitella ryhmätyötaitoja. Esimerkiksi ongelmanratkaisutehtävää aloitettaessa on hyödyllistä pohtia, mitkä ovat ratkaisemisen avainvahvuudet (harkitsevuus, sinnikkyys, rohkeus, luovuus…).
Kun lapsi pääsee käyttämään vahvuuksiensa koko palettia omaksi ja muiden hyväksi, onnistumisiin on hyvät mahdollisuudet monenlaisilla oppijoilla. Oleellista on, että kaikki saavat todellisia kokemuksia omien vahvuuksiensa käytöstä, ei pelkkää tietoa niiden olemassaolosta. Konkreettiset onnistumiset lisäävät pätevyydentuntoa, joka taas rakentaa hyvinvoinnin kivijalkaa.
Anna lapsille heidän ikäänsä sopivalla tavalla mahdollisuus miettiä, millaisissa tilanteissa ja kenen kanssa heidän vahvuutensa ovat parhaiten käytössä. Anna heille tilaa toimia itsenäisesti ja osallistua toiminnan suunnitteluun. Pyydä lapsia reflektoimaan tilanteita ja onnistunutta vahvuustoimintaa yksin ja isommassa porukassa. "Mikä meni hyvin vahvuuksien käytössä?", on hyvä aloituskysymys jokapäiväiselle palautehetkelle. Voit myös jatkaa kysymällä: "Missä onnistuimme tänään yhdessä?" ja pyytää lasta sanoittamaan hyviä hetkiä kotiinlähtötilanteessa vanhemmille vahvuuskielellä.`,
          videoUrl: 'https://vimeo.com/447825044/71f131533f',
        },
        {
          id: 'preschool_social_connectedness',
          header: 'Vahvista ryhmätyötaitoja',
          description: `Nimetön eli sormussormi kuvastaa yhteenkuuluvuutta ja -liittymistä. Hyvinvointia rakennetaan yhdessä joka päiväkotipäivä. Hyvinvoinnin ja onnellisuuden perimmäinen tekijä on tunne yhteenkuuluvuudesta ja siitä, että kelpaa omana itsenään ja saa kokea merkityksellisyyttä. Oma turvallinen ryhmä ja mahdollisuus jakaa siinä asioita ilman pelkoa esimerkiksi nolatuksi tulemisesta ovat jokaiselle lapselle ensiarvoisen tärkeitä, päiväkotiviihtyvyyttä eniten selittäviä tekijöitä. Ryhmän ulkopuolelle jääminen alentaa mielialaa, lisää pahantahtoisia ajatuksia ja voi aiheuttaa fyysiseen kipuun verrattavissa olevaa sosiaalista kipua.
Tue ryhmäsi yhteenkuuluvuuden ja hyväksynnän tunteita, kykyä ottaa osaa vuoropuheluun ja leikkiin opettamalla sosiaalisiin taitoihin liittyviä vahvuuksia kuten ystävällisyyttä, johtajuutta, myötätuntoa ja anteeksiantoa. Vahvat sosioemotionaaliset taidot kehittyvät vain vuoropuhelussa ympäristön kanssa. Myönteinen sosioemotionaalinen kehitys edistää lasten fyysistä ja henkistä terveyttä ja on käänteisesti yhteydessä käyttäytymisen ja sopeutumisen haasteisiin. Nämä taidot rakentavat vankkaa pohjaa elinikäiselle oppimiselle.
Kun lapset tuntevat toistensa vahvuudet ja oppivat katsomaan toisiaan positiivisten lasien läpi, heidän on myös helpompi tykätä toisistaan ja löytää arvostettavia piirteitä ihan jokaisesta ryhmän jäsenestä. Välittämisen osoittaminen helpottuu ja lisää hyvää mieltä, joka kannattelee läpi päivän touhujen. Liian usein päiväkotitoverit näkevät toisistaan vain yhden, "päiväkotipuolen", eivät kokonaisuutta. Monet yhteiset kiinnostuksen kohteet ja tykkäämiset saattavat jäädä huomaamatta. Monipuolinen tunteminen ja uudelleen katsominen ensivaikutelmien ja mahdollisten ennakkoluulojen taakse luovat mahdollisuuden molemminpuoliselle kunnioitukselle.
Luo tilaisuuksia harjoitella monenlaisia vuorovaikutustilanteita ja opeta positiivista palautteenantoa. Tätä tarkoitusta varten olemme kehittäneet erityisen kehukehyksen, treenipaikan kertoa myönteisiä asioita toiselle (ks. positive.fi). Kehukehys on harjoitusmolski, jonka sisällä otetaan vastaan myönteistä vyörytystä ilman mahdollisuutta panna vastaan. Myönteisten asioiden puhuminen toisista ja jokaisen hyvien puolien korostaminen on opeteltava asia. Samoin kehujen vastaanottaminen, "kiitos kun sanoit noin".`,
          videoUrl: 'https://vimeo.com/447826039/8aa00c77bf',
        },
        {
          id: 'preschool_walkthetalk',
          header: 'Näytä esimerkkiä',
          description: `Lapset saattavat unohtaa, mitä heille opetit, mutta he eivät hevin unohda, mitä sait heidät tuntemaan. Opettajan lämmin ja positiivinen kohtaaminen motivoi lapsia työskentelemään, sitouttaa heidät päivän toimintaan ja vähentää häiriökäyttäytymistä. Oma esimerkkisi läsnäolevasta, innostuneesta ja aidosti välittävästä toiminnasta on tärkeämpää kuin oppimateriaalin tai pedagogisen menetelmän valinta.
Opettajan kannattaa kysyä itseltään: "Mitä tulee paikalle, kun minä tulen paikalle?”. Miten omalla toiminnallani varmistan, että ryhmän henkiset seinät ovat vahvat ja vastaanottavat. Oman asenteen kanssa työskentely on lähtökohta, samoin se, miten toimii kollegan kanssa ja miten aikuisten välinen vuorovaikutus näytetään lapsille.
Opettajan oma toiminta jokaisen lapsen havaitsemiseksi myönteisesti ja jokaisen lapsen varhaiskasvatuspolun rakentamiseksi vahvuuksien varaan on lähtökohta minkä tahansa päiväkotiryhmän luotsaamiselle. Opettajalla on myös lyömätön paikka osallistaa muita aikuisia, lapsen ikätovereita ja erityisesti huoltajat suuntaamaan huomionsa lapsen voimavaroihin ja vahvuuksiin. Kun lapsi ja ryhmä saa monelta taholta positiivista palautetta, sitä on vaikea ravistaa pois. Kollektiivinen välittäminen alkaa jokaisen ryhmän aikuisen sitoutumisesta aktiiviseen hyvän huomaamisen jokaisessa lapsessa. Pienet päivittäiset plus-merkkiset teot rakentavat kestävää positiivista pohjavirettä.
Myönteinen havaitseminen syntyy niistä tulkinnoista, joita teemme lasten aloitteista ja toiminnasta eri ympäristöissä. Se mihin kiinnitämme huomiomme, vahvistuu ja ohjaa toimintaamme jatkossakin. Onnistumisten dokumentointi on sitä tärkeämpää, mitä enemmän lapsella on haasteita opinpolussaan, kehityksessään ja kasvussaan. Jokaista lasta kannustaa oman monipuolisen osaamisen esiin tuominen ja pysyvä taltiointi. Tätä tarkoitusta varten olemme kehittäneet Positiven digissä Huomaa hyvä! -työkalun (positive.fi).`,
          videoUrl: 'https://vimeo.com/447826840/bc8a6a33ae',
        },
      ],
    },
    {
      id: 'positive-example',
      header: 'Esimerkki positiivisesta päivästä',
      description:
        'Näin toteutat positiivista kasvatusta työssäsi. Esimerkki toiminnasta yhtenä arkipäivänä.',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'curiosity',
      },
      lessons: [
        {
          id: 'signature_strengths',
          header: 'Positiivinen päivä ja voimavahvuksien opettaminen',
          description: `Videosarjassa esitellään tapoja, joiden avulla voit rakentaa positiivisen päivän. Kaisa puhuu esimerkeissä voimavahvuuksista eli sinnikkyydestä, itsesäätelystä ja ystävällisyydestä. Sinnikkyys auttaa ponnistelemaan tavoitteiden suunnassa. Itsesäätely auttaa tarkkaavuuden suuntaamisessa, tunteiden säätelyssä ja käyttämisen ohjaamisessa. Ystävällisyys liittyy ryhmässä toimimiseen, toisten huomioimiseen ja mukavaan olemiseen toisten kanssa.`,
          videoUrl: 'https://vimeo.com/447786365/3609dbe69c',
        },
        {
          id: 'leadtheway',
          header: 'Viitoita suunta päivälle',
          description:
            'Aloita päivä viitoittamalla suunta ryhmässä tapahtuvalle toiminnalle. Kaikki tekeminen toteuttaa ja harjoittaa vahvuutta, jota haluatte edistää. Käytä halutessasi vahvuuskortteja tai Positiven digiä. Niiden avulla yhteinen tavoitteenne kirkastuu ja siitä on helppo innostua. On tärkeää, että oppilaat ymmärtävät, mitä heiltä odotetaan. Harjoitelkaa voimavahvuuksia (sinnikkyys, itsesäätely ja ystävällisyys) läpi vuoden, ihan jokaisena päivänä, vaikka samalla opettelisitte muidenkin vahvuuksien käyttöä.',
          videoUrl: 'https://vimeo.com/447786769/8919239ca8',
        },
        {
          id: 'concrete_steps',
          header: 'Konkretisoi ja aloita pienin askelin',
          description:
            'Vahvuuden harjoittelu pilkotaan osiin, jotta siitä tulee helppoa ja konkreettista. Esim. rohkeuden harjoittelu voi alkaa siitä, että opetellaan katsomaan toista silmiin. Pienet teot ja onnistumiset pohjustavat polkua vahvuustaidon kasvuun ja vahvuuden käytön monipuolistumiseen. Kysy lapsilta, mistä he huomaavat vahvuuden ”käytön”. Pyydä heitä kertomaan muutama esimerkki siitä, mitä voi nähdä tapahtuvan, kun toimitaan vahvuuksien avulla. Voitte valita lasten vahvuusharjoittelua ja toivottua käytöstä tukevia toimintoja Positiven Digistä tai keksiä niitä itse.',
          videoUrl: 'https://vimeo.com/447787213/6908a65123',
        },
        {
          id: 'enhance_behaviour',
          header: 'Vahvista toivottua käytöstä',
          description:
            'Vahvista positiivista ja toivottua käytöstä peukuttamalla, antamalla suoraa, konkreettista palautetta, hymyilemällä ja luomalla ryhmään myönteinen tunneilmasto. Käytä vahvuussanoja monipuolisesti. Tallenna hetkiä Positiven digin Huomaa hyvä! -työkalun avulla. Positiven digi toimii taulu-, tabletti- ja kännymuodoissa. Se tekee onnistumisen hetket näkyviksi kaikille ja säilöö ne muistiin.',
          videoUrl: 'https://vimeo.com/447788178/a674f8e567',
        },
        {
          id: 'create_structure',
          header: 'Luo rakenteet hyvän huomaamiselle',
          description:
            'Pyydä lapsia huomaamaan positiivisia, yhteisen tavoitteen suuntaisia tekoja ja käytöstä ja erityisesti itse kertomaan niistä ääneen koko ryhmälle. Käytä apuna vahvuuskortteja tai Positiven digiä, johon lapset voivat itse tulla tallentamaan näyttöjä omien ja toisten vahvuuksien käytöstä.',
          videoUrl: 'https://vimeo.com/447788900/3b3e96a216',
        },
        {
          id: 'memorize_successes',
          header: 'Palatkaa onnistumisiin',
          description: `Päivän lopussa pyydä lapsia miettimään, mikä meni hyvin? Missä he onnistuivat yhdessä? Pyydä heitä nimeämään onnistumisessa auttaneita vahvuuksia. Katsokaa Positiven digistä, kuinka monta kertaa tavoitteen suuntaa vahvistavia vahvuuksia on käytetty, yksilötasolla mutta ennen kaikkea ryhmässä.
Palatkaa viikottain hyvien hetkien äärelle muistelemalla onnistumisia Positiven digin Huomaa hyvä- työkalun avulla. Liikkukaa kolmessa eri aikaikkunassa. Muistelkaa onnistumisia ja vaikeista hetkistä oppimista, keskittykää nykyhetkeen ja käsillä oleviin taitoihin, mutta suunnatkaa myös katsetta kohti tulevaa, jossa odottaa palkinto hyvin tehdystä harjoittelusta ja uusista opituista taidoista.`,
          videoUrl: 'https://vimeo.com/447790193/46c0bea87a',
        },
        {
          id: 'visual_cues',
          header: 'Lisää kuvallisia vihjeitä näkyville',
          description:
            'Uusia vahvuustaitoja rakennetaan joka päivä yhä uudelleen vinkkien, kuvien, muistuttaminen, kertaamisen, visuaalisten vihjeiden, tietoisen toiminnan, positiivisen minäpuheen ja aikuisen palautteen avulla.',
          videoUrl: 'https://vimeo.com/447791824/93d6a4cdea',
        },
      ],
    },
    {
      id: 'digital-tutorials',
      header: 'Oppaat sähköisen palvelun käyttöön',
      description:
        'Ohjevideoiden avulla tutustut palvelun käyttöön ja toiminnallisuuksiin käytännön esimerkkien avulla.',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'spot-card',
        width: '250px',
        right: '-58px',
        bottom: '-2px',
      },
      lessons: [
        {
          id: 'how_to_use_teach',
          header: 'Opeta-osuuden käyttötapoja',
          description: `Opeta-osuus tulee tutuksi, kun Lotta ja Pasi käyvät pedagogista keskustelua materiaalin käyttämisestä. Samalla tulevat tutuksi myös eri toiminnallisuudet.

Videon esimerkit on kohdistettu koululle, mutta samat toiminnallisuudet ovat käytössä myös esikouluille.`,
          videoUrl: 'https://vimeo.com/460526745',
        },
        {
          id: 'how_to_use_see_the_good',
          header: 'Huomaa hyvä! digitaalisesti',
          description:
            'Hyvän huomaaminen on tärkeä positiivisen kasvatuksen kulmakivi. Videolla Lotta ja Pasi esittelevät miten sen voi tehdä sähköisesti. Esimerkit palvelusta näytetään mobiilinäkymästä, mutta samat toiminallisuudet on käytössä myös pöytäkoneilla.',
          videoUrl: 'https://vimeo.com/460467687',
        },
        {
          id: 'step_by_step_see_the_good',
          header: 'Vaihe vaiheelta: Huomaa hyvä!',
          description:
            'Huomaa hyvä! -toiminnon käyttö esitellään vaihe vaiheelta kahdessa minuutissa. Itse huomaamisen jälkeen hetken tallentaminen myös kuvan ja tekstin kanssa onnistuu nopeiten mobiililaitteella.',
          videoUrl: 'https://vimeo.com/465424460',
        },
        {
          id: 'positive_to_homescreen_ios',
          header: 'Positive kännykän kotivalikkoon (iOS)',
          description: `Sähköinen palvelumme ei vaadi asentamista koneille tai mobiililaitteisiin, sillä palvelu toimii selaimilla. Tällä videolla näytetään, miten lisäät nopean pääsyn palveluumme suoraan kotinäytöltä. Esimerkkinä käytetään iPhone-puhelinta, mutta lisääminen onnistuu myös Android-puhelimille.

Tässä pikaohjeet Android-käyttäjille:
1. Avaa Chrome
2. Avaa go.positive.fi
3. Avaa Chromen valikko oikeasta yläreunasta.
4. Valitse Lisää aloitusnäyttöön`,
          videoUrl: 'https://vimeo.com/465752663',
        },
      ],
    },
  ],
  en: [
    {
      id: 'positive-education',
      header: 'What is positive education?',
      description:
        'The basics of positive education with a lot of practical tips to be implemented in your teaching and daily interaction with the students. ',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'love-of-beauty',
      },
      lessons: [
        {
          id: 'sel',
          header: 'Social end emotional skills',
          description:
            'What are the social and emotional skills that build the foundation for well-being and better learning?',
          videoUrl: 'https://vimeo.com/432648639/6781cfe515',
        },
        {
          id: 'strengths',
          header: 'Character strengths',
          description: 'What are character strengths and virtues?',
          videoUrl: 'https://vimeo.com/433645214/65dceae7d7',
        },
        {
          id: 'wellbeing',
          header: 'Well-being and learning',
          description: 'Why and how well-being and learning go hand in hand?',
          videoUrl: 'https://vimeo.com/433960773/0f7909da47',
        },
        {
          id: 'schoollevel',
          header: 'Positive method at whole school level',
          description:
            'How to implement the principles of positive education on the whole school level?',
          videoUrl: 'https://vimeo.com/435723222/67efd894b2',
        },
        {
          id: 'positivecv',
          header: 'Positive CV',
          description:
            'With Positive CV students are able to document and learn about their strengths and versatile skills.',
          videoUrl: 'https://vimeo.com/435722737/db971c8393',
        },
        {
          id: 'families',
          header: 'Guidance for families',
          description: 'WHow to promote the learning of character strengths at home?',
          videoUrl: 'https://vimeo.com/435722934/c9eae6cb28',
        },
      ],
    },
    {
      id: 'positive-methodology',
      header: "Crow's hand model of positive education",
      description:
        'The handmodel of well-being includes the five most important steps towards positive education. With the handmodel it is easy to create a structure that guides you to implement the positive method in your teaching. ',
      illustration: {
        backgroundColor: 'green',
        circleColor: 'gold',
        slug: 'joy',
        width: '113px',
        right: '10px',
        bottom: '10px',
      },
      lessons: [
        {
          id: '5_principles',
          header: 'Intro',
          description: `The hand model of well-being makes it easy to remember the core issues of positive education.
Thumb: give positive feedback, thumbs up!
Index finger: talk about strengths
Middle finger: learn to use strengths
Ring finger: promote cohesion, build a herd
Pinky: show an example or walk the talk.`,
          videoUrl: 'https://vimeo.com/447182861/a2fb5b2979',
        },
        {
          id: 'feedback',
          header: 'Positive Feedback',
          description: `Every student feels the need to succeed. The good in a child or adolescent needs to be noticed and said aloud. The positive feedback coming from adults is crucial to learning, well-being, building a positive self-image and forming identity.
Pay attention to progress and give encouraging feedback that supports self-esteem, and leads to positive emotional experiences. Remember, that the most effective way to give positive feedback is during the learning process, as it gives the student an opportunity to act in the direction of the feedback. Giving feedback means caring, and positive feedback boosts your mood. Conversely, lack of feedback makes you feel invisible and worthless.`,
          videoUrl: 'https://vimeo.com/447183366/f90de635f2',
        },
        {
          id: 'strengths_language',
          header: 'Strengths Language',
          description: `Use strength vocabulary when you give feedback, encourage your students to engage in activities, or describe your own actions. You can make a list of strength words for yourself to act as a support for teaching. Strength language helps students to better understand a particular skill that needs more practising, and also the ones that are already well mastered. Strength speech makes the use of strengths concrete and leaves a strong memory trace, which allows the students to incorporate it in small steps to their own thinking, inner speech and cognitive control.`,
          videoUrl: 'https://vimeo.com/447183757/1821ccc71c',
        },
        {
          id: 'use_strengths',
          header: 'Use of Strengths',
          description: `Once you have identified strengths with the students,
1. plan lessons and other activities so that each student can increasingly use their strengths for their own benefit, and especially for the benefit of others.This increases their sense of self-competence. In addition, students get real experiences of actually using their strengths, not just knowing them.
2. give students an opportunity to think in which situations and with whom their strengths are best at use, and give them room to act. Ask students to reflect back on these situations and consider, how their strengths were ‘at use’ and what it felt like. Together, create a strength culture where everyone acts for the common good, all actions are directed by goodwill, and where everyone can succeed.`,
          videoUrl: 'https://vimeo.com/447184194/5268df690d',
        },
        {
          id: 'relationships',
          header: 'Social Relationships',
          description: `At school, well-being is built together every day. Sense of belonging to a group and to a community is crucially important to every student. Everyone needs to feel they are an important part of the group and welcome to join. In addition to that, one must feel psychological safety in their own group in order not to have to worry about making mistakes or being embarrased by others.
Support your group’s sense of belonging and approval every day by teaching them socio-emotional skills, and by giving them opportunities for rich interaction.`,
          videoUrl: 'https://vimeo.com/447184534/c888dbd475',
        },
        {
          id: 'walk_the_talk',
          header: 'Walk the talk',
          description: `Students may forget what you taught them, but they will never forget what you made them feel. The teacher’s ability and willingness to meet the students in a warm and positive way engage them better in the topic of the lesson, motivates them to work harder, and reduce the amount of disruptive behaviour in class. Your own example of being genuinely present, enthusiastic and caring is far more important than the teaching material or method you use.`,
          videoUrl: 'https://vimeo.com/447184953/037dc75fd8',
        },
      ],
    },
  ],
};

const LessonProvider = props => {
  const { language } = useSettingsState();
  const categories = content[language];

  const getCategory = categoryId => categories.find(category => category.id === categoryId);

  const getLesson = lessonId =>
    flatMap(categories, category => category.lessons).find(lesson => lesson.id === lessonId);

  return (
    <LessonContext.Provider value={{ categories, getCategory, getLesson }}>
      {props.children}
    </LessonContext.Provider>
  );
};

const useLessons = () => useContext(LessonContext);

export { LessonContext, LessonProvider, useLessons };
