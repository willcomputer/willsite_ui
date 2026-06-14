#!/bin/bash

sudo apt install nginx

sudo cp nginx.conf /etc/nginx/conf.d/willsite_ui.conf

sudo nginx -s reload
