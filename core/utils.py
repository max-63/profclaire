from models import Proffesseurs_Users, Eleves, Classes
from peewee import *
import json
import hashlib

def create_tables():
    db = SqliteDatabase('ma_base.db')
    db.connect()
    db.create_tables([Proffesseurs_Users, Eleves, Classes], safe=True)
    db.close()


def connect_user(username, password):
    db = SqliteDatabase('ma_base.db')
    db.connect()
    password = hash_some_string(password) 
    try:
        user = Proffesseurs_Users.get(Proffesseurs_Users.username == username, Proffesseurs_Users.password == password)
        return {"id": user.id, "nom": user.nom, "email": user.email}
    except Proffesseurs_Users.DoesNotExist:
        return None
    finally:
        db.close()

def hash_some_string(string):
    """Hash a string using SHA-256."""
    return hashlib.sha256(string.encode()).hexdigest()


def create_user(username, password, last_name, first_name, email, is_admin=False):
    db = SqliteDatabase('ma_base.db')
    db.connect()
    #hash password
    password = hash_some_string(password)
    try:
        user = Proffesseurs_Users.create(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_admin=is_admin
        )
        return {"id": user.id, "nom": user.nom, "email": user.email}
    except IntegrityError:
        return None
    finally:
        db.close()


def get_all_eleves(user_id):
    db = SqliteDatabase('ma_base.db')
    db.connect()
    
    professeur = Proffesseurs_Users.get(Proffesseurs_Users.id == user_id)
    
    # Récupérer les élèves liés à ce professeur
    eleves = Eleves.select().where(Eleves.user == professeur)
    eleve_list = [{"id": e.id, "first_name": e.first_name, "last_name": e.last_name, "email": e.email, "class_id": e.class_id} for e in eleves]
    
    db.close()
    
    return json.dumps(eleve_list, ensure_ascii=False)  # Retourne un JSON

def get_all_classes(user_id):
    db = SqliteDatabase('ma_base.db')
    db.connect()
    
    professeur = Proffesseurs_Users.get(Proffesseurs_Users.id == user_id)


    classes = Classes.select().where(Classes.user == professeur)
    class_list = [{"id": c.id, "name": c.name} for c in classes]

    
    db.close()
    
    return json.dumps(class_list, ensure_ascii=False)  # Retourne un JSON

