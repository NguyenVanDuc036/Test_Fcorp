# FCORP - MY_TEST

## Usage


Database seeding: 
* DB_SEED from ENV, default : 1(enable)

To compile Test app from source:


1. Using docker
```
git clone https://github.com/NguyenVanDuc036/Test_Fcorp.git && cd Test_Fcorp/_deploy/local/ && bash build.sh
```

Open [http://localhost:3000/](http://localhost:3000/) 

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
> Note: endpoint --> cd react-app/src/config/config.ts 

Open [http://localhost:3000/](http://localhost:3000/) 

