from typing import Union
from fastapi import FastAPI
app = FastAPI()

import json
from datetime import datetime
from data import get_hearbeats, get_work_publisher_queue

@app.get("/")
def read_root():
    data = []
    now = datetime.now().timestamp()
    for worker, hearbeat in get_hearbeats().items():
        data.append( { 'id': str(worker, encoding='utf-8'),
                       'heartbeat': datetime.fromtimestamp(float(hearbeat)).strftime('%Y-%m-%d:%H:%M:%S.%f'),
                       'stale_by': now - float(hearbeat) } )
    data = sorted(data, key = lambda row: row['heartbeat'], reverse=True)
    return data

@app.get("/workpublisher")
def work_publisher_queue():
    work_items = get_work_publisher_queue()
    data = []
    for item in work_items:
        item_data = json.loads(item)
        item_data['id'] = item_data.pop('name')
        data.append(item_data)
    return data

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}