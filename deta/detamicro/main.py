import os
import sys
import json
from urllib.request import urlopen
from deta import Deta, App, Drive
from fastapi import FastAPI
from fastapi.logger import logger
from loguru import logger

app = App(FastAPI())
deta = Deta(os.getenv("DETA_PROJECT_KEY"))

logger.remove()  # remove default
logger.add(
    sys.stdout, format="{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {message}"
)

drive = Drive("cache")


def get_data():
    response = urlopen(
        "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key="
        + os.getenv("WORDNIK_API_KEY")
    ).read()
    logger.info("fetched new data")
    drive.put("data.txt", response)

    return response


@app.get("/")
async def root():
    fp = drive.get("data.txt")

    if not fp:
        logger.info("data is empty")

        return json.loads(get_data())
    else:
        data = fp.read()
        fp.close()

    logger.info("returning result from cache")

    return json.loads(data)


@app.lib.cron()
def cron_task(event):
    drive.delete("data.txt")
    get_data()
