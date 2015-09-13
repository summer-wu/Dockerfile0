#!/usr/bin/env python
from cPickle import dumps
from cookielib import CookieJar
import threading

class MyCookieJar(CookieJar):
    def __getstate__(self):
        state = self.__dict__.copy()
        del state['_cookies_lock']
        return state

    def __setstate__(self, state):
        self.__dict__ = state
        self._cookies_lock = threading.RLock()

class Person(object):
    def __init__(self, name):
        self.name = name
        self.cookies = MyCookieJar()

bob = Person("bob")
print dumps(bob)