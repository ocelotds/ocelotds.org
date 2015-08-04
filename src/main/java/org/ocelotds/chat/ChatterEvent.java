/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.chat;

/**
 *
 * @author hhfrancois
 */
public class ChatterEvent {
	private String type;
	private String chatter;

	public ChatterEvent() {
	}

	public ChatterEvent(String type, String chatter) {
		this.type = type;
		this.chatter = chatter;
	}

	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getChatter() {
		return chatter;
	}

	public void setChatter(String chatter) {
		this.chatter = chatter;
	}
	
	
}
