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
02.11.2022.

## Nazivi i opisi atributa
Menadžer:

manager_id - jedinstveni identifikacijski broj svakog menadžera
username - korisničko ime
email - email
password_hash - sažetak lozinke

Upit:

post_id - jedintveni indentifikacijski broj svakog upita
thread_id - jedinstveni indentifikacijski broj svake dretve kojoj upit pripada
za_koga_id - jedinstveni indentifikacijski broj menadžera kojem je upit namijenjen (strani ključ)
subjectt - tema dretve
poruka - sadržaj poruke
manager_vidio - informacija o tome je li menadžer vidio poruku ili nije
from_manager - informacija je li upit došao od strane menadžera (ako je true, onda se upit gleda kao menadžerov odgovor)
time_created - vrijeme kreacije
time_manager_saw - vrijeme kada je menadžer vidio poruku
closed