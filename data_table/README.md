## Data Table

UI that monitors and renders data from a backend API

### FrontEnd

Built with React.js & vite

The frontend is running from a docker image. The docker image is binded with the local source code in it's run command so that it picks any code changes made locally.
> source code will eventually be baked into the image, but binding the volume makes development easy.

```sh
cd /react/data_table
docker build -t react:sample-latest -f ./dockerfile/Dockerfile .
docker run --name react -p 8080:8080 -d --mount type=bind,source=$(pwd),target=/app react:sample-latest
```

here we are binding on port 8080 since we have configured vite to start the app on 8080 in vite.config.js
```javascript
//vite.config.js
    server: {
        host: true,
        strictPort: true,
        port: 8080,
    }
```

### BackEnd

I'm using python's FastApi package to act as a backend server. We start the _app_ defined in _main.py_ with hot reload. It starts on port 8000 by default.

```sh
uvicorn main:app --reload
```
currently this runs on the host machine and not in a container ( it will eventually )

### Communication

Since the frontend is running from a container and the backend is running on the host machine, a bit of special handling is needed to get them both in touch with one another

#### accessing host port from within the frondend container

To access the host machine's localhost from within the container we can make use of _host.docker.internal_
We configure vite to route all the calls to _/api_ to _host.docker.internal_

```javascript
//vite.config.js
    server: {
        cors: {origin:"*"},
        proxy: {
        '/api': {
            target: 'http://host.docker.internal:8000/', //we target port 8000 as that's where is backend is active
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ''),
        }
        }
    }
```

```javascript
//DataTable.jsx
fetch("/api") //we use /api to fetch the data
```