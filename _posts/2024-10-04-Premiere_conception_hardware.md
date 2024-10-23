---
title: Duckpi - Première conception hardware
date: 2024-10-23 22:15:00 +0200
categories: [DuckPi, Réalisation, Hardware]
tags: [duckpi,projet ,marylab , hardware, pcb, schématique]
---

## Les mains dans le cambouis
Teaser un projet c'est beau, le réaliser ça serait encore mieux !

Alors nous y sommes, accrochez-vous pour le détail de la conception hardware de cette **première** itération du DuckPi.

Un programme en **trois grandes parties** :

1) Conception et assemblage

- Définition de mon "*cahier des charges*"
- Recherches à propos du RP2040
- Choix des composants et conception du schéma électronique
- BOM du projet
- Dimensions du PCB
- Placement des composants et routage du PCB
- Assemblage et brasure (en vidéo !)

2) Premiers tests

- Alimentation
- Premier test de programmation embarquée
- Test de l'application désirée

3) Corrections à apporter pour une seconde itération ?

- Modification du schéma électronique
- Modification du routage

C'est parti pour un article qui rentre dans les détails techniques de ce projet !

## Conception et assemblage du DuckPi
Parlons de la conception du DuckPi dans un premier temps (il faut bien commencer par quelque part !).
### Définition de mon "*cahier des charges*"
Comme j'avais pu l'expliquer dans le précédent post, je savais au préalable que j'allais devoir travailler avec le microcontrôleur de la Raspberry Pi Foundation, le RP2040. Comme beaucoup de circuits intégrés, un bon nombre de composants passifs, voire même actifs, sont nécessaires au bon fonctionnement de celui-ci. Ces éléments seront détaillés par la suite lors de la vraie conception hardware.

Je me suis d'abord posé la question de ce que je voulais voir une fois l'objet en main : 

- Un PCB miniature qui tient dans un casing en plastique de clé USB standard
- Des indications claires sur le PCB pour que tous les curieux puissent le manipuler facilement

Et en rentrant un peu plus dans le détail : 

- Un port USB Type A mâle, comme sur une vraie clé USB, permettant de téléverser le code sur le DuckPi mais aussi de l'exécuter sur un PC
- Un bouton Reset ainsi qu'un bouton Boot, comme on peut les retrouver sur la board de développement officielle de Rapsberry (le Raspberry Pico)
- Une LED située sur la partie supérieure du PCB qui offrirait une double fonctionnalité : témoigner de la mise sous tension ou agir exactement comme la LED présente sur le Raspberry Pico (souvent définie comme la "on board LED")
- Un système de sélecteur, permettant d'utiliser des fonctionnalités proposées dans le projet software, comme le fait de stopper l'injection ou de dissimuler la connexion USB

À part cela, je n'avais pas d'autres restrictions/volontés en tête : je savais pertinemment que je n'allais pas pouvoir ajouter des fonctionnalités à l'infini à cause de la dimension imposée de PCB ! 


### Recherches à propos du RP2040
Pour réaliser un projet autour d'un microcontrôleur que vous ne connaissez pas, il n'y a pas 15 solutions, il y a bien un moment où vous allez devoir lire un peu de documentation (du moins, si vous voulez bien faire les choses). En une simple recherche, je suis tombé sur la datasheet du RP2040 : 644 pages de pur bonheur. Tout y est, évidemment. Tout ce qui vous intéresse, et surtout ce qui vous intéresse un peu moins.

Je suis alors tombé sur un document également officiel, fourni par Raspberry : "*Hardware design with RP2040, Using RP2040 microcontrollers to build boards and products*". Figurez-vous que c'est exactement ce que je recherchais ! Chez d'autres fabricants, on peut retrouver des "applications notes" pour comprendre comment intégrer le composant, ou quelques indications sont fournies perdues au milieu d'une datasheet. Raspberry a, à mon sens, compris que les makers n'étaient peut-être pas des ingénieurs expérimentés, et propose un document explicatif de 37 pages clés en main, pour aller droit au but !

> [Lien vers la documentation de conception hardware du RP2040](https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040.pdf)

C'est sur cette documentation que je me suis principalement penché, et notamment sur la partie "Minimal design example", qui comme son nom l'indique, propose un schéma électrique simple avec uniquement les composants externes nécessaires à son fonctionnement.

Le schéma proposé au téléchargement est à retrouver ci-dessous. Il sert de base, accompagné des explications concernant le choix des références, pour construire sa propre carte équipée du RP2040 :

<div style="position: relative; padding-bottom: 85%; height: 0; overflow: hidden;">
    <embed src="/assets/pdf/RP2040_minimal_r2-sch.pdf" type="application/pdf"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
</div>

### Choix des composants et conception du schéma électronique
Une fois ces recherches préliminaires effectuées, j'ai pu me lancer dans le vif du sujet, en appliquant les conseils donnés pour chaque bloc opérationnel, que je vais désormais vous détailler.

> Le schéma électronique détaillé ci-dessous représente la V1.0 du projet, si vous n'avez pas lu cet article en entier et que vous souhaitez vous en inspirer, **méfiez-vous !** Des erreurs/modifications se sont glissées autant dans le schéma que dans le PCB, ce qui est normal pour un premier prototype ! Une seconde itération est proposée à la fin de cet article 😉
{: .prompt-warning }

- **Bloc du microcontrôleur (RP2040)**

    Le premier bloc à détailler est sans aucun doute celui du microcontrôleur. Ici, la configuration nécessaire pour mettre en scène le RP2040 est étrangement similaire à celle que l'on peut retrouver dans la documentation de Raspberry, et pour cause ! Quand il s'agit des condensateurs ou autres composants passifs qui viennent accompagner un microcontrôleur, il n'y a pas 50 bonnes raisons de vouloir remettre en question ce que propose le fabricant. En répliquant de la sorte, on s'assure le bon fonctionnement de notre µC.

    De haut en bas, on remarque : 

    - Des condensateurs de découplage en pagaille, 11 au total, dont 3 semblent reliés à une même pin et 8 à une autre. Détrompez-vous et regardez attentivement, toutes les broches d'alimentation semblent reliées entre elles en deux groupes différents : un potentiel 1.1V et un potentiel 3.3V. Bien que les broches semblent proches l'une de l'autre sur le schéma, on remarque que les numéros des broches concernées ne sont pas à la suite ! Il faudra alors se souvenir que chaque broche a son condensateur de découplage associé, en regardant notamment le manuel fourni par Raspberry.

    - Sur les broches 46 et 47, deux résistances de 27,4 Ohms qui mènent vers des nets labels qui ne sont pas anodins puisqu'il s'agit des pistes pour la communication USB. Le petit symbole rouge que vous voyez est un indicateur pour Altium concernant la nature de ces pistes, il s'agit de paires différentielles ! On en reparlera plus tard, notamment sur le routage...

    - En bas à droite, le cristal quartz nécessaire au bon fonctionnement de notre microcontrôleur. Cadencé à 12MHz, ce petit cristal est entouré de deux condensateurs calculés en fonction de sa charge capacitive. Pour le détail du calcul et le dimensionnement de ces deux condensateurs, je me suis basé sur la vidéo de Phil's Lab, à retrouver [ici](https://youtu.be/X00Cm5LMNQk?si=hFGWntIX3VCYMP8U&t=488), qui s'intéresse aussi à la conception d'un PCB équipé d'un RP2040

    - Enfin, on peut observer les différents GPIOs du µC utilisés pour les périphériques : je reviendrais sur leur utilisation en fonction du bloc opérationnel.

![Bloc RP2040](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-RP2040.png)
*Bloc du microcontrôleur RP2040 et son quartz à 12MHz*

- **Bloc de la flash (FLASH 8MB)**

L'une des particularités du RP2040 est la nécessité de placer une flash externe pour qu'il fonctionne. Si vous avez déjà travaillé avec un µC de ST ou d'Espressif, vous avez certainement choisi la capacité de la flash au moment de la commande de votre composant (ou alors vous l'avez ajouté au panier sans avoir aucune fichue idée de la taille de votre flash, c'est possible aussi). Dans la majorité des microcontrôleurs, la flash est à l'intérieur de votre boîtier, vous n'avez pas à vous en soucier. Ici, j'ai choisi 8MB dans un petit format CMS (Une capacité de 16MB peut être choisie au maximum).
A noter que cette flash est pilotée en SPI par le µC.

De mon point de vue, il y a des avantages comme des inconvénients à devoir peupler la flash nous-même pour notre application : 
- C'est à vous de trouver la flash communicant en SPI et adaptée au RP2040. Toutes celles que vous trouverez sur Internet ne sont peut-être pas compatible, il faut se référer à la liste proposée par Raspberry dans le manuel, et au pire se fier au pinout et à la doc du fabricant. Bref, c'est du travail en plus, et si vous vous risquez à choisir un autre modèle de flash, elle a des chances de ne pas être compatible et vous n'irez nulle part, rien ne va boot...

- Choisir sa flash, c'est la possibilité de faire des économies si votre application est super légère. Le prix des RP2040 reste plus ou moins le même d'un fournisseur à un autre, ce n'est pas le cas pour la flash en fonction de la capacité. Vous aurez aussi la possibilité de simplement remplacer votre flash si vous la cramez au lieu de changer tout le microcontrôleur, pratique ! 

Enfin, petit point sur cette résistance R7 de 10k notée DNP (Do Not Populate) : Rapsberry indique que cette pull-up au 3.3V peut être nécessaire en fonction de la flash que l'on choisissait. Dans mon cas j'ai préféré mettre l'empreinte de la résistance au cas où. Résultat des courses, j'ai bien fait de la mettre, ça ne fonctionnait pas si je ne la mettais pas !

![Bloc Flash](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-FLASH.png)
*Bloc de la flash de 8MB*

> Si vous avez acheté un ESP32 WROOM, vous voyez sans doute dans vos mains un petit boîtier métallique et l'antenne 2,4GHz imprimée sur le PCB. Vous êtes-vous déjà demandé ce qu'il y avait sous ce petit shield électromagnétique ? La réponse est simple : votre micronctrôleur sous sa forme la plus basique, un quartz, certainement un régulateur de tension, un petit circuit d'adaptation pour l'antenne ET une flash externe ! C'est juste vous ne la voyez pas, mais elle est là, et bien externe ! 
{: .prompt-info }

![ESP32 WROOM sans shield](/assets/img/posts/duckpi/ESP32-decap.png)
*Flash mise en évidence sous le shield d'un ESP32-WROOM [vidéo teardown trouvée sur YouTube](https://www.youtube.com/watch?v=ZQXpfKDbXKs)*

- **Bloc du connecteur USB (USB-A Connector)**

    Pour ce qui est du connecteur USB, j'ai dû en rechercher un qui ressemblait le plus possible à ce que l'on peut retrouver sur une clé USB. Rien de bien compliqué au niveau des connexions, on pense bien à connecter le shield, l'armature (appelez ça comme vous voulez) à la masse. On retrouve bien nos deux symboles concernant les paires différentielles pour la communication USB.

![Connecteur USB-A mâle](/assets/img/posts/duckpi/Connecteur_USB-A.png)
*[Connecteur USB type A mâle](https://www.lcsc.com/product-detail/USB-Connectors_XKB-Connectivity-U217-041N-4BV81_C319178.html), semblable à ce que l'on retrouve que les clés USB*

![Bloc Connecteur USB-A](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-USB-A.png)
*Bloc du connecteur USB type A mâle*

- **Bloc du régulateur de tension (LDO 3V3 500mA)**

    Le régulateur de tension présent sur le PCB est un LDO abaissant la tension de 5V fournie par le port USB à 3.3V pour le µC et ses périphériques. J'ai choisi cette référence car : 
    - 500mA c'est bien suffisant pour notre application
    - L'encombrement est minime grâce au boîtier SOT-23-5
    - J'en avais déjà sous la main et utilisé dans un autre projet, ça fonctionne bien !

    Pour ce qui est des composants externes nécessaires, deux condensateurs de découplage situés en entrée et en sortie, une petite résistance de 10k et zou !

![Bloc LDO](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-LDO.png)
*Bloc du régulateur de tension LDO*
- **Bloc de la LED (LED POWER/GPIO)**

En m'imaginant le projet en amont, j'avais en tête cette petite LED que l'on retrouve parfois sur les clés USB génériques qui s'allume une fois qu'elles sont branchées.
J'ai donc choisi une LED rouge en boîtier 0603, que je placerais à l'extrémité de la conception, vous verrez cela dans quelques instants. Avec les deux solder bridges (notés SB),
donc des petits pads à ponter avec un fer à souder un peu d'étain, je viens choisir comment est relier la LED : 

- Au potentiel 3.3V 
    - pour témoigner de la bonne mise en tension de la LED 
- Au GPIO25
    - pour pouvoir piloter la LED avec le RP2040, comme s'il s'agissait de la LED on-board (utile par la suite avec le projet software)

![Bloc LED](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-LED.png)
*Bloc de la LED et ses solder bridges*

- **Blocs des boutons (BOOT & RESET)**

    Deux boutons CMS de petite taille seront situés sur la partie supérieure du PCB, voici leur fonctionnalité : 

    - Bouton RESET (RST)
        - Ce bouton permet, comme son nom l'indique, de reset le µC. En mettant la broche RUN au GND, on redémarre le composant.
    - Bouton BOOT
        - Le bouton BOOT est essentiel dans notre application finale : il permet d'afficher notre RP2040 comme un **périphérique de stockage** sur notre ordinateur à des fins de développement.
        En branchant simplement le DuckPi dans un port USB, le programme embarqué va se lancer immédiatement. En pressant ce bouton avant d'insérer la clé, on vient basculer le RP2040 dans ce mode de configuration.

![Bloc Bouton RESET](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-RESET.png)
*Bloc du bouton RESET*

![Bloc Bouton BOOT](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-BOOT.png)
*Bloc du bouton BOOT*
    
- **Bloc du sélecteur de mode (SETUP/USB MODE)**

    Et enfin, on trouve un petit sélecteur de mode qui prend la forme d'un DIP switch CMS.
    Comme indiqué sur le schéma, le but est de pouvoir profiter de fonctionnalités qui ont été développées dans le projet software :

    - Mode SETUP
        - En reliant la broche GPIO0 au GND, on s'assure de ne pas injecter la suite d'appui de touche préalablement téléversée dans le µC.
        Il s'agit en quelques sortes d'une sécurité qui peut être activée lors de la phase de développement du programme à injecter.
    - Mode USB
        - Cette fois-ci, en reliant la broche GPIO15 au GND, on peut, grâce à une manipulation, rendre la clé USB non-détectable comme un périphérique de stockage USB.
        Cette fonctionnalité peut être pratique pour agir "discrètement" et ne pas éveiller de soupçons liés à l'apparition d'un message de Windows concernant
        un périphérique de stockage nommé du style "RPI-RP2".

    J'ai aussi ajouté deux solder bridges, au cas où, pour fixer un mode. Ces deux pads à relier au besoin se situeront sous le sélecteur en plastique,
    sur le PCB. J'ai pris le soin de les ajouter dans l'optique où mon sélecteur DIP switch ne rentrent pas en hauteur dans mon casing en plastique.

![Bloc sélecteur mode](/assets/img/posts/duckpi/DuckPi-Schematic_V1.0-MODE.png)
*Bloc du sélecteur de mode*

Le schéma intégral en version PDF est proposé ci-dessous.
<div style="position: relative; padding-bottom: 80%; height: 0; overflow: hidden;">
    <embed src="/assets/pdf/DuckPi-Schematic_V1.0.pdf" type="application/pdf"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
</div>

### BOM du projet

Puisque je voulais détailler au maximum la conception du DuckPi, je vous propose sa BOM : 

| Designator                              | Description               | Package            | Unit(s) | Supplier   | Ref. Supplier |
|-----------------------------------------|---------------------------|--------------------|---------|------------|--------------|
| U1                                      | µC RP2040                 | LQFN-56            | 1       | LCSC       | [C2040](https://www.lcsc.com/product-detail/Microcontroller-Units-MCUs-MPUs-SOCs_Raspberry-Pi-RP2040_C2040.html)
| U2                                      | LDO 3.3V 500mA            | SOT-23-5           | 1       | LCSC       | [C82942](https://www.lcsc.com/product-detail/Linear-Voltage-Regulators-LDO_MICRONE-Nanjing-Micro-One-Elec-ME6211C33M5G-N_C82942.html)
| U3                                      | NOR FLASH 3V 64M-BIT      | XSON-8-EP          | 1       | LCSC       | [C2940195](https://www.lcsc.com/product-detail/NOR-FLASH_Winbond-Elec-W25Q64JVXGIQ_C2940195.html)
| J1                                      | 1.5A USB A 2.0 Male       | /                  | 1       | LCSC       | [C319178](https://www.lcsc.com/product-detail/USB-Connectors_XKB-Connection-U217-041N-4BV81_C319178.html)
| Y1                                      | 12MHz 20pF ±10ppm ±30ppm  | SMD3225-4P         | 1       | LCSC       | [C5182760](https://www.lcsc.com/product-detail/Crystals_Yajingxin-TX322512M4LBCE2T_C5182760.html)
| S1, S2                                  | 50mA Round Tactile Switch | /                  | 2       | LCSC       | [C2888419](https://www.lcsc.com/product-detail/Tactile-Switches_BZCN-TSA007A1518B03_C2888419.html)
| S3                                      | 2Bit SPST Black Slide SMD | SMD,3.67x5.7x2.1mm | 1       | LCSC       | [C5805840](https://www.lcsc.com/product-detail/DIP-Switches_G-Switch-DV7SA-02F-01_C5805840.html)
| D1                                      | LED Rouge 0603 20mA         | 0603               | 1       | LCSC       | [C84263](https://www.lcsc.com/product-detail/Light-Emitting-Diodes-LED_Foshan-NationStar-Optoelectronics-NCD0603R1_C84263.html)
| C1, C2, C3, C4, C5, C6, C7, C8, C9, C16 | Condensateur 100nF 16V 0402  | 0402               | 9       | LCSC       | [C1525](https://www.lcsc.com/product-detail/Multilayer-Ceramic-Capacitors-MLCC-SMD-SMT_Samsung-Electro-Mechanics-CL05B104KO5NNNC_C1525.html)
| C10, C11, C12, C13                      | Condensateur 1uF 10V 0402    | 0402               | 4       | LCSC       | [C14445](https://www.lcsc.com/product-detail/Multilayer-Ceramic-Capacitors-MLCC-SMD-SMT_Samsung-Electro-Mechanics-CL05A105KP5NNNC_C14445.html)
| C14, C15                                | Condensateur 30pF 50V 0402   | 0402               | 2       | LCSC       | [C526980](https://www.lcsc.com/product-detail/Multilayer-Ceramic-Capacitors-MLCC-SMD-SMT_YAGEO-CC0402FRNPO9BN300_C526980.html)
| R1, R7                                  | Résistance 10k 0402         | 0402               | 2       | LCSC       | [C25744](https://www.lcsc.com/product-detail/Chip-Resistor-Surface-Mount_UNI-ROYAL-Uniroyal-Elec-0402WGF1002TCE_C25744.html)
| R2                                      | Résistance 150R 0402        | 0402               | 1       | LCSC       | [C25082](https://www.lcsc.com/product-detail/Chip-Resistor-Surface-Mount_UNI-ROYAL-Uniroyal-Elec-0402WGF1500TCE_C25082.html)
| R3, R4                                  | Résistance 27,4R 0402       | 0402               | 2       | LCSC       | [C31439](https://www.lcsc.com/product-detail/Chip-Resistor-Surface-Mount_UNI-ROYAL-Uniroyal-Elec-0402WGF274JTCE_C31439.html)
| R5, R6                                  | Résistance 1k 0402          | 0402               | 2       | LCSC       | [C11702](https://www.lcsc.com/product-detail/Chip-Resistor-Surface-Mount_UNI-ROYAL-Uniroyal-Elec-0402WGF1001TCE_C11702.html)
| /                                       | Casing plastique USB        | /                  | 1       | Aliexpress | [Lien](https://fr.aliexpress.com/item/4000712595156.html)

### Dimensions du PCB
Bien, maintenant que vous connaissez le schéma électronique sur le bout des doigts, je peux vous parler de mes contraintes en terme de dimensions de PCB.

Je cherchais des boîtiers vierges de clé USB, à la manière de Hak5 sur leur site, mais pas moyen d'en trouver à un prix abordable... Des clés USB génériques
par contre, on en trouve à la pelle sur Aliexpress. De toutes les couleurs, avec le petit rabat métallique, exactement comme cette clé USB aux performances et au
stockage médiocre qui traine sur votre bureau. Alors je me suis demandé si je ne pouvais pas simplement demander à un vendeur sur Aliexpress si, par tout
hasard, acheter des boîtiers nus était envisageable ? Ils doivent en avoir des quantitiés astronomiques, négociées à des prix dérisoires non ?

Eh bien j'ai bien fait ! Le premier vendeur auquel j'ai demandé a bien voulu me vendre des petits casings, en trois parties (le dessus, le dessous et la partie métallique qui se clipse dessus après).

Vous avez maintenant un petit bout de plastique qui tient au coeur de votre main, mais vous ne disposez pas du modèle 3D, donc vous ne pouvez pas *simplement*
trouver la dimension de votre PCB qui doit s'y loger. Alors comment faites vous ? Vous sortez le pied à coulisse ? Dans l'absolu, c'est une bonne idée, mais
ça pourrait mener à un manque de précision qui pourrait vous coûter cher auprès de l'usine de PCB !

Je vais vous montrer mon approche, parce que je suis un petit malin. J'ai tout simplement placé le boîtier en plastique (les deux parties sont identiques, pour
minimiser les coûts de fabrication, j'imagine) sur la vitre du scanner de mon imprimante à côté d'une pièce de 2€ et TADAAA !

![Scan du casing](/assets/img/posts/duckpi/Casing_Scan.png)
*Résultat du scan du casing de la DuckPi*

Ceux qui connaissent l'astuce comprennent l'importance de la pièce de 2€, les autres au fond de la salle qui continuent de lire cet article se disent
seulement que j'essaie d'exposer ma richesse. Pour pouvoir travailler sérieusement avec cette technique, il faut placer à côté de votre objet à répliquer, un référentiel
qui vous servira à étalonner votre conception. En connaissant le diamètre d'une pièce de 2€ et en la renseignant à mon logiciel de modélisation 3D, ici Fusion360, on peut alors
commencer à tracer le contour intérieur du casing afin de déterminer l'encombrement.

En prenant en compte un petit offset lors de la modélisation des contours du PCB, on s'assure que la carte électronique qui sera produite tiendra dans le casing, sans que ce soit trop lâche.
Une fois modélisée, la forme du PCB peut être exportée au format DXF et être ainsi importée dans Altium Designer pour délimiter les contours de votre PCB.

![Modélisation encombrement casing](/assets/img/posts/duckpi/Apercu_modelisation_casing.png)
*Modélisation du PCB pour déterminer l'encombrement*

> **Astuce** : Si vous n'êtes pas trop sûr de votre modèle, vous pouvez toujours réaliser une mise en plan d'une des faces, afin de l'imprimer à taille réelle sur une simple feuille blanche.
En découpant votre petite forme et en la plaçant dans votre objet à épouser, vous réduirez les risques que tout votre PCB fonctionne, mais qu'il ne rentre pas dans votre casing !
{: .prompt-info }

### Placement des composants et routage du PCB

Je ne vais pas m'éterniser sur le placement des composants et sur le routage en tant que tel. J'ai essayé de placer tous les composants sur une même face (en top) pour me faciliter la vie et limiter les frais (production d'un seul pochoir pour le dépôt de la pâte à braser). Voici un petit aperçu du PCB, avec ses plans de masse masqués pour plus de lisibilité. On voit sur chaque face des mentions sur le silkscreen, uniquement celles nécessaires (et quelques logos parce qu'on est pas des bêtes tout de même).

![Vue Top et Bottom routage V1.0](/assets/img/posts/duckpi/DuckPi_V1.0_Vue_Routage.png)
*Vue Top et Bottom du routage en version V1.0*

Les plus attentifs d'entre vous, et qui connaissent Altium, remarqueront un **léger souci** sur ces captures d'écran : il s'agit de la version que j'ai envoyée (*un peu vite*) en production...

Admirez aussi ces belles vues 3D, avec un masque jaune, histoire de matcher avec notre cher petit canard en plastique que vous avez pu apercevoir dans le précédent post.

![Vue 3D Top du PCB V1.0](/assets/img/posts/duckpi/DuckPi_V1.0_Top_3D.png)
*Vue en 3D Top PCB en version V1.0*

![Vue 3D Bottom du PCB V1.0](/assets/img/posts/duckpi/DuckPi_V1.0_Bottom_3D.png)
*Vue en 3D Bottom PCB en version V1.0*

### Assemblage et brasure (en vidéo !)

Après avoir commandé les PCB sur JLCPCB (non sponso mais on aimerait bien) et les composants sur le site LCSC, j'ai pu me lancer dans l'assemblage d'une première carte. Pour ce faire, comme vous l'avez peut-être remarqué, je n'ai pas affiché les designators de chaque composant (R?, C?...). Ils ne sont pas affichés pour des questions de place, mais aussi d'esthétisme, comme pour empreintes des composants qui sont assez sobres.

Je me suis donc exporté un petit PDF que voici, qui reprend les emplacements de mes composants ainsi que les références associées, tirées de ma BOM. Avec cette petite feuille à côté de moi, pas besoin de vérifier constamment le layout du PCB sur Altium lors de l'assemblage ! 

<div style="position: relative; padding-bottom: 78%; height: 0; overflow: hidden;">
    <embed src="/assets/pdf/DuckPi_Soldering_V1.0.pdf" type="application/pdf"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
</div>


Et pour rendre ça un peu plus sympa à suivre, je me suis amusé à vous enregistrer une petite vidéo de l'assemblage et de la brasure d'un des premiers prototypes, que voici : 

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe width="1236" height="695" src="https://www.youtube.com/embed/5vExJGp7338" title="[DuckPi] - Assemblage et brasure - V1.0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

## Premiers tests

Le PCB étant assemblé, on passe aux premiers tests ! Alors, est-ce qu'on aura le droit à une **fumée magique** ?

![Vue du PCB assemblé dans son casing](/assets/img/posts/duckpi/duckpi_dans_casing.png)
*PCB assemblé qui rentre gentiment dans son casing !*

### Alimentation

Comme évoqué dans la dernière partie de la vidéo, j'ai commencé par ponter le solder bridge de gauche (SB1), pour relier la LED rouge au 3.3V. De ce fait, en branchant simplement la clé dans un bloc secteur classique, j'ai pu vérifier que ma carte était bien alimentée. J'ai aussi évidemment sorti le multimètre pour m'assurer que le 3.3V arrivait aux bons endroits.

![Test d'alimentation fonctionnel](/assets/img/posts/duckpi/duckpi_test_alim.png)
*L'alimentation du projet est validée en branchant la clé sur un bloc secteur 5V : la LED rouge s'allume*

Ce test m'a permis d'identifier rapidement les deux problèmes cités dans la vidéo concernant la liaison de certains pads avec le plan de masse : la LED ne s'allumait tout simplement pas au premier test puisque le régulateur de tension n'était pas en contact avec le GND. 

Les deux soucis se situaient au niveau du régulateur de tension et au niveau du quartz. Ces deux problèmes auraient largement pu être évités, il s'agit tout simplement d'une erreur d'inattention : j'ai changé la taille de mes vias au dernier moment, regénéré le plan de masse, mais totalement zappé de repasser un coup de DRC (Design Rule Check). Le problème a heureusement pu être contourné sans trop de souci, comme je l'explique dans la vidéo en bidouillant un petit peu.

![Erreur de routage LDO](/assets/img/posts/duckpi/duckpi_probleme_alim.png)
*Le fil blanc affiché par Altium indique qu'il reste une piste à router...*

### Premier test de programmation embarquée

Bien content que mon régulateur de tension ne soit pas parti en fumée, je me suis empressé de brancher la DuckPi à mon PC pour essayer d'y upload un programme embarqué. Mais rien n'était détecté... J'avais beau appuyer sur le bouton Boot avant de l'insérer, rien...

Après quelques longues minutes à me creuser la tête et à regarder mon schématique dans tous les sens, une idée m'est venue : qu'en est-il de ce régulateur de tension interne de 1.1V ? J'avais regardé dans un premier temps si mon 3.3V était présent sur les bonnes broches et c'était le cas. J'ai ensuite regardé le 1.1V qui devait se trouver sur plusieurs d'entre elles, et c'était aussi le cas... 

**Vraiment ?** Non, je n'avais regardé qu'une de ces broches, pas les autres ! C'était à moi, dans le design de mon PCB, de relier ces 3 pins au même potentiel. Et maintenant que j'y pense, c'est logique, si vous revenez sur le schéma de mon bloc microcontrôleur, vous verrez que le pin 45 se nomme *"VREG_VOUT"*... 

Bref, mon application ne pouvait de toute évidence pas marcher si le 1.1V n'était pas partagé aux broches 45, 23 et 50. Je me suis donc armé de mon minuscule fil de cuivre pour tenter de relier ces broches (non sans peine). Et devinez quoi, **IL SE PASSE QUELQUE CHOSE QUAND J'INSERE LA CLE !!** 

C'est bon signe, on est vraiment sur la bonne voie ! 

![Détection explorateur de fichier](/assets/img/posts/duckpi/duckpi_file_explorer.png)
*La DuckPi est bien détectée comme un périphérique de stockage dans l'explorateur de fichier*

Youpi, ma clé est bien détectée lorsque j'appuie sur le bouton Boot avant de l'insérer ! Alors essayons de téléverser un simple code Arduino afin de tenter de faire clignoter la LED après avoir peuplé SB2 au lieu de SB1 : 

![Blinky fonctionnel](/assets/img/posts/duckpi/duckpi_blinky.gif)
*Simple Blinky fonctionnel sur la DuckPi !*

### Test de l'application désirée

> Cette section n'étant pas clairement détaillée, un tutoriel pour la prise en main de la DuckPi tant sur le plan matériel que logiciel sera proposé dans un autre post.
{: .prompt-info }

Testons alors l'application finale sur cette V1.0 ! J'avais conscience à ce stade qu'une V1.1 allait être nécessaire, notamment à cause de ces problèmes de pistes mal reliées. Mais croyez moi, je n'étais pas au bout de mes surprises...

Je me suis donc penché sur l'utilisation du projet *"pico-ducky"* que j'ai pu citer dans mon précédent post. Laissez-moi vous dire dans un premier temps que le tutoriel proposé n'est pas des plus clairs. J'ai passé quelques heures à farfouiller pour comprendre comment le faire fonctionner correctement sur la Raspberry Pico que je possède. En prouvant son bon fonctionnement, je pouvais alors répliquer le processus sur mon propre projet.

![Raspberry Pico](/assets/img/posts/duckpi/duckpi_pico.png)
*Essayer le projet logiciel sur le support officiel n'est pas une mauvaise idée pour identifier les problèmes...*

> [Lien vers le projet Github "pico-ducky"](https://github.com/dbisu/pico-ducky?tab=readme-ov-file)

J'ai trouvé un petit script bidon, qui a pour but d'ouvrir un bloc-notes sur l'ordinateur une fois branchée, et de dessiner un magnifique Rick Roll en [ASCII Art](https://fr.wikipedia.org/wiki/Art_ASCII). Rien de bien méchant, juste histoire de vérifier que tout fonctionne correctement.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe width="1236" height="695" src="https://www.youtube.com/embed/3WYnv5sdD5U" title="[DuckPi] - Test du &quot;pico-ducky&quot; sur le Raspberry Pico" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

Alors je tente de faire la même chose sur mon projet, vu que ça semble fonctionner sur le Raspberry Pico officiel ! J'installe tout de la même manière, j'y dépose mon payload et là... **bah ça fonctionne pas**.

Je comprends pas trop sur le coup ce qu'il se passe, et pour rien vous cacher, ça me décourage même un peu. Je pensais avoir résolu les problèmes liés au hardware, mais voilà que le software vient remettre en question le
fonctionnement de la clé ! Le truc c'est que ça fonctionnait, mais pas intermittence : 1 fois sur 10 à peu près, une fois la clé branchée, le script se déclenchait bien. Sinon, rien du tout, calme plat...

Je me dis alors que le problème vient peut-être de la **paire différentielle** DATA+ et DATA- que j'ai pu tracer sur Altium. 

![Paire différentielle](/assets/img/posts/duckpi/duckpi_paire_diff.png)
*La paire différentielle pour l'USB est croisée, peut-être ma source de problèmes*

Quelle bonne idée j'ai eu de croiser les deux pistes... En voulant placer le port USB sur la face TOP, je devais inverser la position des deux pistes pour qu'elles arrivent au niveau des deux résistances. Mais mon petit 
doigt me dit que c'était pas la meilleure des idées pour que la liaison USB 2.0 soit bien stable.

## Corrections à apporter pour une seconde itération ?

Quelques corrections semblent donc être nécessaires pour que le projet fonctionne bien, je les détaille brièvement ici pour la version V1.1 (vous êtes bien courageux d'avoir lu jusqu'ici).

### Modification du schéma électronique

Sur le schéma électronique, pas beaucoup de changements en soit. On peut lister : 

Voici donc le schéma de la V1.1 de la DuckPi : 

- L'ajout de R8 (1k) au niveau de la pin RUN pour le RESET, comme ce qu'on peut retrouver sur d'autres schémas sur le net, afin de limiter le courant
- La suppression de SB3 et SB4, qui ne s'avéraient pas très utiles puisque le sélecteur rentre dans le casing
- La résistance R7 n'est plus désignée comme DNP, il faut la peupler pour la flash fonctionne bien

<div style="position: relative; padding-bottom: 80%; height: 0; overflow: hidden;">
    <embed src="/assets/pdf/DuckPi-Schematic_V1.1.pdf" type="application/pdf"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
</div>

### Modification du routage

Là où il y aura le plus de changement pour cette V1.1, c'est dans le placement des composants et le routage. On peut citer : 

- Les potentiels 1.1V sont bien reliés entre eux
- Les plans de masse sont corrigés
- Le connecteur USB est retourné, les pads se retrouvent sur le BOTTOM
- La paire différentielle pour l'USB a été retravaillée : elle est non croisée, sur une seule face (TOP) et possède bien une impédance de 90 Ohms, calculée à l'aide d'Altium
- Le régulateur de tension et ses composants passifs se retrouvent sur la gauche de la face TOP
- La flash et ses composants se retrouvent sur la droite de la face TOP

Petite vue du routage pour cette seconde version, avec toutes les petites améliorations, en espérant que ça fonctionne mieux ! 

![Vue Top et Bottom routage V1.1](/assets/img/posts/duckpi/DuckPi_V1.1_Vue_Routage.png)
*Vue Top et Bottom du routage en version V1.1*

Et voici deux petites vues 3D de la V1.1 ! 

![Vue 3D Top du PCB V1.1](/assets/img/posts/duckpi/DuckPi_V1.1_Top_3D.png)
*Vue en 3D Top PCB en version V1.1*

![Vue 3D Bottom du PCB V1.1](/assets/img/posts/duckpi/DuckPi_V1.1_Bottom_3D.png)
*Vue en 3D Bottom PCB en version V1.1*

Voilà pour cette première conception hardware de la DuckPi et ses détails techniques ! À ce jour, je suis en train d'attendre que la V1.1 soit livrée, avec toutes ces petites modifications !
J'espère que tout va fonctionner, notamment sur le sélecteur que je n'ai donc pas trop eu l'occasion d'essayer.

**Alors qu'avez vous pensé de ce *"petit"* article technique ?**

