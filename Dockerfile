FROM redash/base:latest

# We first copy only the requirements file, to avoid rebuilding on every file
# change.
COPY requirements.txt requirements_dev.txt requirements_all_ds.txt ./
RUN pip install -r requirements.txt 
RUN echo "******************************          Installed default requirements        ******************************"


RUN pip install -r requirements_dev.txt
RUN pip install -r requirements_all_ds.txt

COPY . ./

# Install node version greater than 8. 
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq
 
RUN npm install 
#RUN npm run build
RUN chown -R redash /app
USER redash
