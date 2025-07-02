
# 🚗 YourCarYourWay — POC Chat Support & Client

Bienvenue sur **YourCarYourWay**, un projet *Proof of Concept* démontrant un système de chat temps réel entre un **client** et un **service support**, développé en **Angular** pour le front-end et **Spring Boot** pour le back-end.

---

## Objectif

L’objectif est de valider :
- La communication temps réel via **WebSocket** (STOMP)
- L’isolation de deux interfaces : **Client** et **Support**
- Un workflow minimal viable pour une future mise en production

---

## Cloner le projet

```bash
git clone https://github.com/KevinWlk/poc_your_car_your_way
```
---

## Lancer le Back-End

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

- L’API démarre sur **http://localhost:8080**

---

## Lancer le Front-End

```bash
cd frontend
npm install
ng serve
```

- L’application Angular est disponible sur **http://localhost:4200**

---

## Tester le POC

Pour tester la discussion temps réel :
1) Ouvre **2 fenêtres de navigation privée** (pour simuler deux sessions indépendantes).  
2) Accède aux routes suivantes :
- **Client** : [http://localhost:4200/client-chat](http://localhost:4200/client-chat)
- **Support** : [http://localhost:4200/support-chat](http://localhost:4200/support-chat)

3) Envoie un message depuis l’une des interfaces :
- Le message s’affiche instantanément sur l’autre côté.

---

## Architecture (Vue Simplifiée)

```
Client (Angular)
        |
    [ STOMP/WebSocket ]
        |
Serveur Spring Boot WebSocket
```

---

## Auteur

Kevin W. — *YourCarYourWay*