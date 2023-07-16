import {
  ClientDescriptor,
  createHooks,
  migrations,
  UserInfo,
} from '@bible/verdant';
import { useCallback } from 'react';

export interface Presence {
  /**
   * Put any transient presence state for users
   * you want here
   */
}

// should match server
export interface Profile {
  id: string;
  name: string;
  imageUrl: string | null;
}

export type Participant = UserInfo<Profile, Presence>;

export const hooks = createHooks<Presence, Profile>().withMutations({
  useAddAnnotation: (client) =>
    useCallback((location: string) => {
      client.annotations.put({
        location,
      });
    }, []),
  usePushHistory: (client) =>
    useCallback(async (location: string) => {
      const defaultSession = await client.sessions.get('default').resolved;
      if (!defaultSession) {
        return;
      }
      const history = defaultSession.get('history');
      history.push(location);
      if (history.length > 10) {
        history.delete(0);
      }
    }, []),
});

export const clientDescriptor = new ClientDescriptor({
  namespace: 'bible',
  migrations,
});

// these are some helpers I like to use. You can delete them if you want.

async function exposeClientOnWindowForDebug() {
  const client = await clientDescriptor.open();
  (window as any).client = client;
}

async function registerUndoKeybinds() {
  const client = await clientDescriptor.open();
  document.addEventListener('keydown', async (e) => {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      const result = await client.undoHistory.undo();
      if (!result) {
        console.log('Nothing to undo');
      }
    }
    if (
      (e.key === 'y' && (e.ctrlKey || e.metaKey)) ||
      (e.key === 'z' && e.shiftKey && (e.ctrlKey || e.metaKey))
    ) {
      e.preventDefault();
      const result = await client.undoHistory.redo();
      if (!result) {
        console.log('Nothing to redo');
      }
    }
  });
}

exposeClientOnWindowForDebug();
registerUndoKeybinds();
