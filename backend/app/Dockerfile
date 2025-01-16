FROM python:3.10

WORKDIR    /opt/oracle
RUN        apt-get update && apt-get install -y libaio1 wget unzip \
            && wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip \
            && unzip instantclient-basiclite-linuxx64.zip \
            && rm -f instantclient-basiclite-linuxx64.zip \
            && cd /opt/oracle/instantclient* \
            && rm -f *jdbc* *occi* *mysql* *README *jar uidrvci genezi adrci \
            && echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf \
            && ldconfig
WORKDIR /app
COPY ./requirements.txt /app
COPY ./db_app.py /app
COPY ./app.py /app
RUN apt-get update && apt-get install -y python3-pip
RUN pip install --upgrade pip
RUN pip install flask_cors
RUN pip install python-dotenv
RUN pip install -r /app/requirements.txt
CMD ["python", "app.py"]
