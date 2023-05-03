# Backend-Testeo-Funcionalidades

## Consigna
1) En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. 
2) Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos. **NO SE EXIGE**
3) Utilizar Apollo Studio para realizar la prueba funcional de los querys y las mutaciones.


## Entrega
Se ha modificado el proyecto para trabajar con consultas GraphQl.

### IMPLEMENTACION
Se han implementado en GraphQL ('localhost:8080/graphql') las rutas de productos y usuarios que estaban en RESTful.
Los scripts de la implementacion estan en la carpeta "graphql" donde se definen schemas y resolvers. Los resolvers usan las funciones "DTO" directamente sin usar las funciones "Controllers"

### PRUEBAS FUNCIONALES
Se han realizado pruebas funcionales mediante Apollo Studio, a continuacion un listado de las consultas realizadas:

1) query allProducts {
  products {
    title
    id
    price
  }
}

2) query productById($productId: ID!) {
  product(productId: $productId) {
    id
    title
  }
}.
Variables: {
  "productId": "64087a723fbf2aa4617905a1"
}

3) mutation AddProduct($productToAdd: ProductToAdd!) {
  addProduct(productToAdd: $productToAdd) {
    title,
    id
  }
}.
Variables: {
  "productToAdd": {
    "title": "123",
    "description": "1234",
    "code": 23,
    "price": 45,
    "stock": 13,
    "thumbnail": "cualquiera"
  }
}

4) mutation DelProductById($productId: ProductId!) {
  delProductById(productId: $productId)
}.
Variables: {
  "productId": {
    "id": "645104f7e8c93fc09330a261",
  }
}

5) mutation AddUser($user: User!) {
  addUser(user: $user)
}.
Variables: {
  "user": {
    "email": "123@123.123",
    "password": "123"
  }
}
