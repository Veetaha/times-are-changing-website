Welcome to **QueryBuilder** backend API documentation.

All interaction with the web-server is done via `GraphQL` query
language protocol, that simplifies the data flow drastically.

## Playground

Visit our [graphql playground](/gql) in order to try our API right now. If you want to authorized request from the playground CLICK HERE TO COPY YOUR AUTH BEARER TOKEN. and set http headers to 
```
{
    "Authorization": "Bearer ${Ctrl+V}"
}
```

## Authorization

The API consists of *queries* and *mutations* and
in order to do some *queries* and most of the *mutations*
you have to be authorized. To perform authorization, you should use `signIn()` *mutation*
that returns you `UserAndToken` object with the client account payload and **JWT** auth token. In order to authenticate your requests you should place this token into *HTTP* `"Authorization"` header.
```
Authorization: Bearer ${token}
```
Replace `${token}` with the string that is stored in `UserAndToken.token` property and you'll get your request authenticated.

## GraphQL docs

[You can view GraphQL API documentation here](/gql/docs), it was generated automatically by
[`'graphdoc'`](https://www.npmjs.com/package/@2fd/graphdoc).

