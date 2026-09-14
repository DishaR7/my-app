import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="22E51A0532",
    database="vehicle_db"
)

print("Connected successfully!")

connection.close()