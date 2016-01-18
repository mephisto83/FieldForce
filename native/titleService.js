import {titles} from './titles';


export const titleService = {
	titles: titles,
	titleValues :{
	},
	get: function (id, default_) {
		if (titleService.titleValues[id]) {
			return titleService.titleValues[id];
		}
		return "[" + default_ + "]";
	}
};