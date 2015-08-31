import urllib2
import json

baseUrl = "https://forsight.crimsonhexagon.com/api/"

def get(url):
    return urllib2.urlopen(url).read();

def getMonitorDetail(auth, monitorId):
    monitorDetailBaseUrl = baseUrl + "monitor/detail"
    monitorDetailUrl = "{0}?auth={1}&id={2}".format(monitorDetailBaseUrl, auth, monitorId)
    return json.loads(get(monitorDetailUrl))

def loadSettings():
    with open('settings.tmp') as f:
        settings = json.load(f)
    return settings

if __name__ == '__main__':
    settings = loadSettings()

    monitorDetail = getMonitorDetail(settings["auth"], settings["monitorId"])

    print monitorDetail["keywords"]
