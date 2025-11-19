#!/bin/bash
template_name='dev-frontend-'
template_name+=$1 
gcloud compute instance-groups managed set-instance-template dev-frontend-instance-group \
                    --template=$template_name \
                    --zone=me-central1

gcloud compute instance-groups managed rolling-action start-update dev-frontend-instance-group \
                    --max-unavailable=0\
                    --zone=me-central1\
                    --version=template=$template_name