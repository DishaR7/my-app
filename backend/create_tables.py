from database import engine, Base
from models import Vehicle

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")