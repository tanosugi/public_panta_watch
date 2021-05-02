from datetime import datetime

import graphene  # type:ignore
import graphql_jwt  # , import, login_required
from django.contrib.auth.models import User
from graphene import relay  # type:ignore
from graphene_django import DjangoObjectType  # type:ignore
from graphene_django.filter import DjangoFilterConnectionField  # type:ignore
from graphql_jwt.decorators import login_required
from graphql_relay import from_global_id  # type:ignore

from .models import DataItem


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node,)


class CreateUserMutation(relay.ClientIDMutation):
    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        # email = graphene.String(required=True)

    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        user = User(
            username=input.get("username"),
            # email=input.get("email"),
        )
        user.set_password(input.get("password"))  # type: ignore
        user.save()

        return CreateUserMutation(user=user)


class DataItemNode(DjangoObjectType):
    class Meta:
        model = DataItem
        filter_fields = {
            "symbol": ["exact", "icontains"],
        }
        interfaces = (relay.Node,)


class CreateDataItemMutation(relay.ClientIDMutation):
    class Input:
        symbol = graphene.String(required=True)
        source = graphene.String(required=True)
        start = graphene.Date(required=False)
        end = graphene.Date(required=False)
        # country = graphene.String(required=False)
        api_key = graphene.String(required=False)

    dataItem = graphene.Field(DataItemNode)

    @login_required
    def mutate_and_get_payload(self, info, **input):
        dataItem = DataItem(
            source=input.get("source"),
            symbol=input.get("symbol"),
            start=input.get("start"),
            end=input.get("end"),
            created_on=(datetime.now()),
        )
        dataItem.setName()
        dataItem.set_json_from_datareader(api_key=str(input.get("api_key")))
        dataItem.save()
        return CreateDataItemMutation(dataItem=dataItem)


class DeleteDataItemMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    dataItem = graphene.Field(DataItemNode)

    def mutate_and_get_payload(self, info, **input):

        dataItem = DataItem(id=from_global_id(input.get("id"))[1])
        dataItem.delete()

        return DeleteDataItemMutation(dataItem=None)


class Mutation(graphene.AbstractType):
    create_user = CreateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    create_data_item = CreateDataItemMutation.Field()
    delete_data_item = DeleteDataItemMutation.Field()


class Query(graphene.ObjectType):
    me = graphene.Field(UserNode)
    data_item = relay.Node.Field(DataItemNode)
    data_item_by_symbol = graphene.Field(
        DataItemNode, symbol=graphene.String(required=True)
    )
    all_data_items = DjangoFilterConnectionField(DataItemNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user

    def resolve_all_data_item(self, info, **kwargs):
        return DataItem.objects.all()

    def resolve_data_item_by_symbol(self, info, **kwargs):
        symbol = kwargs.get("symbol")
        return DataItem.objects.get(symbol=symbol)
