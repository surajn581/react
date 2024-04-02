from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    data =  [{
                "userId": f'user{i}',
                "id": f'id-{i}',
                "title": "this is great: " + str(i),
                "body": "body: " + str(i)
            } for i in range(90)]
    return data


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}