# Friend Management

How to use

Ensure docker and docker-compose are installed.

You can then build and run the Docker image:

`docker-compose build`

`docker-compose up` and to build it in backgroud `docker-compose up -d`

check if everything works fine `docker ps`

webapp runs on 172.17.0.2 and the db runs on 172.17.0.3.

DataBase Schema

```
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT NULL, 
  `friend_email` varchar(255) DEFAULT NULL,
  `sub_email` varchar(255) DEFAULT NULL, 
  `blocked` int(11) DEFAULT NULL, // 0 -defines not blocked , 1 -blocked
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;


```
API Doc can be accessed on localhost:3001
API defination 
http://localhost:3001/users/...

