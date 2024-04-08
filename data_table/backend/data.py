import redis
rClient = redis.Redis(host='localhost', port=6379, db=0)
def get_hearbeats():    
    return rClient.hgetall('heartbeats')

def get_work_publisher_queue():
    return rClient.zrange('WorkPublisher', 0, -1)