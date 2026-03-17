module Types
    class BaseUnion < GraphQL::Schema::Union
        edge_type_class(GraphQL::Types::Relay::BaseEdge)
        connection_type_class(GraphQL::Types::Relay::BaseConnection)
    end
end