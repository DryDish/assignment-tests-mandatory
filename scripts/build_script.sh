#!/bin/bash

# This script has to be run from the root of the project folder

echo "Preparing environment..."
# Set up all needed variables
source scripts/setup.sh

echo "Taking down any previous instance of the test environment..."
# Remove any lingering test environments
docker-compose down express-app-test 
echo "Test environment cleaned!"

echo "Running the test environment..."
# Run the tests
docker-compose up express-app-tests --build --exit-code-from express-app-tests 
test_result=$?

# If express-app-tests service does not return errors
if [ $test_result -eq 0 ]; then
    echo "Tests passed! Logging in to DockerHub"
    # Log in to DockerHub using ENV for username and token stored on file for password
    docker login -u $DOCKER_USER -p $DOCKER_TOKEN
    login_result=$?
    
    if [ $login_result -eq 0 ]; then    
        echo "Login Success! Updating images..."
        # Push the images to DockerHub
        docker-compose push express-app-prod addresses-db-prod 
        upload_result=$?

        if [ $upload_result -eq 0 ]; then
            echo "Images updated successfully!"
            exit 0
        else
            echo "Images failed to upload. Error code: $upload_result"
            exit 3
        fi
    else
        echo "Login failed. exiting. Error code: $login_result"
        exit 2
    fi
else
    echo "Tests did not pass. exiting. Error code: $test_result"
    exit 1
fi
