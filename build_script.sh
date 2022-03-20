#!/bin/bash

echo "[$(date +"%F %T")] -- Taking down any previous instance of the test environment..."
# Remove any lingering test environments
docker-compose down express-app-test &> /dev/null
echo "[$(date +"%F %T")] -- Test environment cleaned!"

echo "[$(date +"%F %T")] -- Running the test environment..."
# Run the tests
docker-compose up express-app-tests --build --exit-code-from express-app-tests &> /dev/null
test_result=$?

# If express-app-tests service does not return errors
if [ $test_result -eq 0 ]; then
    echo "[$(date +"%F %T")] -- Tests passed! Logging in to DockerHub"
    # Log in to DockerHub using ENV for username and token stored on file for password
    docker login -u $DOCKER_USER -p "$(<.docker/docker_token)" &> /dev/null
    login_result=$?
    
    if [ $login_result -eq 0 ]; then    
        echo "[$(date +"%F %T")] -- Login Success! Updating images..."
        # Push the images to DockerHub
        docker-compose push express-app-prod addresses-db-prod &> /dev/null
        upload_result=$?

        if [ $upload_result -eq 0 ]; then
            echo "[$(date +"%F %T")] -- Images updated successfully!"
            exit 0
        else
            echo "[$(date +"%F %T")] -- Images failed to upload. Error code: $upload_result"
            exit 3
        fi
    else
        echo "[$(date +"%F %T")] -- Login failed. exiting. Error code: $login_result"
        exit 2
    fi
else
    echo "[$(date +"%F %T")] -- Tests did not pass. exiting. Error code: $test_result"
    exit 1
fi
