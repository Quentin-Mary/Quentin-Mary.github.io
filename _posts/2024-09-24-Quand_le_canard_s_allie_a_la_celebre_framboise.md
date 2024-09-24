---
title: Duckpi - Quand le canard s'allie à la célèbre framboise
date: 2024-09-24 15:15:00 +0200
categories: [DuckPi, Introduction]
tags: [duckpi,projet,introduction,marylab]
---

## Premier projet illustré sur le site !
Le voilà ! Le premier vrai post sur un projet du MaryLab ! 

Je souhaite présenter mes projets en les découpant sous forme de plusieurs petits posts, pour que ça reste sympa à lire pour vous et pas trop décourageant à écrire pour moi.

Alors allons-y, introduisons le DuckPi ! 

## La Rubber Ducky, vous connaissez ?
Le projet DuckPi est directement inspiré de l'outil développé par Hak5, la [Rubber Ducky](https://shop.hak5.org/products/usb-rubber-ducky), que vous connaissez certainement. Pour ceux du fond qui ne suivent pas ou qui ne sont pas à la page, voici un petit récapitulatif.

![USB Rubber Ducky](/assets/img/posts/rubber-ducky.png)
*La Rubber Ducky par Hak5*

La Rubber Ducky semble être une clé USB standard. Tout repose dans le "semble", vous vous doutez bien. La Rubber Ducky est un dispositif [HID](https://en.wikipedia.org/wiki/Human_interface_device), pour "Human interface device". Un clavier, une souris, un écran tactile... Tous ces périphériques font le lien entre vous et votre ordinateur. Alors qu'une clé USB est un périphérique de stockage permettant de stocker vos photos de vacances, la Rubber Ducky va se faire passer pour un périphérique HID lorsqu'elle sera connectée à un système (Windows, Mac, Linux et autres).

Alors, vous le voyez venir ? En se faisant passer pour un clavier lors de son insertion dans le port USB de votre PC, la Rubber Ducky peut exécuter le programme précédemment chargé dans sa flash (ici, une carte microSD). Le programme en question n'est peut-être pas celui que vous vous imaginez : la Rubber Ducky ne va pas transmettre un vilain virus comme dans les mauvais films d'action, elle va simplement taper sur un clavier imaginaire à une vitesse non atteignable, humainement parlant. La cerise sur le gâteau ? Comme la clé se fait passer pour un clavier, elle ne sera pas (dans la plus grande majorité des cas) détectée comme une menace par votre ordinateur. 

Effrayant, n'est-ce pas ?

> *"To a human it’s a flash drive, to a computer it’s a keyboard, typing at superhuman speeds."*


## Un outil aux multiples facettes
Effrayant, oui et non. Il est très facile de s'imaginer des utilisations malicieuses, voire illégales de cette clé USB traficotée. Si bien que l'excellente série télévisée Mr Robot l'illustre parfaitement. Je vous ai retrouvé l'extrait où la Rubber Ducky fait son apparition (Saison 2, épisode 6). Pour replacer un peu le contexte, Angela est initiée au hacking afin de dérober des informations au FBI (de manière illégale, vous vous en doutez). Elle ne connaît rien au hacking et pourtant, c'est elle qui devra s'introduire dans le bâtiment des fédéraux : la Rubber Ducky fait alors son apparition ! 

Un payload comprenant une succession de touches est présent dans la flash de la Rubber Ducky, l'objectif ici étant de récupérer des mots de passe. Une solution de repli, illustrée ici, qui pourrait peut-être aider ce groupe de hackers de la fsociety. Pas besoin de savoir taper des commandes magiques dans un terminal, on branche la clé dans un PC et tadaaaa !

> *"You can't teach someone to hack in one day."*

Bien qu'il ne s'agisse que d'une fiction, la série Mr. Robot est reconnue pour sa volonté de véracité : les nombreuses scènes de hacking dans cette série télévisée se rapprochent de ce qui est réalisable pour de vrai. Des raccourcis sont empruntés et c'est normal, il ne s'agit pas d'un tutoriel détaillé pour le spectateur. Des scènes d'exposition avec des détails réalistes et croustillants sont tout de même proposés pour permettre la vulgarisation aux non-initiés et satisfaire les chevronnés ! Je ne peux que je vous conseiller cette série en 4 saisons, qui se hisse largement dans mon top 3 des meilleures séries que j'ai pu voir ! 😉

> **Mon objectif n'est cependant pas de pirater le FBI. Ni qui ou quoi que ce soit d'ailleurs.**
{: .prompt-danger }

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe src="http://www.youtube.com/embed/9E0395Qk69s" frameborder="0" allowfullscreen 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

## Les dessous de la Rubber Ducky
Si mes quelques mots sur cette vraie/fausse clé USB vous ont intrigué, ou que vous voulez comprendre plus en détail son fonctionnement, ses applications ainsi que ses avantages et ses inconvénients, je ne peux que vous recommander la vidéo de Linus Tech Tips sur le sujet.

En une dizaine de minutes, vous comprendrez à peu près tout (si vous comprenez un minimum l'anglais). Et si Hak5 continue de vous intriguer, vous serez surpris d'apprendre qu'ils n'en sont pas à leur coup d'essai, et que d'autres produits de ce type sont [disponibles à la vente...](https://www.youtube.com/watch?v=mPF9f-PLDPc)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe src="http://www.youtube.com/embed/kfaHJwcG2mg" frameborder="0" allowfullscreen 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

## "DuckPi", ma vision du *vilain petit canard*
DuckPi, c'est le petit nom que j'ai pu donner à ce projet, à cette "reproduction" de la Rubber Ducky à ma sauce. Pourquoi ce nom ? Eh bien, je ne me suis pas creusé la tête trop longtemps, il s'agit de l'alliance entre le canard en caoutchouc et la framboise de la fondation Raspberry (vous connaissez forcément le Raspberry Pi nan ?). 

Ma vision du projet DuckPi est la suivante : concevoir une carte électronique ayant pour but de reproduire les fonctionnalités que l'on pourrait retrouver sur une Rubber Ducky, tout en respectant des contraintes de taille afin d'utiliser un boîtier générique. L'idée est de pouvoir proposer, à l'instar de la Rubber Ducky, un dispositif ressemblant trait pour trait à une clé USB générique. L'un des principaux challenges se situera donc dans la miniaturisation des blocs opérationnels du PCB.

![Boitier générique à utiliser](/assets/img/posts/casing-ideal.png)
*Le PCB du DuckPi devra tenir dans un casing de clé USB générique !*

Le projet DuckPi représente aussi une occasion de concevoir un PCB équipé du RP2040 de la fondation Raspberry comme microcontrôleur. Je vous détaillerai ce que j'ai pu apprendre et découvrir au fil de mes recherches et de la conception !

## Le support physique d'un projet logiciel existant
Pour ce qui est du projet et des détails techniques, le projet DuckPi représente un support hardware d'un projet logiciel existant. Ce projet logiciel est proposé par l'utilisateur de Github "dbisu", sous le nom "pico-ducky". Grâce au programme développé et proposé dans ce repository, nous pouvons exploiter les payloads existants pour la Rubber Ducky officielle ou bien proposer les nôtres en respectant la même syntaxe.

> [Lien vers le projet Github "pico-ducky"](https://github.com/dbisu/pico-ducky?tab=readme-ov-file)

Pour l'avoir essayé en amont sur un Raspberry Pico (équipé du RP2040) commandé pour l'occasion, je peux vous dire que ça fonctionne très bien ! Le seul souci à mes yeux, c'était le manque d'un support hardware décent. La configuration et la configuration de la clé seront détaillées dans un article dédié : bien que des indications de mise en marche soient disponible sur Github, elles ne sont pas adaptées à un utilisateur novice selon moi.

![Microcontroleur RP2040](/assets/img/posts/duckpi-rp2040.png)
*Microcontrôleur RP2040 de Raspberry, noté RP2-B1 sur son boîtier*

## Mais ça existe déjà non ?
Oui mais... 

J'ai fait quelques recherches avant de me lancer dans ce projet de PCB à base de Pico (parce que j'ai parfois un peu de mal à me lancer dans des projets si je vois qu'ils existent déjà). Eh bien, une version existe ! Elle se nomme le PicoUSB, et est développée par [Tom Briek](https://github.com/TomBrlek/PicoUSB). Ce porteur de projet avait le même objectif que moi en tête : un support hardware pour le projet pico-ducky. Tom a cependant choisi de conserver son PCB "nu" en proposant notamment un connecteur USB directement sur son PCB.

J'ai été content de me rendre compte que les fichiers source de sa conception PCB n'étaient pas disponibles. Cela m'aurait peut-être évité quelques soucis lors de la conception du schéma électronique (que je vous détaillerai plus tard), mais je pense que j'aurais eu l'impression de "découvrir la solution", comme quand vous trichez parce que vous êtes bloqué dans un jeu, en jetant un coup d'oeil sur Internet ! M'appuyer sur ses schémas aurait très certainement court-circuité mon apprentissage et mon envie de débuter et de poursuivre ce projet.

> [Lien vers la page du PicoUSB](https://picousb.com/)

## Détails techniques et avancement à suivre ! 
Voilà, vous connaissez les grandes lignes de ce projet DuckPi désormais. Des articles arriveront prochainement pour vous détailler mes recherches, vous expliquer en détail la conception... Un article sera par la suite consacré à la mise en marche hardware et software. 

J'espère avoir attiré votre attention et surtout attisé votre curiosité ! Je vous laisse avec le superbe logo qui ornera ce projet DuckPi : 

![Logo DuckPi](/assets/img/posts/logo-duckpi.png)
*Logo du projet DuckPi, généré à l'aide de l'intelligence articielle, sublimé par Hugo Tardy-Covet*

![Mise en scène DuckPi](/assets/img/posts/scene-duckpi.png)