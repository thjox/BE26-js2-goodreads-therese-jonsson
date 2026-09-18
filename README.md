# Goodreads

Goodreads är en enkel webbapplikation där användaren kan lägga till, söka, markera som läst eller oläst, betygsätta och ta bort böcker.

## Struktur

Jag har valt att dela upp projektet i flera moduler för att göra koden lättare att läsa och underhålla.

- Book.js – innehåller Book-klassen.
- books.js – hanterar den lokala listan med böcker.
- firebase.js – hanterar kommunikationen med Firebase.
- render.js – visar böckerna i gränssnittet.
- events.js – hanterar användarens events och sökfunktion.
- main.js – startar applikationen och hämtar böckerna.

## Backend

Jag använder Firebase Realtime Database som backend och kommunicerar med databasen genom REST API.
GET, POST, PATCH och DELETE används för att hämta, lägga till, uppdatera och ta bort böcker.

## AddBook

När användaren lägger till en bok skickas bokinformationen först till Firebase med POST.
Firebase sparar boken och skickar tillbaka ett unikt id. Därefter skapas en ny `Book`-instans med `addBookToLocalList()` och läggs till i den lokala `books`-arrayen.
Till sist körs 'renderBooks()' så att den nya boken visas direkt på sidan.
Formulär → Firebase → books[] → renderBooks()

## Sökfunktion

Sökfunktionen använder 'filter()' för att söka efter titel eller författare i den lokala 'books'-arrayen.
Sökningen ändrar inte den ursprungliga listan utan skickar de matchande böckerna till 'renderBooks()'.
