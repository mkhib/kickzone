import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';

const GET_SELLERS = gql`
  query GetSellers($filter: SellerFilterInput) {
    sellers(filter: $filter) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

const CREATE_SELLER = gql`
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

const UPDATE_SELLER = gql`
  mutation UpdateSeller($updateSellerInput: UpdateSellerInput!) {
    updateSeller(updateSellerInput: $updateSellerInput) {
      id
      name
      lastName
      username
      email
      storeName
      phone
      address
      isActive
      user {
        id
        email
        username
      }
    }
  }
`;

const TOGGLE_SELLER_ACTIVE = gql`
  mutation ToggleSellerActive($id: Int!) {
    toggleSellerActive(id: $id) {
      id
      isActive
    }
  }
`;

export interface Seller {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  storeName: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface CreateSellerInput {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  storeName: string;
  phone?: string;
  address?: string;
}

export interface UpdateSellerInput {
  id: number;
  name?: string;
  lastName?: string;
  username?: string;
  email?: string;
  storeName?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

export interface SellerFilterInput {
  searchTerm?: string;
  isActive?: boolean;
  first?: number;
  after?: string;
}

export const useAdminsSellers = () => {
  const [filter, setFilter] = useState<SellerFilterInput>({
    isActive: true,
  });

  const { data, loading, error, refetch } = useQuery(GET_SELLERS, {
    variables: { filter },
  });

  const [createSeller] = useMutation(CREATE_SELLER, {
    onCompleted: () => {
      refetch();
    },
  });

  const [updateSeller] = useMutation(UPDATE_SELLER, {
    onCompleted: () => {
      refetch();
    },
  });

  const [toggleSellerActive] = useMutation(TOGGLE_SELLER_ACTIVE, {
    onCompleted: () => {
      refetch();
    },
  });

  const sellers = data?.sellers || [];

  return {
    sellers,
    loading,
    error,
    filter,
    setFilter,
    createSeller,
    updateSeller,
    toggleSellerActive,
    refetch,
  };
};
