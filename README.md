## Opis
Repozitorij napravljen za alboratorijske vježbe na predmetu Otvoreno Računarstvo

## Licenca
CC0 1.0 Universal

## Autor
Petar Hajduk

## Verzija skupa podataka 
1.0

## Jezik podataka 
hrvatski

## Format podataka
JSON i CSV

## Datum izdavanja
02.11.2023.

## Nazivi i opisi atributa
Menadžer:

manager_id - jedinstveni identifikacijski broj svakog menadžera
username - korisničko ime menadžera
email - email adresa menadžera
password_hash - sažetak lozinke menadžera

Upit:

post_id - jedintveni indentifikacijski broj svakog upita
thread_id - jedinstveni indentifikacijski broj svake dretve kojoj upit pripada
za_koga_id - jedinstveni indentifikacijski broj menadžera kojem je upit namijenjen (strani ključ), unutar jedne dretve svi upiti imaju isti id
subjectt - svaka dretva se sastoji od više upita, ali dretva ima uvijek istu temu tj. temu razgovora, svaki upit koji se nalazi u nekoj dretvi ima isti subjectt tj. temu razgovora
poruka - svaki upit u sebi sadrži neki tekst, to je tekst upita, može biti rečenica, paragraf pitanje itd. uglavnom neki neodređeni string
manager_vidio - kada god menadžer pročita upit kojeg mu je poslao anonimni pošiljatelj, ova zastavica se postavlja na true kako bi anonimni pošiljatelj znao je li menadžer pročitao poruku
from_manager - ova zastavica se postavlja pri kreaciji upita, ako je upit kreirao sam menadžer (npr. u svrhu odgovaranja na prethodni upit anonimnog pošiljatelja) ova zastavica se postavlja na true, a ako upit ne dolazi od menadžera onda se postavlja na false
time_created - ovaj podatak služi za bilježenje trenutka kada je upit kreiran i poslan u obliku timestamp-a
time_manager_saw - ako poruka ne dolazi od menadžera, onda se u ovaj podatak bilježi trenutak kada je menadžer vidio poruku u obliku timestamp-a
closed - ova zastavica nam govori traje li rasprava još uvijek ili je rasprava gotova, ako je ili anonimni pošiljatelj ili menadžer odlučio zatvoriti dretvu (prekinuti rasgovor preko upita) onda se ova zastavica postavlja na true