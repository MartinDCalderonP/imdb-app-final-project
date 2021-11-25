import { PossibleData } from './Types';

export const isCorrectData = (data: PossibleData) => {
	return data?.results?.length > 0 && data;
};
