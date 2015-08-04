/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.chat;

/**
 *
 * @author hhfrancois
 */
public class Message {

	public String chatter;
	public String text;

	public String getChatter() {
		return chatter;
	}

	public void setChatter(String chatter) {
		this.chatter = chatter;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	
}
