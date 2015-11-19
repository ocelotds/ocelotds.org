/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.charts;

import java.util.Date;

/**
 *
 * @author hhfrancois
 */
public class Data {

	Date time;
	Float value;

	public Data() {
	}

	public Data(Date time, Float value) {
		this.time = time;
		this.value = value;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}
}
