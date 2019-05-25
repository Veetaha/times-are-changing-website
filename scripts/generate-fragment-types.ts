import fetch from 'node-fetch';
import fs from 'fs';

async function main() {
    const result = await (await fetch(`http://localhost/gql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            variables: {},
            query: `{
                __schema {
                    types {
                        kind
                        name
                        possibleTypes {
                            name
                        }
                    }
                }
            }`,
        }),
    })).json();

    // here we're filtering out any type information unrelated to unions or interfaces
    result.data.__schema.types = (result.data.__schema.types as any[]).filter(
        type => type.possibleTypes !== null,
    );
    fs.writeFileSync(`${__dirname}/../common/fragment-types.json`, JSON.stringify(result.data));
    console.log('Fragment types successfully extracted!');
}

main().catch(err => console.error(err));