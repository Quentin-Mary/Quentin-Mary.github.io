---
title: DuckPi - Mode d'emploi (V1.1)
date: 2024-10-23 22:15:00 +0200
categories: [DuckPi, Mode d'emploi]
tags: [duckpi, projet ,marylab, mode d'emploi]
---

## Manuel d'utilisation Hardware et Software
Ce post a pour but de vous expliquer comment mettre en route votre DuckPi, dans sa version V1.1. Ce tutoriel reprend la documentation logicielle fournie pour le projet **pico-ducky** et présente les diverses explications propres à la conception hardware que j'ai pu proposer. Je vous invite à consulter cette documentation en parallèle si vous rencontrez des difficultés, afin de croiser les sources.

> [Lien vers le projet Github "pico-ducky"](https://github.com/dbisu/pico-ducky?tab=readme-ov-file)

> N'hésitez pas à me contacter si vous rencontrez des difficultés en suivant ce tutoriel, afin de corriger d'éventuelles erreurs et d'ajuster les explications.
{: .prompt-info }

## Prise en main de la DuckPi
Cette première partie a pour objectif de détailler la prise en main de la Ducki afin d'accélérer la mise en marche de votre petite clé USB.

### Ouverture du casing en plastique
Pour pouvoir programmer votre exemplaire de la DuckPi, vous allez avoir besoin d'ouvrir le casing en plastique afin d'accéder au PCB. Pour ce faire, vous devez : 

- Retirer le rabat couleur alu, en l'écartant légèrement
- Vous munir d'un stylo-bille et de patience afin d'ouvrir le casing en insérant la pointe dans le trou laissant passer la lumière de la LED

En poussant fermement la pointe de votre stylo-bille dans le trou, vous allez naturellement écarter les deux parties constituant le casing en plastique.

> J'utilise un stylo-bille afin de ne pas endommager le casing en plastique (qui peut être rapidement rayé). Si vous utilisez un autre outil, faites attention de ne pas l'insérer trop profondément, au risque d'endommager la LED qui se situe juste derrière ! 
{: .prompt-warning }

Comme vous le voyez sur le GIF ci-dessous, une fois que le casing s'ouvre légèrement, utilisez vos ongles pour écarter délicatement les deux parties. Faites bien le tour afin de ne pas casser les petits picots en plastique qui permettent la fermeture par pression du casing.

![Ouverture casing](/assets/img/posts/duckpi/enlever_casing.gif)
*Comment ouvrir le casing en plastique à l'aide d'un stylo-bille*

### Description des éléments d'interaction
Toujours dans l'optique de faciliter la prise en main du PCB, voici une simple description des éléments d'interaction que vous retrouverez sur la carte (top et bottom):

1. LED rouge
2. Solder Bridge pour disposer d'un témoin d'alimentation (3.3V)
3. Solder Bridge pour piloter la LED à l'aide du GPIO 25 (built-in LED)
4. Bouton RESET (redémarrer le programme qui tourne sur le microcontrôleur)
5. Bouton BOOT (passer la DuckPi en mode BOOT en appuyant sur le bouton tout en l'insérant)
6. Sélecteur de mode (SET et USB)

![Légende top DuckPi](/assets/img/posts/duckpi/duckpi_legende_top_v1-1.png)
*Liste des éléments d'interaction sur le top de la DuckPi V1.1*

![Légende Bottom DuckPi](/assets/img/posts/duckpi/duckpi_legende_bottom_v1-1.png)
*Liste des éléments d'interaction sur le bottom de la DuckPi V1.1*

Chaque élément sera cité dans les explications qui suivent dans ce tutoriel.

## Programmation de la DuckPi
Le mot "programmation" est un peu exagéré, vous n'avez pas de logiciel en particulier à installer sur votre PC ! En réalité, il s'agit plus d'une manipulation pour la configuration de la DuckPi. Cette section a pour but de vous permettre d'utiliser votre DuckPi comme imaginé, en se basant sur le tutoriel laissé par l'auteur du GitHub.

> Les explications qui suivent sont détaillées pour une programmation sur un ordinateur Windows, en ayant comme cible un autre ordinateur Windows. Pour les utilisateurs de Linux et de Mac, vous aurez peut-être besoin de vous retrousser les manches en suivant directement les explications laissées sur la page GitHub du projet "pico-ducky".
{: .prompt-warning }

### 1. Cloner le dépôt GitHub
Rendez vous sur le dépôt GitHub et téléchargez une copie de celui-ci.

> [Lien vers le projet Github "pico-ducky"](https://github.com/dbisu/pico-ducky?tab=readme-ov-file)

Cliquez sur "Code", puis sélectionnez "Download ZIP".

![Clone Repository](/assets/img/posts/duckpi/clone_repo.png)
*Clonez le dépôt Github "pico-ducky"*

Je vous conseille de vous créer un dossier consacré à la DuckPi. Vous pouvez donc y placer votre archive zip téléchargée, et la décompresser.

### 2. Télécharger CircuitPython 8.0.0
Pour que la DuckPi puisse exécuter le payload correctement, il faut qu'elle puisse exécuter du code "Circuit Python". Il s'agit d'une version de Python adaptée au microcontrôleur de Raspberry.

Pour ce faire, vous allez avoir besoin de télécharger un fichier au format **.uf2**, nommé **adafruit-circuitpython-raspberry_pi_pico-fr-8.0.0.uf2**. Le lien suivant vous emmènera vers la page des différentes releases
de version de CircuitPython. Celle qui nous intéresse est datée de la sorte : **2023-02-06T21:54:46.000Z**. 

> Il est important de bien sélectionner la version 8.0.0 de CircuitPython dans la liste afin de s'assurer du bon fonctionnement du projet software par la suite !
{: .prompt-warning }

> [Lien vers la version 8.0.0 de CircuitPython](https://adafruit-circuit-python.s3.amazonaws.com/index.html?prefix=bin/raspberry_pi_pico/fr/)

![Version CircuitPython](/assets/img/posts/duckpi/version_circuitpython.png)
*Veillez à télécharger la version compatible de CircuitPython !*

### 3. Installer CircuitPython sur la DuckPi
Munissez-vous de votre DuckPi **sans son casing en plastique**.

Appuyez sur le bouton-poussoir Boot, marqué "BT" et insérez la clé dans le port USB de votre PC. Une fois insérée, vous pouvez lâcher le bouton Boot. De cette manière, le microcontrôleur passe en mode configuration.

Si vous avez correctement effectué cette opération, la DuckPi doit apparaître dans votre explorateur de fichier de la sorte : 

![DuckPi dans l'explorateur de fichiers](/assets/img/posts/duckpi/duckpi_explorateur.png)
*La DuckPi apparaît dans l'explorateur de fichiers, prête à être configurée*

Maintenant, vous allez pouvoir copier (ou déplacer) le fichier nommé **"adafruit-circuitpython-raspberry_pi_pico-fr-8.0.0.uf2"** sur le périphérique **RPI-RP2**. Une fois la copie effectuée, la DuckPi va reboot toute seule,
de sorte à apparaître de nouveau dans l'explorateur de fichier, désormais sous le nom **CIRCUITPY**.

![Installation CircuitPython](/assets/img/posts/duckpi/duckpi_installation_circuitpython.gif)
*En copiant le fichier d'installation CircuitPython, la DuckPi apparait sous le nom "CIRCUITPY"*

> À chaque fois que le bouton Boot sera pressé lors de l'insertion de la DuckPi, cette étape devra être répétée. Pratique si l'on rencontre un problème avec la clé, on peut toujours la reconfigurer.
{: .prompt-info }

### 4. Copie des différents fichiers de configuration
Vous venez de paramétrer votre DuckPi de sorte à ce qu'elle soit prête à accueillir des fichiers de configuration.

Vous allez avoir besoin de télécharger une seconde archive, nommée **"adafruit-circuitpython-bundle-8.x-mpy-20241128.zip"**, qui va contenir des fichiers importants liés à CircuitPython. Cette archive est proposée sur le GitHub d'Adafruit, à retrouver [ici](https://github.com/adafruit/Adafruit_CircuitPython_Bundle/releases/tag/20241128).

Il est également possible de télécharger directement l'archive en cliquant sur le lien ci-dessous : 

> [Lien l'archive "adafruit-circuitpython-bundle-8.x-mpy-20241128.zip"
](https://github.com/adafruit/Adafruit_CircuitPython_Bundle/releases/download/20241128/adafruit-circuitpython-bundle-8.x-mpy-20241128.zip)

Une fois de plus, décompressez l'archive à la racine de votre dossier créé pour la configuration de la DuckPi. Nous allons avoir besoin de piocher à l'intérieur de celle-ci, afin de récupérer certains fichiers bien spécifiques.

Voici les différentes copies à effectuer de ces archives décompressées vers votre DuckPi : 

1. Copiez les dossiers **"adafruit_hid"**, **"asyncio"** et **"adafruit_wsgi"** DANS le dossier **"lib"** de votre DuckPi

    ***Chemins pour trouver les dossier en question :***

    `/adafruit-circuitpython-bundle-8.x-mpy-20240917/lib/adafruit_hid`{: .filepath}

    `/adafruit-circuitpython-bundle-8.x-mpy-20240917/lib/asyncio`{: .filepath}

    `/adafruit-circuitpython-bundle-8.x-mpy-20240917/lib/adafruit_wsgi`{: .filepath}

2. Copiez les fichiers **"adafruit_debouncer.mpy"** et **"adafruit_ticks.mpy"** DANS le dossier **"lib"** de votre DuckPi

    ***Chemins pour trouver les fichiers en question :***

    `/adafruit-circuitpython-bundle-8.x-mpy-20240917/lib/adafruit_debouncer.mpy`{: .filepath}

    `/adafruit-circuitpython-bundle-8.x-mpy-20240917/lib/adafruit_ticks.mpy`{: .filepath}

3. Copiez les fichiers **"boot.py"**, **"duckyinpython.py"**, **"code.py"**, **"webapp.py"** et **"wsgiserver.py"** provenant de votre clone du GitHub, A LA RACINE de votre DuckPi

    ***Chemins pour trouver les fichiers en question :***

    `/pico-ducky-main/boot.py`{: .filepath}
    
    `/pico-ducky-main/duckyinpython.py`{: .filepath}

    `/pico-ducky-main/code.py`{: .filepath}

    `/pico-ducky-main/webapp.py`{: .filepath}

    `/pico-ducky-main/wsgiserver.py`{: .filepath}

> Choisissez de remplacer les fichiers existants sur votre DuckPi par ceux que vous êtes en train de copier.
{: .prompt-warning}

### 5. Modifier la langue de saisie du payload
Par défaut, le clavier simulé lors de l'injection du payload est en QWERTY, ce qui est gênant pour la suite des opérations : les touches pressées ne seront pas les bonnes et le payload ne fera pas le travail attendu ! 

Pour remédier à cela, il faut télécharger une nouvelle archive, nommée **"circuitpython-keyboard-layouts-8.x-mpy-20231122.zip"**. Cette archive est proposée sur une autre page GitHub, à retrouver [ici](https://github.com/Neradoc/Circuitpython_Keyboard_Layouts/releases/tag/20231122).

Il est également possible de télécharger directement l'archive en cliquant sur le lien ci-dessous : 

> [Lien l'archive "circuitpython-keyboard-layouts-8.x-mpy-20231122.zip"](https://github.com/Neradoc/Circuitpython_Keyboard_Layouts/releases/download/20231122/circuitpython-keyboard-layouts-8.x-mpy-20231122.zip)

Je vous conseille une fois de plus de décompresser cette archive dans votre dossier de configuration DuckPi, nous allons de nouveau piocher à l'intérieur.

Vous allez devoir copier deux fichiers, nommés **"keyboard_layout_win_fr.mpy"** et **"keycode_win_fr.mpy"** DANS le dossier **"lib"** de votre DuckPi

***Chemins pour trouver les fichiers en question :***

`/circuitpython-keyboard-layouts-8.x-mpy-20231122/lib/keyboard_layout_win_fr.mpy`{: .filepath}

`/circuitpython-keyboard-layouts-8.x-mpy-20231122/lib/keycode_win_fr.mpy`{: .filepath}*

Ensuite, vous allez devoir modifier le fichier **"duckyinpython.py"**, afin de lui indiquer d'utiliser les fichiers que vous venez de copier pour la saisie au clavier au lieu de ceux de base.

Ouvrez donc le fichier **"duckyinpython.py"** dans votre éditeur de texte favori et remplacez ces lignes : 

```python
# comment out these lines for non_US keyboards
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS as KeyboardLayout
from adafruit_hid.keycode import Keycode

# uncomment these lines for non_US keyboards
# replace LANG with appropriate language
#from keyboard_layout_win_LANG import KeyboardLayout
#from keycode_win_LANG import Keycode
```
{: file="duckyinpython.py" }

par : 

```python
# comment out these lines for non_US keyboards
#from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS as KeyboardLayout
#from adafruit_hid.keycode import Keycode

# uncomment these lines for non_US keyboards
# replace LANG with appropriate language
from keyboard_layout_win_fr import KeyboardLayout
from keycode_win_fr import Keycode
```
{: file="duckyinpython.py" }

De cette manière, vous forcez l'utilisation de la bibliothèque française, que vous venez de télécharger.

### 6. Créer son premier payload et le tester
Pour que votre DuckPi fonctionne, vous allez avoir besoin de créer un payload ou en copier un déjà existant. Nommé **"payload.dd"**, ce fichier regroupe les différentes instructions que le microcontrôleur devra exécuter en tant que clavier virtuel, afin
d'accomplir la tâche souhaitée.

> Pour que votre payload soit bien pris en compte et exécuté lors de l'insertion dans le PC, celui-ci doit obligatoirement porter le nom **"payload.dd"**.
{: .prompt-warning}

De base, vous retrouverez dans le clone du dépôt GitHub **"pico-ducky-main"** un payload qui, quand on l'ouvre avec un éditeur de texte, nous révèle les instructions suivantes : 

```
REM The next four lines open Notepad in Windows and type "Hello World!"
GUI r
STRING notepad
ENTER
DELAY 250
STRING Hello World!
```
{: file="payload.dd" }

La première ligne fait office de commentaire, elle est là pour vous indiquer le but de ce payload. Ensuite, nous aurons les actions suivantes dans l'ordre : 

- Appuyer sur la touche WINDOWS + R
- Taper au clavier "notepad"
- Appuyer sur la touche ENTREE
- Attendre 250ms (pour s'assurer que le bloc notes soit ouvert)
- Taper au clavier "Hello World!"

Je vous conseille de le modifier légèrement pour s'assurer qu'il fonctionne bien (modifications et ajout d'un délai) :

```
REM The next four lines open Notepad in Windows and type "Hello World!"
GUI r
DELAY 250
STRING notepad
ENTER
DELAY 1000
STRING Hello World!
```
{: file="payload.dd" }

Ce fichier **"payload.dd"** doit être simplement copié à la racine de votre DuckPi pour qu'il puisse être exécuté !

Je ne vais pas rentrer plus dans le détail de la création de payloads. Voici cependant quelques ressources qui pourront vous aider à concevoir vos propres payloads : 

> [Lien vers le repo GitHub de la Rubber Ducky, disposant de payloads existants et fonctionnels](https://github.com/hak5/usbrubberducky-payloads/tree/master)

> [Lien vers l'éditeur de payload de Hak5"](https://docs.hak5.org/payload-studio)

## Modifier le payload sans se faire avoir
Vous avez terminé la configuration de la DuckPi et ça fonctionne, bravo ! 

Mais maintenant, une question vous taraude : comment êtes-vous censé procéder pour aller éditer le payload à exécuter, sans devenir la cible de celui-ci lorsque vous branchez la clé ?

Vous vous retrouvez littéralement dans la position de **l'arroseur arrosé**...

![Arroseur Arrosé](/assets/img/posts/duckpi/arroseur_arrosé.gif)
*Et maintenant, comment éditer le payload sans me faire avoir en branchant la DuckPi ?*

Vous pourriez appuyer de nouveau sur le bouton-poussoir Boot lors de l'insertion de la DuckPi. Mais je ne vous le conseille pas vraiment : oui, vous n'allez pas être la cible du payload que vous venez de créer, mais vous allez
devoir effectuer de nouveau toute la configuration que vous venez d'achever !

Ne vous inquiétez pas, cette problématique a été pensé par l'auteur du projet logiciel, et par extension lors de la conception Hardware.

Si vous êtes donc dans cette situation, vous allez devoir actionner le sélecteur SET, à l'aide d'un cure-dent par exemple (histoire de ne pas endommager le sélecteur avec un objet métallique). Une fois poussé vers le haut,
ce sélecteur aura pour objectif de ne pas injecter le payload lors de l'insertion. Vous pourrez alors modifier les fichiers embarqués dans la DuckPi à votre guise ! 

Pensez bien à remettre le sélecteur dans sa position basse une fois les modifications effectuées pour pouvoir l'essayer.

![Sélecteur SET](/assets/img/posts/duckpi/selecteur_set.gif)
*Poussez le sélecteur SET vers le **haut** pour empêcher l'injection lors de l'insertion*

## Fonctionnalité bonus (Stealth USB)
Une fois que vous avez bien programmé votre DuckPi, vous pouvez activer le sélecteur de droite, noté **"USB"**. 

Ce sélecteur a pour objectif de rendre la clé invisible dans l'explorateur de fichiers (afin de ne pas éveiller les soupçons j'imagine). La DuckPi n'apparaît plus comme un "Mass Storage Device",
vous ne verrez plus "CIRCUITPY".

Poussez simplement le sélecteur USB pour activer cette fonctionnalité !

Pensez à remettre le sélecteur dans sa position de base pour modifier le payload à nouveau par exemple.

### Fin du tutoriel
Et voilà, vous pouvez désormais profiter pleinement de votre DuckPi dans sa version V1.1.

N'hésitez pas à me faire des retours sur votre parcours d'utilisation, notamment si vous avez rencontré des obstacles lors de sa configuration ! 😉