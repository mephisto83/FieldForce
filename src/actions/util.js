export const BATCH = 'BATCH';
export function batch(batch) {
	return {
		type: BATCH,
		batch
	}
}