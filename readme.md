# My Project

This project uses Docker and Docker Compose to make deployment and execution of the application easier.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (version 1.6.0 or higher recommended)
- Node 14

## Starting the project

1. Clone the project repository to your local machine:

```bash
git clone https://github.com/my-user/my-project.git
```

2. Navigate to the project directory:

```bash
cd my-project
```

3. If you are using Docker Compose version 1.6.0 or higher, use the following command to start the containers:

```bash
docker-compose up -d
```

4. If you are using an older version of Docker Compose, use the following command:

```bash
docker compose up -d
```

This will start the application containers in the background. You can check the status of the containers by running docker-compose ps.

5. Run API

    ```bash
        cd api/
    ```
    
    ```bash
        npm start
    ```
7. Run Worker

    ```bash
        cd worker/
    ```
    
    ```bash
        npm start
    ```

5. Stopping the project

To stop the containers, use the following command:
```bash
docker-compose stop
```

Ctrl+C to stop node apis


6. Removing containers

To remove the containers, use the following command:
```bash
docker-compose down
```
This will also delete any data stored in the application containers. If you want to preserve this data, use the docker-compose stop command instead.


    docker-compose exec <service> <command>: run a command in a running container
    docker-compose run <service> <command>: run a command in a new container

For more information on using Docker Compose, refer to the official documentation.

_________________________________________________________________________

Create order :

POST http://localhost:3000/order

Get order

GET http://localhost:3000/order/:id
