# sozu-api

Provide a REST HTTP API to read and update a sozu instance.

## :rocket: Launch it 

```bash
$ SOZU_SOCKET_PATH=PATH_TO_SOZU_SOCKET cargo run --release
    Finished release [optimized] target(s) in 0.0 secs
     Running `target/release/sozu-api`
🔧  Configured for development.
    => address: localhost
    => port: 8000
    => log: normal
    => workers: 4
🛰  Mounting '/workers':
    => GET /workers application/json
👾  Catchers:
    => 404
🚀  Rocket has launched from http://localhost:8000...
```
