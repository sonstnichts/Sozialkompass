FROM python:3.11.0-bullseye

RUN mkdir -p /usr/scr/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . /usr/src/app/

CMD ["gunicorn"  , "-b", "0.0.0.0:5000","--workers=3", "--timeout", "60", "app:app"]