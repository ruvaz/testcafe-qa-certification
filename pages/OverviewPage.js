import {Selector, t} from 'testcafe'

export default class OverviewPage {
	
	constructor() {
		this.overviewTitle = Selector('.subheader')
		this.inventoryItem = Selector(".inventory_item_name")
	}
	
	
}
