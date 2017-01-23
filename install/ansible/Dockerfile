FROM alpine
MAINTAINER contiv

RUN apk --update add python openssl ca-certificates git
RUN apk --update add --virtual build-dependencies \
                python-dev libffi-dev openssl-dev build-base
RUN apk --update add py2-pip
RUN pip install --upgrade pip cffi
RUN pip install ansible==2.2.0.0

# TODO: Replace this with a specific contiv/ansible release version
# Get the ansible scripts required for both netplugin docker & for k8s contrib
RUN git clone http://github.com/contiv/ansible

# Add the new ansible role and playbooks for Contiv UI/Proxy
ADD ansible ansible

RUN wget -c https://raw.githubusercontent.com/neelimamukiri/demo/master/net/extras/genInventoryFile.py
RUN chmod +x genInventoryFile.py

# Add the install scripts
ADD install install

RUN chmod +x install/ansible/install.sh
RUN chmod +x install/ansible/uninstall.sh
ADD scripts/generate-certificate.sh .
RUN chmod +x generate-certificate.sh
