#!/bin/bash
template_name='dev-frontend-'
template_name+=$1 
gcloud compute instance-groups managed set-instance-template instance-group-1 \
                    --template=$template_name \
                    --zone=me-central1-a

gcloud compute instance-groups managed rolling-action start-update instance-group-1 \
                    --max-unavailable=0\
                    --zone=me-central1-a\
                    --version=template=$template_name