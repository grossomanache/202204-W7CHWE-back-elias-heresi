# Social network : Back-end

## Routes

- POST ('users/register/'): Register a new user to the database
- POST ('users/login/'): Login a user to the network, delivering a token
- GET ('users/list/'): Obtain a complete list of users in the network
- GET ('profile/detail/'): Modify the logged user's contact information.
- GET ('profile/detail/:id'): Obtain the selected contact's public information.
- PUT ('profile/detail/'): Modify the logged user's contact information.
- GET ('contacts/all'): Obtain the logged user's contacts
- GET ('contacts/friends'): Obtain the logged user's friends
- GET ('contacts/enemies'): Obtain the logged user's enemies

## Schema types: User

- Name
  - type: String
  - Required
- Username
  - type: String
  - Required
- Password
  - type: String
  - Required
- Image
  - type: File
- Friends
  - type: [{type: schemaType.ObjectId, ref: User}]
  - Required
- Enemies

  - type: [{type: schemaType.ObjectId, ref: User}]
  - Required

  ## Original challenge

Crea una red social con React. La aplicación sólo se puede usar estando logueado (post **LOGIN**; post **REGISTER**) (en abierto únicamente se puede ver login y registro), y una vez iniciada la sesión, el usuario puede ver un listado de otros usuarios de la red. (**USERLIST**)

El usuario podrá editar su perfil (**EDITPROFILE**).

De cada usuario podrá ver su perfil(**SEE OTHER**), y podrá añadirlo como amigo o como enemigo (**ADD/DELETE**) (o cambiar entre ambos).

En el listado de usuarios debe poder haber un filtro para enseñarlos todos, o sólo los amigos, o sólo los enemigos (**FILTER ALL** / **FILTER FRIENDS** / **FILTER ENEMIES**). El listado debe mostrar el total de usuarios (o amigos/enemigos si se ha usado el filtro).

La red social consumirá los datos de una API desarrollada con Express, conectada a una base de datos en MongoDB. La validación de usuario se implementará mediante JWT.

La API almacenará las imágenes en el propio servidor
