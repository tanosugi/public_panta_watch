# from datetime import date

import environ
import pandas_datareader as pdr
import pandas_datareader.data as web
import yfinance as yf
from django.contrib.auth.models import User
from django.db import models
from pandas.core.frame import DataFrame
from pandas_datareader import wb
from pandas_datareader.nasdaq_trader import get_nasdaq_symbols

env = environ.Env()
environ.Env.read_env("../.env")


class DataItem(models.Model):
    SOURCE_CHOICES = [
        ("tiingo", "tiingo"),
        ("iex", "iex"),
        ("av-daily", "av-daily"),
        ("econdb", "econdb"),
        ("quandl", "quandl"),
        ("fred", "fred"),
        ("famafrench", "famafrench"),
        ("wb", "wb"),
        ("oecd", "oecd"),
        ("eurostat", "eurostat"),
        ("nasdaq", "nasdaq"),
        ("stooq", "stooq"),
        ("moex", "moex"),
        ("naver", "naver"),
        ("yfinance", "yfinance"),
    ]
    source = models.CharField(max_length=16, default="", choices=SOURCE_CHOICES)
    symbol = models.CharField(max_length=32, default="")
    name = models.CharField(max_length=64, default="", unique=True)
    start = models.DateField(default="")
    end = models.DateField(default="")
    price_json = models.JSONField(default=dict)  # type:ignore
    price_graph = models.JSONField(default=dict)  # type:ignore
    created_on: models.DateTimeField = models.DateTimeField(auto_now_add=True)

    def setName(self):
        self.created_on
        self.name = (
            self.source
            + ":"
            + self.symbol
            + " "
            + self.created_on.strftime("%Y-%m-%d %H:%M %f")
        )

    def __str__(self):
        return self.name

    def set_json_from_datareader(self, api_key: str):
        df: DataFrame
        if self.source == "yfinance":
            yf.pdr_override()
            df = pdr.get_data_yahoo(
                self.symbol,
                start=self.start.strftime("%Y-%m-%d"),
                end=self.end.strftime("%Y-%m-%d"),
            )
        elif self.source == "wb":
            df = wb.download(indicator=self.symbol, start=self.start, end=self.end)
        elif self.source == "nasdaq":
            df = get_nasdaq_symbols()  # type:ignore
        elif self.source == "famafrench":
            df = web.DataReader(
                self.symbol,
                self.source,
                start=self.start,
                end=self.end,
                api_key=api_key,
            )[0]
        elif self.source == "tiingo":
            df = web.DataReader(
                self.symbol,
                self.source,
                start=self.start,
                end=self.end,
                api_key=api_key,
            ).reset_index(level="symbol", drop=True)
        else:
            df = web.DataReader(
                self.symbol,
                self.source,
                start=self.start,
                end=self.end,
                api_key=api_key,
            )
        # print(df)
        self.price_json = df.to_json(orient="split")
        # print(self.price_graph)
        return None


class Profile(models.Model):
    user_prof = models.OneToOneField(
        User,
        related_name="profile",
        on_delete=models.CASCADE,
    )
    is_save_api_key = models.BooleanField(default=False)
    api_keys = models.JSONField(default=dict)  # type:ignore
    created_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_prof.username
