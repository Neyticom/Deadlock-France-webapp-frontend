| En tant que ... | Je peux ... | Contexte (accès)  | Contraintes (connexion/note importante/...) |
| :---: |:------:| :-------: | :-------: |
<<<<<<< Updated upstream
| Visiteurs  | Consulter la page d'accueil | via l'url de base (/) | via l'url de base (/) |
| Visiteur             | Consulter le détail d'un patchnote     | via l'url `/patchnotes/:id`       | `id` doit être valide                                 |
| Utilisateur          | Se connecter                          | via la page `/login`              | Nécessite un compte utilisateur                       |
| Utilisateur          | S'inscrire                            | via la page `/register`           | Doit fournir un email et un mot de passe valides      |
=======
| Visiteurs  | Consulter la page d'accueil (Dernière patchnote affichée par défaut) | via l'url de base (/) | - |
| Visiteur             | Consulter le détail d'un patchnote     | via l'url `/patchnotes/:id`       | `id` doit être valide <br/> (Dernière patchnote affichée par défaut)                                 |
| Utilisateur | Accéder à un système de donations | Via un bouton présent sur toutes les pages publiques | - |
| Utilisateur | Accéder aux réseaux sociaux | Via des boutons présents sur toutes les pages publiques | - |
| Administrateur          | Me connecter                          | via la page `/admin/login`              | Nécessite un compte administrateur, </br> Passer la double authentification (2FA)                      |
>>>>>>> Stashed changes
| Administrateur       | Accéder au panneau d'administration    | via l'url `/admin/pannel`         | Connexion requise, rôle admin                         |
| Administrateur       | Consulter les statistiques du site     | via l'url `/admin/stats`          | Connexion requise, rôle admin                         |
| Administrateur       | Gérer les accès des utilisateurs       | via l'url `/admin/access`         | Connexion requise, rôle admin                         |
| Administrateur       | Gérer les patchnotes (CRUD)           | via l'url `/admin/patchnotes`     | Connexion requise, rôle admin                         |
| Administrateur       | Modifier les paramètres du site       | via l'url `/admin/params`         | Connexion requise, rôle admin                         |
