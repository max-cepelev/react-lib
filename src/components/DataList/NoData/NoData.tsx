import { Placeholder } from '../../Placeholder';

import { NO_DATA_TEXT } from './constants';

type NoDataProps = {
	noDataImgSrc?: string;
};

export const NoData = ({ noDataImgSrc }: NoDataProps) => {
	return <Placeholder title={NO_DATA_TEXT} imgSrc={noDataImgSrc} />;
};
