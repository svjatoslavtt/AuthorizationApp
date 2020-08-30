import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
// import { ApolloLink } from 'apollo-link';
// import { onError } from 'apollo-link-error';

export const httpLink = new HttpLink({
	uri: 'https://rewala-api.2mc.team/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// const errorMiddleware = onError(({ graphQLErrors, networkError, response, operation }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map((graphQLError) => {
//       const { message, locations, path } = graphQLError;
//       console.log(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
//       // const error = {graphQLError, response, operation};
//     });
//   }
//   if (networkError) {
//     console.log(`Network error: ${networkError} on operation: ${operation.operationName} info: ${JSON.stringify(operation.variables.input)}`);
//     // const error = {networkError, response, operation};
//   }
// });

export const link = authLink.concat(httpLink);
// export const link = ApolloLink.from([httpLink, authLink, errorMiddleware])
