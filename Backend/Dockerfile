FROM python:3.7.9
ADD . /Main
COPY . .
WORKDIR /Main
EXPOSE 5000
# BIEN MOI TRUONG
ENV  FLASK_APP = Main.py
ENV FLASK_APP_DEBUG 0
ENV FLASK_ENV production
RUN pip install -r requirements.txt
# run cmnd
# -- truy cập mạng lan public truyền thêm host địa chỉ x x x x
CMD ["python","Main.py","-h-host","0.0.0.0"]