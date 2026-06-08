# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createGame, registerPlayer, listTopScores, updatePlayerEmail } from '@dataconnect/generated';


// Operation CreateGame:  For variables, look at type CreateGameVars in ../index.d.ts
const { data } = await CreateGame(dataConnect, createGameVars);

// Operation RegisterPlayer:  For variables, look at type RegisterPlayerVars in ../index.d.ts
const { data } = await RegisterPlayer(dataConnect, registerPlayerVars);

// Operation ListTopScores:  For variables, look at type ListTopScoresVars in ../index.d.ts
const { data } = await ListTopScores(dataConnect, listTopScoresVars);

// Operation UpdatePlayerEmail:  For variables, look at type UpdatePlayerEmailVars in ../index.d.ts
const { data } = await UpdatePlayerEmail(dataConnect, updatePlayerEmailVars);


```