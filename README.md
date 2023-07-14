# FCORP - MY_TEST

## Usage

To compile Test app from source:


1. If you want to start the application using docker
```
git clone https://github.com/NguyenVanDuc036/Test_Fcorp.git && cd Test_Fcorp/_deploy/local/ && bash build.sh
```

Open [http://localhost:3000/](http://localhost:3000/) 

> Note: If api-server can't connect to elasticsearch --> retry

```
cd Test_Fcorp/_deploy/local/ && bash build.sh
```

2. Run local
* api-server

Enter your ELASTICSEARCH_HOST in local
```
cd api-server .env
```

```
cd api-server
npm i
npm run dev
```

* react-app
```
cd react-app
npm i
npm start
```
Open [http://localhost:3000/](http://localhost:3000/) 

