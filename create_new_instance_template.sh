#!/bin/bash
template_name='dev-frontend-'
template_name+=$1
gcloud compute instance-templates create $template_name \
    --network=dev-vpc-network \
    --subnet=dev-vpc-subnet \
    --region=me-central1\
    --machine-type=e2-small\
    --metadata commit-SHA=$1\
    --metadata-from-file  startup-script='vm_startup_script.sh'\
    --image 'ubuntu-2204-jammy-v20251002'\
    --image-project=ubuntu-os-cloud\
    --shielded-secure-boot\
    --shielded-integrity-monitoring\
    --shielded-vtpm\
    --boot-disk-type=pd-standard\
    --boot-disk-size=20\
    --service-account=dev-frontend-sa@clear-camp-413302.iam.gserviceaccount.com\
    --scopes=cloud-platform\
    --no-address