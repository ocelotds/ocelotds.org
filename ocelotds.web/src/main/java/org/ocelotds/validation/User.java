/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.validation;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 *
 * @author hhfrancois
 */
public class User {
	@NotNull
	@Pattern(regexp = "\\w+")
	@Size(min = 3, max=20)
	String name = null;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
