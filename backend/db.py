import pymysql

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="22E51A0532",
        database="vehicle_db",
        cursorclass=pymysql.cursors.DictCursor
    )