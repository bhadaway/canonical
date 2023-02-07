'use strict';

chrome.runtime.onMessage.addListener(({method, url}, {tab}) => {
	if (method === 'is-canonical') {
		chrome.pageAction.setIcon({
			tabId: tab.id,
			path: {
				16: 'icons/gray/16.png',
				32: 'icons/gray/32.png'
			}
		});
	}
	else if (method === 'offer-canonical') {
		chrome.pageAction.setIcon({
			tabId: tab.id,
			path: {
				16: 'icons/blue/16.png',
				32: 'icons/blue/32.png'
			}
		});
	}
	chrome.pageAction.setTitle({
		tabId: tab.id,
		title: url
	});
	chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(tab => {
	chrome.tabs.executeScript(tab.id, {
		code: `{
			location.replace(document.querySelector('link[rel="canonical"]').href);
		}`
	});
});

chrome.contextMenus.create({
	id: 'copy-canonical',
	title: 'Copy canonical link',
	contexts: ["page_action"]
});

chrome.contextMenus.onClicked.addListener(({ menuItemId }, tab) => {
	if (menuItemId === 'copy-canonical') {
	chrome.tabs.executeScript(tab.id, {
		code: `{
			navigator.clipboard.writeText(document.querySelector('link[rel="canonical"]').href);
		}`
	});
	}
});
