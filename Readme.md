# Get Oracle 12c slim image from docker hub
```
docker pull store/oracle/database-enterprise:12.2.0.1-slim
```

# Create a docker network
```
docker network create oracle-network-demo
```

# Run oracle 12c slim docker container
```
docker run -d -it --rm --net oracle-network-demo -p 1521:1521 --name oracle12c-slim-demo-container store/oracle/database-enterprise:12.2.0.1-slim
```

# Connect to Oracle container (STATUS should be (healthy))
```
docker exec -it oracle12c-slim-demo-container bash -c "source /home/oracle/.bashrc; sqlplus /nolog"
```
```
# create a demo schema
connect sys as sysdba;
-- Here enter the password as 'Oradoc_db1'
alter session set "_ORACLE_SCRIPT"=true;
create user demo identified by demo;
GRANT CONNECT, RESOURCE, DBA TO demo;
exit
```

## connect to container once again
```
docker exec -it oracle12c-slim-demo-container bash -c "source /home/oracle/.bashrc; sqlplus /nolog"
```

```
# create a table and insert demo data
connect demo/demo
-- Now create a sample table.
create table docker_demo (id int,name varchar2(20));
--Start inserting values in to the table.
insert into docker_demo values (1, 'rodrigo');
commit;
exit
```

# Create Oracle Client NodeJS image
```
docker build -t oracle-client-nodejs-demo .
```

# Execute NodeJs app
```
docker run -it --rm --net oracle-network-demo --name oracle-client-nodejs-demo-container oracle-client-nodejs-demo
```

# Container Output
```
result -> {
  metaData: [ { name: 'ID' }, { name: 'NAME' } ],
  rows: [ [ 1, 'rodrigo' ] ]
}
```