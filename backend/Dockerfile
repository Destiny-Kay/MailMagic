FROM python:3.10-slim

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY requirments.txt /app/
RUN pip install -r requirments.txt

COPY . /app/

RUN chmod u+x ./run.sh
EXPOSE 8000

CMD ["sh", "./run.sh"]