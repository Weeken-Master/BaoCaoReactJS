from calendar import MONDAY
from functools import wraps
from logging import lastResort
from operator import itruediv
from time import time
from flask import Flask, config,jsonify,request, render_template, url_for, flash
import flask
from flask_sqlalchemy import SQLAlchemy, model
from sqlalchemy.sql import and_
from sqlalchemy.sql import or_
from flask_mysqldb import MySQL
import MySQLdb
from flask_cors import CORS
import pymysql
from sqlalchemy.sql.expression import null, text, update
from sqlalchemy.sql.functions import count
from sqlalchemy.sql.sqltypes import INT
from werkzeug.datastructures import Headers
from werkzeug.wrappers import response
import Model
import hashlib
import json
from os.path import join, dirname, realpath
from werkzeug.utils import redirect, secure_filename
import jwt
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'E:\Downloads\DeTai\DeTai\public\images'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = "thiskey"

cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@mysql:3306/react?charset=utf8mb4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app) # Khoi tao sqlalcemy
app.config['JSON_AS_ASCII'] = False

# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USENAME'] = "hautestreactjs@gmail.com"
# app.config['MAIL_PASSWORD'] = "khongbiet@"
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True
# mail = Mail(__name__)

#đăng kí token
# @app.route('/api/mail', methods=['POST'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def send_message(token, name, send_to_email):
    # user= jwt.decode(token , app.config['SECRET_KEY'])
    # user = jsonify({'token': token.decode('UTF8')})
    token_str = str(token)[2:len(str(token)) - 1]

    email = 'hautestreactjs@gmail.com'
    password = 'khongbiet@'
    
    subject = 'Thông báo xác nhận địa chỉ email'
    message = "Xin chào " + name + "\nLink xác nhận: http://localhost:5000/api/activedAccToken?token=" + token_str + "\nMã có hiệu lực trong vòng 30 phút"

    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = send_to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email, password)
    text = msg.as_string()

    server.sendmail(email, send_to_email, text)
    server.quit

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Fail'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Fail'}), 403

        return f(*args, *kwargs)
    return decorated
@app.route('/api/protected')
@token_required

def protected():
    token = request.args.get('token')
    user = jwt.decode(token , app.config['SECRET_KEY'])

    return jsonify(user)

@app.route('/', methods=['GET'])
def index():
    result = [
        {
            "author": "15",
            "name": "Nguyễn",
            "message": "alo alo",
            "time":"19:04:20"
        },
        {
        "author": "31",
        "name": "Hậu",
            "message": "nghe",
            "time":"19:04:20"
        },
        {
            "author": "31",
            "name": "Nguyễn",
            "message": "alo test",
            "time":"19:04:20"
        }
    ]
    return jsonify(result)
@app.route('/api/home', methods=['GET'])
def home():
    rs = db.session.query(Model.Setting).first()

    return jsonify(rs.toString),200

@app.route('/api/chat', methods=['GET'])
def chat():
    rs = db.session.query(Model.Chat).all()
    response = []

    for item in rs:
        text = item.toString
        fullName = db.session.query(Model.Users).filter(Model.Users.UserID==item.UserID).first().FullName
        text.update({"name": fullName})

        response.append(text)
       
    return jsonify(response), 200

@app.route('/api/count-theme', methods=['GET'])
def countTheme():
    countThemes = db.session.query(Model.Themes).all()
    sum = db.session.query(Model.Posts).count()
    response = []
    for item in countThemes:
        number = db.session.query(Model.Posts).filter(Model.Posts.ThemeID==item.ThemeID).count()
        text = {
            'name':item.ThemeName,
            'number':number,
            'sum':sum
        }
        response.append(text)
    return jsonify(response),200

#api login
@app.route('/api/login',methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    password = hashlib.sha3_512(password.encode()).hexdigest()
 
    check = db.session.query(Model.Users).filter(Model.Users.Username==username,Model.Users.Password==password)
    result = check.first()
    
    if result:
        countPost = db.session.query(Model.Posts).filter(Model.Posts.UserID == result.UserID).count()
        countCMT = db.session.query(Model.Comment).filter(Model.Comment.UserID==result.UserID).count()
        token = jwt.encode({'userID': result.UserID, 'countPost': countPost,'countCMT': countCMT,'fullname': result.FullName, 'actived' : result.Actived,'email': result.Email,'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=300)}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF8')}),200
    else:
        return 'Fail',500

@app.route('/api/statistical')
def statistical():

    monthNow = datetime.datetime.now().month
    rs = db.session.query(Model.Users).all()

    numberAcc = 0
    response = []
    response2 = []
    for item in reversed(rs):
        if monthNow == item.time.month:
            numberAcc = numberAcc + 1

        else:

            response.append(monthNow)
            response2.append(numberAcc)
            numberAcc = 1
            monthNow = monthNow - 1
   
    if numberAcc != 0:
        text = {
                'month' : monthNow,
                'number': numberAcc
            }
        response.append(text)

    return jsonify(response), jsonify(response2),200

@app.route('/api/actived', methods=['POST'])
def actived():
    try:
        id = request.form['id']
        email = request.form['email']
        name = request.form['name']
        token = jwt.encode({'userID': id, 'fullname': name,'email': email,'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=1800)}, app.config['SECRET_KEY'])
        send_message(token, name, email)
        return 'OK', 200
    except:
         return 'Fail', 500

def token_required_actived(f):
    @wraps(f)
    def decorated_actived(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return render_template('error.html')
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return render_template('error.html')

        return f(*args, *kwargs)
    return decorated_actived

@app.route('/api/activedAccToken')
@token_required_actived


def activedAccToken():
    token = request.args.get('token')
    user = jwt.decode(token , app.config['SECRET_KEY'])
#    tránh trường hợp lấy token login để kích hoạt
    if not user.get('actived'):
        User = db.session.query(Model.Users).filter(Model.Users.UserID==user.get('userID')).first()
        User.Actived = 1
        db.session.commit()
        return render_template('success.html')
    return render_template('error.html')
#  api add user
@app.route('/api/register',methods=['POST','PUT'])
def register():
    try:
        username = request.form['username']
        password= request.form['password']
        email = request.form['email']
        fullname = request.form['fullname']
        password = hashlib.sha3_512(password.encode()).hexdigest()
    
        # token = jwt.encode({'userID': 21,'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=300)}, app.config['SECRET_KEY'])
        # send_message(token, fullname, username, email)
        check = db.session.query(Model.Users).filter(Model.Users.Username==username)
        result = check.first()
        
        if result:
            return 'Fail', 500
        print("ok")
        cus = Model.Users(Username=username, Password=password, FullName=fullname, Email=email, time=datetime.datetime.now())
        db.session.add(cus)
        db.session.commit()

        
        return "ok", 200
    except:
        return 'Fail', 500

@app.route('/api/activated-email')
@token_required
def activatedEmail():
    token = request.args.get('token')
    user = jwt.decode(token , app.config['SECRET_KEY'])

    return jsonify(user)

@app.route('/api/posts')
def posts():
    rs = db.session.query(Model.Posts).all()
    response = []
    for item in rs:
        text = item.toString
        sqlTheme = db.session.query(Model.Themes).filter(Model.Themes.ThemeID == text.get('ThemeID')).first()
        text.update({"ThemeName":sqlTheme.ThemeName})

        sqlUser = db.session.query(Model.Users).filter(Model.Users.UserID == text.get('UserID')).first()
        text.update({"UserName":sqlUser.FullName})
        response.append(text)

    return jsonify(response), 200

@app.route('/api/search')
def search():
    textSearch = str(request.args.get('text')).lower()
    rs = db.session.query(Model.Posts).all()

    response = []
    for item in rs:
        if str(item.Header).lower().find(textSearch) != -1:
            text = {
                'header': item.Header
            }
            response.append(text)
        
    return jsonify(response), 200

@app.route('/api/add-comment', methods=['POST','PUT'])
def addComments():
    text = request.form['text']
    userID = request.form['UserID']
    PostID = request.form['PostID']
    rs = Model.Comment(UserID=userID, idPost=PostID, text=str(text),  time=datetime.datetime.now())
    db.session.add(rs)
    db.session.commit()
    

    updateCMT = db.session.query(Model.Posts).filter(Model.Posts.PostID==PostID).first()
    updateCMT.CountCmt = (updateCMT.CountCmt + 1)
    db.session.commit()

    rs = db.session.query(Model.Comment).filter(Model.Comment.idPost==PostID).all()
    response = []
    for item in rs:
        text = item.toString
        userFullName = db.session.query(Model.Users).filter(Model.Users.UserID==text.get('UserID')).first()
        text.update({"UserFullName":userFullName.FullName})
        text.pop("UserID")
        response.append(text)
    return jsonify(response),200



@app.route('/api/comments/<id>')
def comments(id):
    rs = db.session.query(Model.Comment).filter(Model.Comment.idPost==id).all()
    response = []
    for item in rs:
        text = item.toString
        userFullName = db.session.query(Model.Users).filter(Model.Users.UserID==text.get('UserID')).first()
        text.update({"UserFullName":userFullName.FullName})
        text.pop("UserID")
        response.append(text)
    return jsonify(response)

@app.route('/api/add-post', methods=['POST','PUT'])
def addPost():
    # userID:"", Header:"", Content:"", Theme:1
   
    userID = request.form['UserID']
    Header= request.form['Header']
    Content = request.form['Content']
    Theme = request.form['Theme']
    
    rs = db.session.query(Model.Posts).filter(Model.Posts.UserID==userID).all()
    time = db.session.query(Model.Setting).first()
    time = time.TimePost
    for item in reversed(rs):
        if((datetime.datetime.now() - datetime.timedelta(minutes=time) < item.Time)):
           return 'timefail', 500
        break

    if 'file' not in request.files:
       filename = 'null'
    else:
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            filename = 'null'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


    rs = Model.Posts(UserID=int(userID), ThemeID=Theme, Header=str(Header), Content=str(Content), Image=str(filename),Linkpath='null', CountCmt=0, Time=datetime.datetime.now())

    db.session.add(rs)
    db.session.commit()

    
    rs = db.session.query(Model.Posts).all()
    response = []
    for item in rs:
        text = item.toString
        sqlTheme = db.session.query(Model.Themes).filter(Model.Themes.ThemeID == text.get('ThemeID')).first()
        text.update({"ThemeName":sqlTheme.ThemeName})

        sqlUser = db.session.query(Model.Users).filter(Model.Users.UserID == text.get('UserID')).first()
        text.update({"UserName":sqlUser.FullName})
        response.append(text)

    return jsonify(response), 200

   
# api get user

@app.route("/api/GetUser/<id>",methods=['GET'])
def getUser(id):
    rs = db.session.query(Model.Users).filter(Model.Users.UserID==id).all()
    response = []
    for item in rs:
       response.append(item.toString)
    return jsonify(response)

# api update user   qua id

@app.route("/api/UpdateUser/<id>",methods=['POST','PUT'])
def updateUser(id):
    username = request.form['username'] 
    password= request.form['password']


    User = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    User.Username = username
    User.Password = password
    db.session.commit()
    return  "success",200

# xóa api  user theo id
@app.route("/api/DeleteUser/<id>",methods=['DELETE'])
def deleteUser(id):
    User = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    db.session.delete(User)
    db.session.commit()
    return  "success",200



#BẢNG CHỦ ĐỀ
    # add chủ đề 
@app.route('/api/addTheme',methods=['POST'])
def addtheme():
    themname= request.form['themname'] 
    print(themname)
    try:
        cus = Model.Themes(ThemeName = themname)
        db.session.add(cus)
        db.session.commit()
    except:
        return jsonify({"Message":"error"}),500
    return jsonify({"Message":"success"}),200

    # get chủ đề

@app.route("/api/GetTheme/<id>",methods=['GET'])
def getTheme(id):
    rs = db.session.query(Model.Themes).filter(Model.Themes.ThemeID==id).all()
    
    response = []
    for item in rs:
       print(item.ThemeName)
       response.append(item.toString)
    return jsonify(response)

    #update 
@app.route("/api/UpdateTheme/<id>",methods=['POST','PUT'])
def updateTheme(id):
    themname= request.form['themname'] 
    Theme = db.session.query(Model.Themes).filter(Model.Themes.ThemeID==id).first()
    Theme.ThemeName=themname
    db.session.commit()
    return  "success",200
# xóa api Theme theo id
@app.route("/api/DeleteTheme/<id>",methods=['DELETE'])
def deleteTheme(id):
    Theme = db.session.query(Model.Themes).filter(Model.Themes.ThemeID==id).first()
    db.session.delete(Theme)
    db.session.commit()
    return  "success",200

# BẢNG POST BÀI VIẾT
# add bài viết
rs = None
@app.route("/api/test",methods=['GET'])
def test():
    rs = db.session.query(Model.Comment).all()
    response = []
    for item in rs:
        text = item.toString
        userFullName = db.session.query(Model.Users).filter(Model.Users.UserID==text['UserID']).first()
        text.update({"UserFullName":userFullName.FullName})
        text.pop("UserID")

        response.append(text)
    print(response)
    # print(response)
    return jsonify(response),200

# -------------------admin----------------------
@app.route("/api/get-user",methods=['GET'])
def getListUser():
    rs = db.session.query(Model.Users).all()
    response = []
    for item in rs:
        countPost = db.session.query(Model.Posts).filter(Model.Posts.UserID == item.UserID).count()
        
        text = {
            'username': item.Username,
            'fullname': item.FullName,
            'actived': item.Actived,
            'email':item.Email,
            'posts': countPost,
            'id': item.UserID,
        }
        response.append(text)
    return jsonify(response), 200

@app.route("/api/edit-post",methods=['POST'])
def editPost():
    id = request.form['id']
    content = request.form['content']
    header = request.form['header']
    theme = request.form['theme']

    filename = 'null'

    if 'file' not in request.files:
       filename = 'null'
    else:
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            filename = 'null'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))



    rs = db.session.query(Model.Posts).filter(Model.Posts.PostID==id).first()
    if rs:
        if(content!=""):
            rs.Content = str(content)
        if(header!=""):
            rs.Header = str(header)
        if(theme!=""):
            rs.ThemeID = int(theme)
        if(filename!='null'):
            rs.Image = filename
        db.session.commit()
        return 'ok', 200

    return 'fail', 500

@app.route("/api/edit-status",methods=['POST'])
def editStatus():
    id = request.form['id']
    status = request.form['status']
    rs = db.session.query(Model.Posts).filter(Model.Posts.PostID==id).first()
    rs.Status = int(status)
    db.session.commit()
    return 'ok', 200

@app.route("/api/edit-actived",methods=['POST'])
def editActived():
    id = request.form['id']
    actived = request.form['actived']
    rs = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    rs.Actived = int(actived)
    db.session.commit()
    return 'ok', 200


@app.route("/api/edit-user",methods=['POST'])
def editUser():
    id = request.form['id']
    email = request.form['email']
    username = request.form['username']
    name = request.form['name']
    
    check = db.session.query(Model.Users).filter(Model.Users.Username==str(username)).first()
    if check:
        return 'fail', 500

    rs = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    
    if(email!=""):
        rs.Email = email
    if(username!=""):
        rs.Username = username
    if(name!=""):
        rs.FullName = name
    db.session.commit()
    return 'ok', 200


@app.route("/api/remove-user/<id>",methods=['DELETE'])
def Remove(id):
    user = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    if user.Username == "admin":
        return 'fail', 500


    rs = db.session.query(Model.Comment).filter(Model.Comment.UserID==id).all()
 
    for item in rs:
        posts = db.session.query(Model.Posts).filter(Model.Posts.PostID==item.idPost).first()
        posts.CountCmt = (posts.CountCmt - 1)
        db.session.delete(item)
       

    
    rs = db.session.query(Model.Posts).filter(Model.Posts.UserID==id).all() 
    for item in rs:
        db.session.delete(item)

    # db.session.commit()

    db.session.delete(user)
    db.session.commit()
    return 'ok', 200


@app.route("/api/remove-user-temp/<id>",methods=['DELETE'])
def RemoveTemp(id):
    print(id)
    user = db.session.query(Model.Users).filter(Model.Users.UserID==id).first()
    # if user.Username == "admin":
    #     return 'fail', 500

    rs = db.session.query(Model.Posts).filter(Model.Posts.UserID==id).all()
    response = []
    for item in rs:
        text = {
            'header': item.Header,
            'CMT': item.CountCmt
        }
        response.append(text)

    return jsonify(response), 200

@app.route("/api/edit-setting-checked",methods=['POST'])
def editSettingChecked():
    id = request.form['id']
    status = request.form['status']
  
    rs = db.session.query(Model.Setting).first()
    if int(id) == 2:
        rs.StatusPost = status
    if int(id) == 1:
        rs.StatusRegister = status
    db.session.commit()
    return 'ok', 200

@app.route("/api/edit-setting-time",methods=['POST'])
def editSettingTime():

    time = request.form['time']

    rs = db.session.query(Model.Setting).first()
    rs.TimePost = int(time)
    db.session.commit()
    return 'ok', 200

if __name__ == '__main__':
    db.create_all()

    rs = db.session.query(Model.Users).all()
    app.run(port=5000,host="0.0.0.0",debug=True)
    