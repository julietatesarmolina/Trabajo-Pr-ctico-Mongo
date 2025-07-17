# Anti-Social API

Es un sistema backend para una red social llamada “UnaHur Anti-Social Net”, inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas.

# Instalación y ejecución

1. **Clonar el repositorio**
   - Debe ir al enlace y **clonar el repositorio en su computadora**.

Luego de clonar el repositorio en su computadora debe abrirlo en visual studio e instalar todas las dependencias (npm i). También, deberá abrir `Docker` y ejecutar en la terminal del proyecto `docker-compose up -d`. Por último, correr el comando `npm run dev`.

Después de eso, podra realizar las consultas en `postman` mediante la url `localhost:3000`.

Para poder visualizar la DB, se podrá utilizar MongoDB Compass, pegando la URI _mongodb://admin:admin123@localhost:27017/miDB?authSource=admin_

# Documentación

La documentación de la `api` fue generada utilizando `Swagger` en formato `YAML` donde se encuentran todos los `endpoints` definidos.

# API

#### /users

- `get`: Obtener todos los `usuarios` del `sistema`.
- `post`: Crear un `usuario` al `sistema`.
- `put` : Modificar un `usuario` en el `sistema` por `id`.
- `delete` : Eliminar un `usuario` del `sistema` por `id`.

#### /posts

- `get`: Obtener todos los `posts` de un `usuario`.
- `post`: Crear un `post` en el `usuario`.
- `put` : Modificar un `post` del `usuario` por `id`.
- `delete` : Eliminar un `post` del `usuario` por `id`.

#### /posts/:id/images/:imageId

- `put` : Modifica la `url` de una imagen en un `post`
- `delete`: Elimina la `url` de una imagen en un `post`

#### /comments

- `get`: Obtener todos los `comentarios` de un `post`.
- `post`: Crear un `comentario` en el `post`.
- `put` : Modificar un `comentario` en el `post` por `id`.
- `delete` : Eliminar un `comentario` del `post` por `id`.

#### /tags

- `get`: Obtener todos las `tags` del `post`.
- `post`: Crear un `tags` en el `post`.
- `put` : Modificar un `tags` en el `post` por `id`.
- `delete` : Eliminar un `tags` del `post` por `id`.

#### /comment-tags

- `get` : Obtener todos los `tags` asociados a un `post` especifico por `id`.
- `post`: Asignar un tag a un `post`.
- `delete` : Eliminar la asociacion de un `tag` a un `post`

#### /post_Images

- `get`: Obtener todas las `imágenes` de imagenes de `post`.
- `post`: Subir una nueva `imagen` de imagen de `post`.

#### /post_Images/{id}

- `put` : Actualizar una `imagen` de imagen de `post` por `id`.
- `delete` : Eliminar una `imagen` de imagen de `post` por `id`.

#### /followers

- `get`: Obtener todos los `follows` del sistema.

#### /followers/:userId/obtenerSeguidores

- `get`: Obtener los `seguidores` de un `usuario` específico.

#### /followers/:userId/obtenerSeguidos

- `get`: Obtener los `usuarios seguidos` de un `usuario` específico.

#### /followers/:userId/follow

- `post`: Crear el `seguimiento` de un `usuario`.

#### /followers/:userId/unfollow/:unfollowedUserId

- `delete`: Dejar de `seguir` a un `usuario`.
