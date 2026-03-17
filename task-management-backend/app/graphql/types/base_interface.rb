module Types
    module BaseInterface
        include GraphQL::Schema::Interface
        edge_type_class(GraphQL::Types::Relay::BaseEdge)
        connection_type_class(GraphQL::Types::Relay::BaseConnection)
        field_class Types::BaseField
    end
end