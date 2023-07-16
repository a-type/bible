import type schema from "./schema.js";
import type { StorageSchema } from "@verdant-web/common";
import type {
  Storage,
  StorageInitOptions,
  ObjectEntity,
  ListEntity,
  Query,
  ServerSync,
  EntityFile,
  CollectionQueries,
} from "@verdant-web/store";
export * from "@verdant-web/store";
export type Schema = typeof schema;

interface Collection<
  Document extends ObjectEntity<any, any>,
  Snapshot,
  Init,
  Filter
> {
  put: (init: Init, options?: { undoable?: boolean }) => Promise<Document>;
  delete: (id: string, options?: { undoable?: boolean }) => Promise<void>;
  deleteAll: (ids: string[], options?: { undoable?: boolean }) => Promise<void>;
  get: (id: string) => Query<Document>;
  findOne: (filter: Filter) => Query<Document>;
  findAll: (filter?: Filter) => Query<Document[]>;
  findAllPaginated: (
    filter?: Filter,
    pageSize?: number
  ) => Query<Document[], { offset?: number }>;
  findAllInfinite: (
    filter?: Filter,
    pageSize?: number
  ) => Query<Document[], { offset?: number }>;
}

export class Client<Presence = any, Profile = any> {
  readonly sessions: CollectionQueries<Session, SessionInit, SessionFilter>;

  readonly annotations: CollectionQueries<
    Annotation,
    AnnotationInit,
    AnnotationFilter
  >;

  sync: ServerSync<Profile, Presence>;
  undoHistory: Storage["undoHistory"];
  namespace: Storage["namespace"];
  entities: Storage["entities"];
  queryStore: Storage["queryStore"];
  batch: Storage["batch"];
  files: Storage["files"];

  close: Storage["close"];

  export: Storage["export"];
  import: Storage["import"];

  stats: () => Promise<any>;
  /**
   * Resets all local data. Use with caution. If this replica
   * is synced, it can restore from the server, but if it is not,
   * the data will be permanently lost.
   */
  __dangerous__resetLocal: Storage["__dangerous__resetLocal"];
}

// schema is provided internally. loadInitialData must be revised to pass the typed Client
interface ClientInitOptions<Presence = any, Profile = any>
  extends Omit<StorageInitOptions<Presence, Profile>, "schema"> {}

export class ClientDescriptor<Presence = any, Profile = any> {
  constructor(init: ClientInitOptions<Presence, Profile>);
  open: () => Promise<Client<Presence, Profile>>;
  readonly current: Client<Presence, Profile> | null;
  readonly readyPromise: Promise<Client<Presence, Profile>>;
  readonly schema: StorageSchema;
  readonly namespace: string;
  close: () => Promise<void>;
}
export type Session = ObjectEntity<SessionInit, SessionDestructured>;

export type SessionFilter = never;
export type SessionDestructured = {
  id: string;
  history: SessionHistory;
};
export type SessionInit = {
  id?: string;
  history?: SessionHistoryInit;
};
export type SessionSnapshot = {
  id: string;
  history: SessionHistorySnapshot;
};
/** Session sub-object types */

export type SessionId = string;
export type SessionIdInit = SessionId | undefined;
export type SessionIdSnapshot = SessionId;
export type SessionIdDestructured = SessionId;
export type SessionHistory = ListEntity<
  SessionHistoryInit,
  SessionHistoryDestructured
>;
export type SessionHistoryInit = Array<SessionHistoryItemInit>;
export type SessionHistoryDestructured = Array<SessionHistoryItem>;
export type SessionHistorySnapshot = Array<SessionHistoryItemSnapshot>;
export type SessionHistoryItem = string;
export type SessionHistoryItemInit = SessionHistoryItem;
export type SessionHistoryItemSnapshot = SessionHistoryItem;
export type SessionHistoryItemDestructured = SessionHistoryItem;
export type Annotation = ObjectEntity<AnnotationInit, AnnotationDestructured>;

export type AnnotationFilter = never;
export type AnnotationDestructured = {
  id: string;
  location: AnnotationLocation;
  note: string | null;
};
export type AnnotationInit = {
  id?: string;
  location: AnnotationLocationInit;
  note?: string | null;
};
export type AnnotationSnapshot = {
  id: string;
  location: AnnotationLocationSnapshot;
  note: string | null;
};
/** Annotation sub-object types */

export type AnnotationId = string;
export type AnnotationIdInit = AnnotationId | undefined;
export type AnnotationIdSnapshot = AnnotationId;
export type AnnotationIdDestructured = AnnotationId;
export type AnnotationLocation = ObjectEntity<
  AnnotationLocationInit,
  AnnotationLocationDestructured
>;
export type AnnotationLocationInit = {
  start: string;
  end: string;
};
export type AnnotationLocationDestructured = {
  start: string;
  end: string;
};
export type AnnotationLocationSnapshot = {
  start: string;
  end: string;
};
export type AnnotationLocationStart = string;
export type AnnotationLocationStartInit = AnnotationLocationStart;
export type AnnotationLocationStartSnapshot = AnnotationLocationStart;
export type AnnotationLocationStartDestructured = AnnotationLocationStart;
export type AnnotationLocationEnd = string;
export type AnnotationLocationEndInit = AnnotationLocationEnd;
export type AnnotationLocationEndSnapshot = AnnotationLocationEnd;
export type AnnotationLocationEndDestructured = AnnotationLocationEnd;

export type AnnotationNote = string | null;
export type AnnotationNoteInit = AnnotationNote | undefined;
export type AnnotationNoteSnapshot = AnnotationNote;
export type AnnotationNoteDestructured = AnnotationNote;
