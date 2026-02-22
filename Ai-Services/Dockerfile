FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install numpy==1.26.4
RUN pip install torch==2.2.2 --index-url https://download.pytorch.org/whl/cpu
RUN pip install -r requirements.txt

COPY ./App ./App

EXPOSE 8000

CMD ["uvicorn", "App.main:app", "--host", "0.0.0.0", "--port", "8000"]
