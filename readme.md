![League of girls](https://www.league-of-girls.com/img/logos/logo-log.svg)
**powered by [PICAPIPE GmbH](https://picapipe.com)**

This project was funded and supported by

[![netidee](https://www.netidee.at/themes/Netidee/images/netidee-logo-color.svg)](https://netidee.at)

## Documentation
https://github.com/PICAPIPE/league-of-girls/wiki

## Issues
https://github.com/PICAPIPE/league-of-girls/issues

## Developement

### Docker

This Repo is using docker for the environment. It's not required to use docker. If you don't want to you docker please use only the content of the src folder. Otherwise use the docker-compose files.

This repository provides 2 different yaml files. One for developement and one for production.

#### First steps with docker
https://www.docker.com/get-started

#### Using this repository
For using this repository please run the following instructions in the command line:
```
docker-compose up --build
```
Then attach to the app container and run the following commands

```
php artisan migrate
```

### Using Laravel-Echo for chat

Please make sure that you are using the follwoing endpoint.

```
"authEndpoint": "/api/auth/broadcasting",
```

## Feedback

[Feedback in German](https://docs.google.com/forms/d/e/1FAIpQLSfee4Kxq1c56MkhA0yPcOqdVtFBzOrFOowlks7uUz5XSwF9kw/viewform)

## Contributing

Thank you for considering contributing to the League of girls! Detailed information can be found at [PICAPIPE.com](http://picapipe.com).

## Security Vulnerabilities

If you discover a security vulnerability within League of girls, please send an e-mail to Manuel Pirker-Ihl via [mpi@picapipe.com](mailto:mpi@picapipe.com). All security vulnerabilities will be promptly addressed.

## License

League of girls is based on Laravel framework. Like Laravel League of girls is open-sourced software licensed under [MIT license](https://opensource.org/licenses/MIT).
