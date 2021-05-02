FROM python:3.8
RUN pip install poetry
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY ./pyproject.toml /code/
COPY ./poetry.lock /code/
# COPY ./.venv/ /code/.venv/
# RUN dir --all /code/
# RUN dir --all 
RUN poetry config virtualenvs.in-project true
RUN poetry install

COPY ./ /code/
RUN chmod +x /code/entrypoint.sh

CMD ["./entrypoint.sh"]
