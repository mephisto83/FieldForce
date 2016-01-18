export const endPoints = {
    getOrdersEndpoint: 'api/fieldforce/mobile/order-list' // {client}
                      //api/fieldforce/mobile/order-list/EN?rand=0.40345131157209524
}


export function parameters() {
	var res = [];
	for (var i = 0; i < arguments.length; i++) {
		res.push(arguments[i]);
	}
	return res.length ? '/' + res.join('/') : '';
}