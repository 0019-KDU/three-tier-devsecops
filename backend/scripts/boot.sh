#!/bin/bash
set -e
# Apply migrations
# python manage.py makemigrations --noinput
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000