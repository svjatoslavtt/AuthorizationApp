import { execute } from 'apollo-link';
import { from } from 'rxjs';

import { link } from './link';

export function request(data: any, query: any) {
	const operation = {
		query,
		variables: data,
	};

	return from(execute(link, operation) as any);
}

export function errorsResponse(errorsData: any) {
	if (errorsData[0].fields) {
		return Object.values(errorsData[0].fields)
			.map((item: any) => Object.values(item))
			.flat();
	} else if (errorsData[0].message) {
		return errorsData[0].message;
	}
}
