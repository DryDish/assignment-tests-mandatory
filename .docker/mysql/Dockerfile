FROM arm64v8/mysql:oracle

# Whatever is copied into this folder on the container will 
#  be auto run on creation in alphanumeric order
COPY .docker/mysql/1_schema_creation.sql /docker-entrypoint-initdb.d/1_schema_creation.sql
COPY .docker/mysql/2_stored_procedures.sql /docker-entrypoint-initdb.d/2_stored_procedures.sql
COPY .docker/mysql/3_population_script.sql /docker-entrypoint-initdb.d/3_population_script.sql
