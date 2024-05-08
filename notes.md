# Bookink

Pour ce projet je pense fonctionner en classes, il va falloir que je révise.
Je vais donc créer une classes auth, une class user, et la class user va hériter de la class auth.
La class Auth, pourra créer des users avec login et register

### POUR LE BACKEND:

ce sera un backend en classes, api et controller, donc les méthodes seront écrites dans les classes, ensuite utiliser dans les controllers puis récupéré pour les routes.

[INSPIRATION](https://github.com/hastackdev/nuxt3-blog)

TODO:

- Class Auth =>
  - [X] hashPassword,
  - [X] comparePassword,
  - [ ] SendResetPasswordEmail,
  - [ ] ResetPassword,
- Class user =>
  - [X] setCookie,
  - [X] getCookie,
  - [X] isLogged,
  - [ ] getCookieId,