from re import A
from threading import Timer
from time import time
from sqlalchemy import Column, Integer, DATETIME, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import DATE, DateTime, TIME, TIMESTAMP
from Main import db
import datetime

# Bảng user  gồm userID  username + password
class Users(db.Model):
    __tablename__ = "Users"
    UserID = Column(Integer, primary_key=True, autoincrement=True)
    Username = Column(String(255))
    Password = Column(String(255))
    FullName = Column(String(255))
    Email = Column(String(108))
    Actived = Column(Integer)
    time = Column(DATE)
   # Post là bảng Bài viết
   # post là đại diện quan hệ vs User
   # backref user thêm đối tượng vào post   để tí truy vấn  bài post đó của ai
   # lazy 
    posts= relationship('Posts', backref='Users', lazy=True)
    def __init__(self, Username='', Password='', FullName ='', Email ='',Actived = '', time=''
                 ):
        self.Username = Username
        self.Password = Password
        self.FullName = FullName
        self.Email = Email
        self.Actived = Actived
        self.time = time
    @property
    def toString(self):
        return {
            'UserID':self.UserID,
            'Username':self.Username,
            'Password':self.Password,
            'FullName': self.FullName,
        }
#Bảng Chủ đề Theme
class Themes(db.Model):
    __tablename__="Themes"
    ThemeID = Column(Integer,primary_key=True,autoincrement=True)
    ThemeName = Column(String(255))
    pots= relationship('Posts', backref='Themes', lazy=True)

    def __init__(self,ThemeName=''):
        self.ThemeName = ThemeName
    @property
    def toString(self):
        return {
            'ThemeID':self.ThemeID,
            'ThemeName':self.ThemeName
            
        }

# Bảng Bài viết Post
class Posts(db.Model):
    __tablename__="Posts"
    PostID = Column(Integer,primary_key=True,autoincrement=True)
    UserID = Column(Integer, ForeignKey(Users.UserID), nullable=False)
    ThemeID = Column(Integer, ForeignKey(Themes.ThemeID), nullable=False)
    Content = Column(String(2000))
    Header = Column(String(255))
    Image =  Column(String(255))
    Linkpath =  Column(String(255))
    CountCmt = Column(Integer)
    Time = Column(DATE)
    Status = Column(Integer)

    def __init__(self,UserID,ThemeID,Content,Header,Image,Linkpath,CountCmt, Time):
        self.UserID = UserID
        self.ThemeID = ThemeID
        self.Content = Content
        self.Header = Header
        self.Image = Image
        self.Linkpath = Linkpath
        self.CountCmt = CountCmt
        self.Time = Time
        self.Status = 0
    @property
    def toString(self):
        return {
            'PostID':self.PostID,
            'UserID':self.UserID,
            'ThemeID':self.ThemeID,
            'Content':self.Content,
            'Image': self.Image,
            'Linkpath':self.Linkpath,
            'Header':self.Header,
            'Count':self.CountCmt,
            'Time':self.Time,
            'Status': self.Status,
        }

class Comment(db.Model):
    __tablename__="Comment"
    id = Column(Integer,primary_key=True,autoincrement=True)
    UserID = Column(Integer, ForeignKey(Users.UserID), nullable=False)
    idPost = Column(Integer, ForeignKey(Posts.PostID), nullable=False)
    text = Column(String(255))
    time =  Column(DATETIME)

    def __init__(self, UserID, idPost, text ='', time=''):
        self.idPost = idPost
        self.UserID = UserID
        self.text = text
        self.time = time

    @property
    def toString(self):
        return {
            'idPost':self.idPost,
            'UserID':self.UserID,
            'text':self.text,
            'time':self.time,
        }

class Chat(db.Model):
    __tablename__="chat"
    id = Column(Integer,primary_key=True,autoincrement=True)
    UserID = Column(Integer, ForeignKey(Users.UserID), nullable=False)
    text = Column(String(255))
    time =  Column(DATETIME)

    def __init__(self, UserID, text ='', time=''):
        self.UserID = UserID
        self.text = text
        self.time = time

    @property
    def toString(self):
        return {
            'author':self.UserID,
            'message':self.text,
            'time':self.time,
        }

class Setting(db.Model):
    __tablename__="Setting"
    id = Column(Integer,primary_key=True,autoincrement=True)
    TimePost = Column(Integer)
    StatusPost = Column(Integer)
    StatusRegister = Column(Integer)

    def __init__(self, TimePost, StatusPost, StatusRegister):
        self.StatusRegister = StatusRegister
        self.StatusPost = StatusPost
        self.TimePost = TimePost

    @property
    def toString(self):
        return {
            'TimePost':self.TimePost,
            'StatusPost':self.StatusPost,
            'StatusRegister':self.StatusRegister,
        }
if __name__ == '__main__':
    db.create_all()