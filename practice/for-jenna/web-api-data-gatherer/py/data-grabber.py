import urllib2
import json

baseUrl = "https://forsight.crimsonhexagon.com/api/"

def get(url):
    return urllib2.urlopen(url).read()

def getMonitorDetail(auth, monitorId):
    monitorDetailBaseUrl = baseUrl + "monitor/detail"
    monitorDetailUrl = "{0}?auth={1}&id={2}".format(monitorDetailBaseUrl, auth, monitorId)
    return json.loads(get(monitorDetailUrl))

def saveJsonDataToFile(filename, jsonData):
    with open(filename, 'w') as f:
        json.dump(jsonData, f, indent = 4);

def loadSettings():
    with open('settings.tmp') as f:
        settings = json.load(f)
    return settings

if __name__ == '__main__':
    settings = loadSettings()

    monitorIds = settings["monitorIds"]

    jsonData = []

    for monitorId in monitorIds:
        monitorDetail = getMonitorDetail(settings["auth"], monitorId)
        print "Adding '{0}' to the list".format(monitorDetail["name"])
        jsonData.append(monitorDetail)

    print "{0} items loaded from api".format(len(jsonData))

    saveJsonDataToFile(settings["jsonDataFilename"], jsonData)
