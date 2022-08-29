import { 
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting, 
	MarkdownRenderChild, 
	MarkdownRenderer 
} from 'obsidian';


class ShortUrlConverter extends MarkdownRenderChild {
	text: string;
	constructor(containerEl: HTMLElement, text: string) {
		super(containerEl);
		this.text = text;
	}

	onload() {
		const urlName = this.text.replaceAll("+", "");
		const el = `<a href="#">${urlName}</a>`
		this.containerEl.innerHTML = el;
	}
}


interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

function getFrontMatter() {
	let result = {};

	const file = app.workspace.getActiveFile();
	let fmc = app.metadataCache.getFileCache(file)?.frontmatter;

	for (let key in fmc) {
		console.log(key)
		if (key == "position") continue;

		result[key] = fmc[key];
	}

	return result;
}

export default class UrlShortenerPlugin extends Plugin {
	settings: MyPluginSettings;
	currentMetadata = {};

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// new Notice("Happy Friday!");

			let data = getFrontMatter();
			
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		this.currentMetadata = getFrontMatter()

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownPostProcessor((element, context) => {
			console.log("Rendering Markdown")
			let data = getFrontMatter();
			const cells = element.querySelectorAll("td");

      		for (let index = 0; index < cells.length; index++) {
        		const cell = cells.item(index);
        		
        		if (cell.innerText.startsWith("+") && cell.innerText.endsWith("+")) {
        			let urlName = cell.innerText.replaceAll("+", "");
        			let fixedUrlName = urlName.replace("url.", "");
        			const url = data[urlName];
        			cell.innerHTML = `<a href='${url}'>${fixedUrlName}</a>`
        		}
      		}
    	});

    	this.registerDomEvent(document, 'keyup', (evt) => {
			console.log("Keyup!")

		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}



