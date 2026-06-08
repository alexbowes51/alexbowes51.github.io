# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTopScores*](#listtopscores)
- [**Mutations**](#mutations)
  - [*CreateGame*](#creategame)
  - [*RegisterPlayer*](#registerplayer)
  - [*UpdatePlayerEmail*](#updateplayeremail)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListTopScores
You can execute the `ListTopScores` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTopScores(vars: ListTopScoresVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopScoresData, ListTopScoresVariables>;

interface ListTopScoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTopScoresVariables): QueryRef<ListTopScoresData, ListTopScoresVariables>;
}
export const listTopScoresRef: ListTopScoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTopScores(dc: DataConnect, vars: ListTopScoresVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopScoresData, ListTopScoresVariables>;

interface ListTopScoresRef {
  ...
  (dc: DataConnect, vars: ListTopScoresVariables): QueryRef<ListTopScoresData, ListTopScoresVariables>;
}
export const listTopScoresRef: ListTopScoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTopScoresRef:
```typescript
const name = listTopScoresRef.operationName;
console.log(name);
```

### Variables
The `ListTopScores` query requires an argument of type `ListTopScoresVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTopScoresVariables {
  gameId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTopScores` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTopScoresData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTopScoresData {
  scores: ({
    value: number;
    platform?: string | null;
    player: {
      nickname: string;
    };
  })[];
}
```
### Using `ListTopScores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTopScores, ListTopScoresVariables } from '@dataconnect/generated';

// The `ListTopScores` query requires an argument of type `ListTopScoresVariables`:
const listTopScoresVars: ListTopScoresVariables = {
  gameId: ..., 
};

// Call the `listTopScores()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTopScores(listTopScoresVars);
// Variables can be defined inline as well.
const { data } = await listTopScores({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTopScores(dataConnect, listTopScoresVars);

console.log(data.scores);

// Or, you can use the `Promise` API.
listTopScores(listTopScoresVars).then((response) => {
  const data = response.data;
  console.log(data.scores);
});
```

### Using `ListTopScores`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTopScoresRef, ListTopScoresVariables } from '@dataconnect/generated';

// The `ListTopScores` query requires an argument of type `ListTopScoresVariables`:
const listTopScoresVars: ListTopScoresVariables = {
  gameId: ..., 
};

// Call the `listTopScoresRef()` function to get a reference to the query.
const ref = listTopScoresRef(listTopScoresVars);
// Variables can be defined inline as well.
const ref = listTopScoresRef({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTopScoresRef(dataConnect, listTopScoresVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.scores);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.scores);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateGame
You can execute the `CreateGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGame(vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface CreateGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
}
export const createGameRef: CreateGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGame(dc: DataConnect, vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface CreateGameRef {
  ...
  (dc: DataConnect, vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
}
export const createGameRef: CreateGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGameRef:
```typescript
const name = createGameRef.operationName;
console.log(name);
```

### Variables
The `CreateGame` mutation requires an argument of type `CreateGameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGameVariables {
  title: string;
  genre: string;
}
```
### Return Type
Recall that executing the `CreateGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGameData {
  game_insert: Game_Key;
}
```
### Using `CreateGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGame, CreateGameVariables } from '@dataconnect/generated';

// The `CreateGame` mutation requires an argument of type `CreateGameVariables`:
const createGameVars: CreateGameVariables = {
  title: ..., 
  genre: ..., 
};

// Call the `createGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGame(createGameVars);
// Variables can be defined inline as well.
const { data } = await createGame({ title: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGame(dataConnect, createGameVars);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
createGame(createGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

### Using `CreateGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGameRef, CreateGameVariables } from '@dataconnect/generated';

// The `CreateGame` mutation requires an argument of type `CreateGameVariables`:
const createGameVars: CreateGameVariables = {
  title: ..., 
  genre: ..., 
};

// Call the `createGameRef()` function to get a reference to the mutation.
const ref = createGameRef(createGameVars);
// Variables can be defined inline as well.
const ref = createGameRef({ title: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGameRef(dataConnect, createGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

## RegisterPlayer
You can execute the `RegisterPlayer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registerPlayer(vars: RegisterPlayerVariables): MutationPromise<RegisterPlayerData, RegisterPlayerVariables>;

interface RegisterPlayerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterPlayerVariables): MutationRef<RegisterPlayerData, RegisterPlayerVariables>;
}
export const registerPlayerRef: RegisterPlayerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registerPlayer(dc: DataConnect, vars: RegisterPlayerVariables): MutationPromise<RegisterPlayerData, RegisterPlayerVariables>;

interface RegisterPlayerRef {
  ...
  (dc: DataConnect, vars: RegisterPlayerVariables): MutationRef<RegisterPlayerData, RegisterPlayerVariables>;
}
export const registerPlayerRef: RegisterPlayerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registerPlayerRef:
```typescript
const name = registerPlayerRef.operationName;
console.log(name);
```

### Variables
The `RegisterPlayer` mutation requires an argument of type `RegisterPlayerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegisterPlayerVariables {
  nickname: string;
  joinDate: DateString;
}
```
### Return Type
Recall that executing the `RegisterPlayer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegisterPlayerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegisterPlayerData {
  player_insert: Player_Key;
}
```
### Using `RegisterPlayer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registerPlayer, RegisterPlayerVariables } from '@dataconnect/generated';

// The `RegisterPlayer` mutation requires an argument of type `RegisterPlayerVariables`:
const registerPlayerVars: RegisterPlayerVariables = {
  nickname: ..., 
  joinDate: ..., 
};

// Call the `registerPlayer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registerPlayer(registerPlayerVars);
// Variables can be defined inline as well.
const { data } = await registerPlayer({ nickname: ..., joinDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registerPlayer(dataConnect, registerPlayerVars);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
registerPlayer(registerPlayerVars).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

### Using `RegisterPlayer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registerPlayerRef, RegisterPlayerVariables } from '@dataconnect/generated';

// The `RegisterPlayer` mutation requires an argument of type `RegisterPlayerVariables`:
const registerPlayerVars: RegisterPlayerVariables = {
  nickname: ..., 
  joinDate: ..., 
};

// Call the `registerPlayerRef()` function to get a reference to the mutation.
const ref = registerPlayerRef(registerPlayerVars);
// Variables can be defined inline as well.
const ref = registerPlayerRef({ nickname: ..., joinDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registerPlayerRef(dataConnect, registerPlayerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

## UpdatePlayerEmail
You can execute the `UpdatePlayerEmail` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePlayerEmail(vars: UpdatePlayerEmailVariables): MutationPromise<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;

interface UpdatePlayerEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayerEmailVariables): MutationRef<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;
}
export const updatePlayerEmailRef: UpdatePlayerEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePlayerEmail(dc: DataConnect, vars: UpdatePlayerEmailVariables): MutationPromise<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;

interface UpdatePlayerEmailRef {
  ...
  (dc: DataConnect, vars: UpdatePlayerEmailVariables): MutationRef<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;
}
export const updatePlayerEmailRef: UpdatePlayerEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePlayerEmailRef:
```typescript
const name = updatePlayerEmailRef.operationName;
console.log(name);
```

### Variables
The `UpdatePlayerEmail` mutation requires an argument of type `UpdatePlayerEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePlayerEmailVariables {
  id: UUIDString;
  email: string;
}
```
### Return Type
Recall that executing the `UpdatePlayerEmail` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePlayerEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePlayerEmailData {
  player_update?: Player_Key | null;
}
```
### Using `UpdatePlayerEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePlayerEmail, UpdatePlayerEmailVariables } from '@dataconnect/generated';

// The `UpdatePlayerEmail` mutation requires an argument of type `UpdatePlayerEmailVariables`:
const updatePlayerEmailVars: UpdatePlayerEmailVariables = {
  id: ..., 
  email: ..., 
};

// Call the `updatePlayerEmail()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePlayerEmail(updatePlayerEmailVars);
// Variables can be defined inline as well.
const { data } = await updatePlayerEmail({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePlayerEmail(dataConnect, updatePlayerEmailVars);

console.log(data.player_update);

// Or, you can use the `Promise` API.
updatePlayerEmail(updatePlayerEmailVars).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

### Using `UpdatePlayerEmail`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePlayerEmailRef, UpdatePlayerEmailVariables } from '@dataconnect/generated';

// The `UpdatePlayerEmail` mutation requires an argument of type `UpdatePlayerEmailVariables`:
const updatePlayerEmailVars: UpdatePlayerEmailVariables = {
  id: ..., 
  email: ..., 
};

// Call the `updatePlayerEmailRef()` function to get a reference to the mutation.
const ref = updatePlayerEmailRef(updatePlayerEmailVars);
// Variables can be defined inline as well.
const ref = updatePlayerEmailRef({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePlayerEmailRef(dataConnect, updatePlayerEmailVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

