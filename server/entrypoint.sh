#!/bin/sh

set -e
# python manage.py collectstatic --noinput
# export LD_LIBRARY_PATH=/usr/local/lib /usr/local/bin/python
poetry run ./manage.py wait_for_db
poetry run ./manage.py makemigrations || poetry run ./manage.py makemigrations || poetry run ./manage.py makemigrations || poetry run ./manage.py makemigrations
poetry run ./manage.py migrate || poetry run ./manage.py migrate || poetry run ./manage.py migrate || poetry run ./manage.py migrate
poetry run ./manage.py ensure_adminuser --username=${DJANGO_ADMIN_USER} \
    --password=${DJANGO_ADMIN_PASSWORD}
poetry run uwsgi --socket :8001 --workers 4 --master --enable-threads --module project.wsgi
