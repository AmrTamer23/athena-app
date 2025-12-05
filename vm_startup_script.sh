#!bin/bash
vm_name=$(curl "http://metadata.google.internal/computeMetadata/v1/instance/name" -H "Metadata-Flavor: Google")
commit_SHA=$(gcloud compute instances describe $vm_name --format='value(metadata.items.commit-SHA)' --zone=me-central1-a)

# update package index
apt-get update 
echo y 

# install Docker
apt-get install docker.io -y
echo y
apt-get install docker-compose -y
echo y 
cd root

# Create the docker-compose.yml file
echo "version: '3'" > docker-compose.yml

# Add a service to the file
echo "services:" >> docker-compose.yml
echo "  frontend:" >> docker-compose.yml
echo "    restart: always" >> docker-compose.yml
echo "    container_name: frontend" >> docker-compose.yml
echo "    image: \${IMAGE}" >> docker-compose.yml
echo "    ports:" >> docker-compose.yml
echo "      - '80:80'" >> docker-compose.yml

gcloud auth configure-docker \
    me-central1-docker.pkg.dev
echo y
IMAGE=me-central1-docker.pkg.dev/clear-camp-413302/frontend/frontend-image:$commit_SHA
export IMAGE

docker-compose up -d