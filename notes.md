# Bookink

Pour ce projet je pense fonctionner en classes, il va falloir que je révise.
Je vais donc créer une classes auth, une class user, et la class user va hériter de la class auth.
La class Auth, pourra créer des users avec login et register

### POUR LE BACKEND:

ce sera un backend en classes, api et controller, donc les méthodes seront écrites dans les classes, ensuite utiliser dans les controllers puis récupéré pour les routes.

[INSPIRATION](https://github.com/hastackdev/nuxt3-blog)

TODO:

- Class Auth =>
  - [x] hashPassword,
  - [x] comparePassword,
  - [x] SendResetPasswordEmail,
  - [x] ResetPassword,
- Class Session =>
  - [x] setCookie,
  - [x] getCookie,
  - [x] isLogged,
  - [x] getCookieId,

connecter google pour tps : https://nuxt.com/modules/nuxt-vue3-google-signin

Faire en sorte qu'un user puisse review un livre
