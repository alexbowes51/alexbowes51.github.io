import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateGameData {
  game_insert: Game_Key;
}

export interface CreateGameVariables {
  title: string;
  genre: string;
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

export interface LeaderboardSummary_Key {
  id: UUIDString;
  __typename?: 'LeaderboardSummary_Key';
}

export interface ListTopScoresData {
  scores: ({
    value: number;
    platform?: string | null;
    player: {
      nickname: string;
    };
  })[];
}

export interface ListTopScoresVariables {
  gameId: UUIDString;
}

export interface Player_Key {
  id: UUIDString;
  __typename?: 'Player_Key';
}

export interface RegisterPlayerData {
  player_insert: Player_Key;
}

export interface RegisterPlayerVariables {
  nickname: string;
  joinDate: DateString;
}

export interface Score_Key {
  id: UUIDString;
  __typename?: 'Score_Key';
}

export interface UpdatePlayerEmailData {
  player_update?: Player_Key | null;
}

export interface UpdatePlayerEmailVariables {
  id: UUIDString;
  email: string;
}

interface CreateGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
  operationName: string;
}
export const createGameRef: CreateGameRef;

export function createGame(vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;
export function createGame(dc: DataConnect, vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface RegisterPlayerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterPlayerVariables): MutationRef<RegisterPlayerData, RegisterPlayerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegisterPlayerVariables): MutationRef<RegisterPlayerData, RegisterPlayerVariables>;
  operationName: string;
}
export const registerPlayerRef: RegisterPlayerRef;

export function registerPlayer(vars: RegisterPlayerVariables): MutationPromise<RegisterPlayerData, RegisterPlayerVariables>;
export function registerPlayer(dc: DataConnect, vars: RegisterPlayerVariables): MutationPromise<RegisterPlayerData, RegisterPlayerVariables>;

interface ListTopScoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTopScoresVariables): QueryRef<ListTopScoresData, ListTopScoresVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTopScoresVariables): QueryRef<ListTopScoresData, ListTopScoresVariables>;
  operationName: string;
}
export const listTopScoresRef: ListTopScoresRef;

export function listTopScores(vars: ListTopScoresVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopScoresData, ListTopScoresVariables>;
export function listTopScores(dc: DataConnect, vars: ListTopScoresVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopScoresData, ListTopScoresVariables>;

interface UpdatePlayerEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayerEmailVariables): MutationRef<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePlayerEmailVariables): MutationRef<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;
  operationName: string;
}
export const updatePlayerEmailRef: UpdatePlayerEmailRef;

export function updatePlayerEmail(vars: UpdatePlayerEmailVariables): MutationPromise<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;
export function updatePlayerEmail(dc: DataConnect, vars: UpdatePlayerEmailVariables): MutationPromise<UpdatePlayerEmailData, UpdatePlayerEmailVariables>;

