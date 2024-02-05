import { Howl } from 'howler';
import {
	ExtensionType,
	LoaderParserPriority,
	utils,
} from 'pixi.js';

export default {
	extension: {
		name: 'Howler Loader Parser',
		priority: LoaderParserPriority.Normal,
		type: ExtensionType.LoadParser,
	},
	test(url) {
		return (
			utils.path.extname(url).includes('.mp3') ||
			utils.path.extname(url).includes('.wav') ||
			utils.path.extname(url).includes('.ogg') ||
			utils.path.extname(url).includes('.mpeg')
		);
	},
	async load(url, resolvedAsset) {
		return new Promise((resolve, reject) => {
			const howl = new Howl({
				src: [url],
				onload: () => resolve(howl),
				onloaderror: (id, message) => reject(message),
				sprite: resolvedAsset.data.sprite
			});
		});
	},
	unload(asset) {
		asset.unload();
	},
}
