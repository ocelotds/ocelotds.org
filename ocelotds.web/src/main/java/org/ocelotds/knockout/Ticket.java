/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.knockout;

/**
 *
 * @author hhfrancois
 */
public class Ticket {

	private String name;
	private double price;

	public Ticket(String name, double price) {
		this.name = name;
		this.price = price;
	}

	public Ticket() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

}
