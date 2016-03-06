# **Music Recommender**

This project is a Music Recommender Engine that stores music and users and makes
song recommendations based on what a user has heard before and who they are following.

It is using a combination of MongoDB, Node.js, Express.js, and Mocha for the testing framework.

To Run:

Note that the project assumes that there is a /data directory in the root, project directory.

1) Start MongoDB Server
- Go to MongoDB installation
- Naviagate to the \bin directory
- Enter the command: 

```
mongod --dbpath <<project directory>>\data
```

2) Start the Application
- At project directory, do the following to initialize the music collection:

```
npm start
```

3) Mocha Script 
- The script loads in two json files to further initialize the database entries.
- At the directory containing "script.js," run the command:

```
"mocha script"
```

4) Mocha Tests
- To run tests, go to the /test directory
- Run the command:

```
mocha <<nameOfTestClass>>
```
