from fastapi import APIRouter

app = APIRouter(tags=["api"], prefix="/api")


@app.get("/python")
def hello_world():
    return {"message": "Hello World"}
