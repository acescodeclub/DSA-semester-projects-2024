class CacheData:
    def __init__(self):
        self.cache = []
        self.num = 0
    
    def put(self, key, value)->None:
        if(self.num > 5):
            self.cache.pop(0)
            self.num -= 1
        self.num += 1
        self.cache[self.num] = (key, value)

    
    