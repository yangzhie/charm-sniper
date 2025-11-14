Rust [https://github.com/dyc3/steamguard-cli]

1. download release [https://github.com/dyc3/steamguard-cli/releases]
2. move `sudo mv ./steamguard /usr/local/bin`
3. manage perms `chmod +x ./steamguard`
4. install steamguard-cli via rust toolchain `cargo install steamguard-cli`
5. set it up `steamguard setup`
6. codes located at `~/.config/steamguard-cli/maFiles/`
7. extract `shared_secret`

Docker [https://github.com/csfloat/inspect]

1. pull image `docker pull step7750/csgofloat:latest`

2. run `sudo docker run -d \
--name csgofloat \
-p 8080:80 \
-e PGHOST=172.17.0.1 \
-e PGPORT=5432 \
-e PGUSER=csgofloat \
-e PGPASSWORD=pass \
-e PGDATABASE=csgofloatdb \
step7750/csgofloat:latest`

3. auto generates config.js in `/host/config`
4. edit config to add steam account bot (user, pass, auth (shared_secret))
   5.0. set up postgres db
   5.1. su - (swtitch to root)
   5.2. sudo -u postgres psql
   5.3.

CREATE USER csgofloat WITH PASSWORD 'pass';
CREATE DATABASE csgofloatdb OWNER csgofloat;
GRANT ALL PRIVILEGES ON DATABASE csgofloatdb TO csgofloat;

5.4. \q -> exit
5.5. URI: postgresql://csgofloat:Doorlessorc987@172.17.0.1:5432/csgofloatdb
5.6. in: /var/lib/postgres/data/pg_hba.conf edit:
"host all all 0.0.0.0/0 md5"
5.7. sudo systemctl restart postgresql

6. config.js: `ip addr show docker0` -> `172.17.0.1` for postgres uri -> `sudo docker logs <container>`

7. postgres rejects external (apart from localhost): switch to \* in `/var/lib/postgres/data/postgresql.conf`

8. verify docker and postgresql listen `psql -U csgofloat -d csgofloatdb -h 172.17.0.1`

9. start docker `sudo docker start csgofloat`

10. check status `sudo docker ps -a`

11. verify api works `http://<ip>:<port>/?url=steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198084749846A698323590D7935523998312483177`

-   ip = localhost (inside a Docker container talking to PostgreSQL)
-   port = docker config file host (80)

12. docker compose down -v
    docker compose up -d
    docker compose logs -f csgofloat
