# Registre d'ús d'IA (AI_LOG)

Video: https://drive.google.com/file/d/1YlSDChyAo2GmfwtKGkOhUD-zqZB9z_Bw/view?usp=sharing

- **Eina utilitzada:** Google Gemini
- **Model IA:** Gemini 3 Flash

---

## Consulta 1: Estructura inicial de la store i components de favorits en React Web

- **Pregunta:** Com implementar la funcionalitat de llibres favorits amb Nano Stores (`favoritesStore`, `FavouriteButton` i `FavouriteList`) adaptada a l'arquitectura del projecte React BackOffice.
- **Prompt:** 
  > "Revisa mi codigo, en los import type { Book } from '../models/Book'; daba error porque era importado de book.models, no de Book. No te preocupes, ya lo he cambiado era para que lo tuvieras en cuenta." + [Script amb tot el codi del projecte React]
- **Incoherències:** 
  - Inicialment la IA va generar el codi amb una estructura genèrica, components declarats com `export const ...` i rutes d'importació incorrectes (`../models/Book` en lloc d'importar des de `../models` o `book.model`).
  - En integrar la ruta al router, va escriure `FavouritesList` en plural quan el fitxer es deia `FavouriteList.tsx`.
- **Solució:** 
  - Vaig proporcionar un fitxer amb tot el codi del projecte com a referència perquè l'assistent s'adaptés a les necesitats del projecte.
  - Vaig adaptar manualment el codi genèric proporcionat per la IA.

---

## Consulta 2: Persistència local amb `localStorage` a React Web

- **Pregunta:** Com persistir els llibres favorits al navegador perquè no es perdin en recarregar la pàgina, mantenint un codi senzill i compatible amb la configuració estricta de TypeScript del projecte.
- **Prompt:** 
  > "De acuerdo, quiero implementar persistencia local. Sería algo de este estilo? [codi amb atom + localStorage + listen]"
- **Incoherències:** 
  - La IA va proposar instal·lar una llibreria externa addicional (`@nanostores/persistent`) que no estava instal·lada al `package.json`.
  - En passar a `favoritesStore.listen()`, la IA va tipar el paràmetre com `(books: Book[])`, provocant un error de TypeScript (`ts(2345)`) perquè Nano Stores passa internament un array de només lectura (`readonly Book[]`), a més d'ometre tipus explícits en alguns callbacks amb `noImplicitAny` actiu.
- **Solució:** 
  - Es va descartar `@nanostores/persistent` i es va implementar la persistència nativa combinant `atom` amb `localStorage.getItem` / `setItem` dins de `favoritesStore.listen()`.
  - Es van afegir els tipus explícits `(b: Book)` als mètodes d'array i `(books: readonly Book[])` al listener de la store.

---

## Consulta 3: Adaptació dels favorits a React Native i Expo Router

- **Pregunta:** Com adaptar la store, el botó i la llista de favorits a l'aplicació mòbil en React Native (Expo), integrant-ho amb `AsyncStorage` i la navegació per pestanyes.
- **Prompt:** 
  > "De acuerdo, ahora tenemos que adaptar estas implementaciones a react native." + [Script amb tot el codi del projecte React Native]
- **Incoherències:** 
  - En importar `FavouriteList` a la nova pantalla `src/app/(tabs)/favorites.tsx`, la IA va escriure la ruta amb majúscula (`../../components/FavouriteList`) mentre que el fitxer creat estava en minúscula (`favouriteList.tsx`), donant error de *casing* a TypeScript (`ts(1149)`).
  - A `src/app/(tabs)/_layout.tsx`, el tipat de `color` a `tabBarIcon` va generar conflictes amb el tipus intern `ColorValue` (`Type '___ColorValue_Internal' is not assignable to type 'string'`).
- **Solució:** 
  - Es van instal·lar les dependències necessàries (`nanostores`, `@nanostores/react` i `@react-native-async-storage/async-storage`) i es va cridar `loadFavorites()` dins un `useEffect` al `_layout.tsx` arrel.
  - Es va corregir la ruta d'importació respectant les minúscules (`../../components/favouriteList`) i es va convertir el color de les icones mitjançant `String(color)` a `tabBarIcon`.