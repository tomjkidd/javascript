import urllib2
import json

baseUrl = "https://forsight.crimsonhexagon.com/api/"

def get(url):
    return urllib2.urlopen(url).read();

def getMonitorDetail(auth, monitorId):
    monitorDetailBaseUrl = baseUrl + "monitor/detail"
    monitorDetailUrl = "{0}?auth={1}&id={2}".format(monitorDetailBaseUrl, authKey, monitorId)
    return json.loads(get(monitorDetailUrl))

if __name__ == '__main__':
    authKey = "ProvideAuthKeyHere"
    monitorId = "ProvideMonitorIdHere"

    monitorDetail = getMonitorDetail(authKey, monitorId)

    print monitorDetail["keywords"]
