import { collection, schema } from '@verdant-web/store';
import cuid from 'cuid';
/**
 * Welcome to your lo-fi schema!
 *
 * The schema is where you define your data model.
 *
 * Read more at https://lo-fi.gfor.rest/docs/local-storage/schema
 *
 * The code below is provided as an example, but you'll
 * probably want to delete it and replace it with your
 * own schema.
 *
 * The schema is used to generate the client code for lo-fi.
 * After you've replaced this example schema, run `pnpm generate -f`
 * in the root directory to bootstrap your client.
 *
 * For subsequent changes to your schema, use just `pnpm generate`.
 */ const sessions = collection({
    name: 'session',
    primaryKey: 'id',
    fields: {
        id: {
            type: 'string',
            default: 'default'
        },
        // history stack of visited locations
        history: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
});
const annotations = collection({
    name: 'annotation',
    primaryKey: 'id',
    fields: {
        id: {
            type: 'string',
            default: cuid
        },
        location: {
            type: 'object',
            properties: {
                start: {
                    type: 'string'
                },
                end: {
                    type: 'string'
                }
            }
        },
        note: {
            type: 'string',
            nullable: true
        }
    }
});
export default schema({
    version: 1,
    collections: {
        sessions,
        annotations
    }
});
